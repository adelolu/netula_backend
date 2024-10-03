import { IReview } from "../types/review";
import * as reviewRepository from "../repository/review";
import * as productRepository from "../repository/product";
import { makeResponse } from "../helpers/response";
import { IUser } from "../types/user";

export const createReview = async (user: IUser, payload: IReview) => {
  console.log(user, payload);

  let product = await productRepository.findProductById(payload.product);
  if (!product) {
    return makeResponse(false, "prouct does not exist", {}, 400);
  }

  let review = await reviewRepository.createReview({
    review: payload.review,
    user: user._id as string,
    product: payload.product as string,
  });
  if (!review) {
    return makeResponse(false, "Review not created", {}, 400);
  }
  return makeResponse(true, "Review created successfully", review, 201);
};
