import express, { Request, Response, NextFunction } from "express"
import logger from "./utils/logger"
import Ticket from "./models/ticket"
import { bot, isReady } from "./services/slack"
import { formatTicket } from "./utils/format"

const app = express()

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(express.json())

app.use((req: Request, res: Response, next: NextFunction) => {

    if(!req.headers.authorization || req.headers.authorization !== process.env.SECRET) {
        logger.warn("Attempt to use the API with wrong secret logged")
        return res.status(403).send()
    }

    next()
})

app.put("/", async (req: Request, res: Response) => {

    if(!isReady()) {
        return res.status(500).json({ message: "Slack connection not ready" })
    }

    if(!req.body.id) {
        return res.status(400).send()
    }

    let ticket, message

    let channel = bot.channels.filter(x => x.is_member)[0]

    try {
        ticket = await Ticket.findOne({ticket: req.body.id})
    } catch(err) {
        logger.error(err)
        return res.status(500).json(err)
    }

    let comments = req.body.comments.split("----------------------------------------------")
    if(comments.length > 0) {
        comments.shift()
    }

    if(!ticket) {

        // 1. Post new message to slack
        // 2. Add reference to ticket in db

        let replies = []

        try {
            message = await bot.postMessage(channel.id, "", { attachments: formatTicket(req.body) })

            for(let comment of comments) {

                let reply = await bot.postMessage(channel.id, comment || "Empty message", { thread_ts: message.ts })
                
                replies.push(reply.ts)

            }  

        } catch(err) {
            logger.error(err)
            return res.status(500).json(err)
        }

        try {
            await Ticket.create({
                channel: message.channel,
                ticket: req.body.id,
                timestamp: message.ts,
                replies
            })
        } catch(err) {
            logger.error(err)
            return res.status(500).json(err)
        }

        return res.send()

    }

    // Ticket is not new, update the existing slack message
    try {
        await bot.updateMessage(channel.id, ticket.timestamp, "", { attachments: formatTicket(req.body) })

        let deleteRepliesPromises = []
        for(let reply of ticket.replies) {
            deleteRepliesPromises.push(bot._api('chat.delete', {
                channel: channel.id,
                ts: reply
            }))
        }

        await Promise.all(deleteRepliesPromises)

        let replies = []

        for(let comment of comments) {
            let reply = await bot.postMessage(channel.id, comment || "Empty message", { thread_ts: ticket.timestamp })
            replies.push(reply.ts)
        }

        await Ticket.findOneAndUpdate({ ticket: ticket.ticket }, { replies: replies })

    } catch(err) {
        logger.error(err)
        return res.status(500).json(err)
    }

    res.send()
})

export default app