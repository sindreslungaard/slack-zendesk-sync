import * as dotenv from "dotenv"
dotenv.config()
import * as db from "./services/db"
import * as slack from "./services/slack"
import app from "./api"
import logger from "./utils/logger"

db.connect()
slack.connect()
app.listen(process.env.PORT || 3008)

logger.info(`Listening on port ${process.env.PORT || 3008}`)