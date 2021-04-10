import mongoose from "mongoose"

const messageModel = mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  photoURL: String,
  blocks: Array,
  likes: Array
})

export default mongoose.model("messages", messageModel)