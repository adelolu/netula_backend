import { Request, Response } from "express";
import * as reviewLogic from "../logic/review";
import { IReview } from "../types/review";
import { makeResponse } from "../helpers/response";
import { responseHandler } from "../middleware/validators/helpers";

export const createReview = async (req: Request, res: Response) => {
  const response = await reviewLogic.createReview(req.user, {
    ...req.body,
    ...req.params,
  });

  return responseHandler(res, response);
};

// export const getComments = async (req: Request, res: Response) => {
//   try {
//     const { postId } = req.params;

//     let post = await Post.findOne({ _id: postId });
//     if (!post) {
//       return res.status(400).json({ message: "post not found", status: false });
//     }
//     let comments = await Comment.find({ post: postId }).populate({
//       path: "post",
//       select: "title content ",
//       populate: {
//         path: "authorId",
//         select: "username firstname profileImage ",
//       },
//     });

//     return res.status(200).json({ data: comments, status: true });
//   } catch (error) {
//     return res.status(500).json({ message: error, status: false });
//   }
// };
