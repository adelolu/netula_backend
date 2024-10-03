import { FilterQuery, HydratedDocument, Types } from "mongoose";
import { IReview } from "../types/review";
import Review from "../models/review";

export const createReview = async (
  review: IReview
): Promise<HydratedDocument<IReview>> => {
  return await new Review(review).save();
};

export const findReviewById = async (id: Types.ObjectId | string) => {
  return await Review.findById(id);
};

export const findReviewByMatch = async (data: FilterQuery<IReview>) => {
  return await Review.findOne(data);
};

// export const findReviewsByMatch = async (
//   data: FilterQuery<IReview>,
//   paging: Paging
// ) => {
//   return await Review.find(data)
//     .sort({ [paging.sortBy!]: paging.sort! })
//     .skip(paging.skip!)
//     .limit(paging.limit!);
// };

export const findReviewByIdAndUpdate = async (
  reviewId: string | Types.ObjectId,
  data: Partial<IReview>
) => {
  return await Review.findByIdAndUpdate(reviewId, data, { new: true });
};
