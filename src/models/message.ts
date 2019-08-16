import * as mongoose from 'mongoose'

export interface IMessage extends mongoose.Document {
  channel: String,
  timestamp: String,
  ticket: String
}
  
export const MessageSchema = new mongoose.Schema({
  channel: String,
  timestamp: String,
  ticket: String
})

const Message = mongoose.model<IMessage>('message', MessageSchema)
export default Message