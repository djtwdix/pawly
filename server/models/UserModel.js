import mongoose from "mongoose";

const userModel = mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  photoURL: String,
  blocks: Array,
  likes: Array,
});

export default mongoose.model("users", userModel);
