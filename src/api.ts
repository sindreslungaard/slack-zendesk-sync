import express, { Request, Response, NextFunction } from "express"
import logger from "./utils/logger"

const app = express()

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(express.json())

app.put("/", (req: Request, res: Response) => {
    logger.info(req.body)
    res.json(req.body)
})

export default app