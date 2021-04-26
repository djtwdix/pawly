import mongoose from "mongoose";

const dateModel = mongoose.Schema(
  {
    participants: Array,
    creator: String,
    date: Date,
    status: String
  },
  { timestamps: { createdAt: "created_at" } }
);

export default mongoose.model("dates", dateModel);