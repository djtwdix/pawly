import mongoose from "mongoose";

const dateModel = mongoose.Schema(
  {
    participants: Array,
    creator: String,
    date: Date,
  },
  { timestamps: { createdAt: "created_at" } }
);

export default mongoose.model("dates", dateModel);