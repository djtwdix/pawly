import mongoose from "mongoose"

const pupModel = mongoose.Schema({
  name: String,
  photoURL: String,
  breed: String,
  birthday: Date,
  bio: String,
  energy: Number,
})

export default mongoose.model("pups", pupModel)