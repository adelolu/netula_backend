import { Document, Types } from "mongoose";
export interface IReview {
  review: string;
  product: string | Types.ObjectId;
  user: string | Types.ObjectId;
}
