import mongoose from "mongoose";

const chatModel = mongoose.Schema({
  participants: Array,
  created_at: { type: Date, default: Date.now() },
  last_message: Array,
});

export default mongoose.model("chats", chatModel);
