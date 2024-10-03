import { Schema, model } from "mongoose";
import { IReview } from "../types/review";

const userSchema = new Schema<IReview>(
  {
    review: { type: String, required: true },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "product",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default model<IReview>("review", userSchema);
