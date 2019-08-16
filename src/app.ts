import * as dotenv from "dotenv"
import * as db from "./services/db"

dotenv.config()
db.connect()