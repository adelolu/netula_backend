
import { FilterQuery, HydratedDocument, Types } from "mongoose";
import { IUser } from "../types/user";
import User from "../models/user";

export const createUser = async (
  user: IUser
): Promise<HydratedDocument<IUser>> => {
  return await new User(user).save();
};

export const findUserById = async (id: Types.ObjectId | string) => {
  return await User.findById(id);
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email }, "+password");
};

export const findUserByMatch = async (data: FilterQuery<IUser>) => {
  return await User.findOne(data);
};

// export const findUsersByMatch = async (
//   data: FilterQuery<IUser>,
//   paging: Paging
// ) => {
//   return await User.find(data)
//     .sort({ [paging.sortBy!]: paging.sort! })
//     .skip(paging.skip!)
//     .limit(paging.limit!);
// };

export const findUserByIdAndUpdate = async (
  userId: string | Types.ObjectId,
  data: Partial<IUser>
) => {
  return await User.findByIdAndUpdate(userId, data, { new: true });
};
