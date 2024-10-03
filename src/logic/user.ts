import { validateEmail } from "../helpers/func";
import { makeResponse } from "../helpers/response";
import { IUser, IUserUpdate } from "../types/user";
import * as userRepository from "../repository/user";
import {
  compareHashedPassword,
  generateHashedPassword,
} from "../helpers/utils";

export const updateUser = async (
  user: IUser,
  payload: Partial<IUserUpdate>
) => {
  if (payload.newPassword && payload.oldPassword) {
    if (!compareHashedPassword(payload.oldPassword!, user.password)) {
      return makeResponse(false, "Invalid password.", {}, 403);
    }
    payload.password = generateHashedPassword(payload.newPassword);
  }

  if (payload.email && payload.email !== user.email) {
    let existingUser = await userRepository.findUserByEmail(payload.email);
    if (existingUser) {
      return makeResponse(false, "Email already in use");
    }
  }

  const _user = await userRepository.findUserByIdAndUpdate(user.id, payload);
  return makeResponse(true, "User Updated successfully", {
    user: _user,
  });
};
