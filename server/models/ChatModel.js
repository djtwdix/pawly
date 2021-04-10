import mongoose from "mongoose"

const chatModel = mongoose.Schema({
  participants: Array,
  created_at: {type: Date, default: Date.now()}
})

export default mongoose.model("chats", chatModel)