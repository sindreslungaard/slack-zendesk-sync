import * as mongoose from 'mongoose'

export interface ITicket extends mongoose.Document {
  channel: string,
  timestamp: string,
  ticket: string,
  replies: [string]
}
  
export const TicketSchema = new mongoose.Schema({
  channel: String,
  timestamp: String,
  ticket: String,
  replies: [String]
})

const Ticket = mongoose.model<ITicket>('ticket', TicketSchema)
export default Ticket