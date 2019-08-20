import SlackBot from "slackbots"

export const bot = new SlackBot({
    token: process.env.BOT_TOKEN,
    name: process.env.BOT_NAME
})

let ready = false

export const connect = () => {
    
    bot.on('start', () => {

        ready = true
    
        let myChannels = bot.channels.filter(x => x.is_member)
    
        if(myChannels.length < 1) {
            console.error("Not part of any public channels")
        }
        
    })

}

export const isReady = () => ready