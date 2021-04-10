import mongoose from "mongoose"

const messageModel = mongoose.Schema({
  chat_id: String,
  sender_id: String,
  text: String,
  created_at: {type: Date, default: Date.now()}
})

export default mongoose.model("messages", messageModel)