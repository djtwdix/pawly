import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
  },
  coordinates: {
    type: [Number],
  },
});

const pupModel = new Schema({
  name: String,
  photoURL: String,
  breed: String,
  birthday: Date,
  bio: String,
  energy: Number,
  owner_id: String,
  gender: String,
  bones: {
    type: Number,
    default: 0,
  },
  location: {
    type: pointSchema,
  },
});

export default mongoose.model("pups", pupModel);
