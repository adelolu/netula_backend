import bcrypt from "bcrypt";
// import * as userRepository from "../repository/v1/user";
// import { v4 as uuid } from "uuid";

import jwt from "jsonwebtoken";
import { makeResponse } from "./response";
import mongoose from "mongoose";
import { IUser } from "../types/user";
import { MakeResponse } from "../types/custom";

export const generateHashedPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const compareHashedPassword = (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const signToken = (user: Pick<IUser, "_id" | "email">): string => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.jwt_secret!,
    {
      expiresIn: "1d",
    }
  );
};

export const verifyToken = async (
  token: string,
  secret: string,
  repository: Function
): Promise<MakeResponse<IUser | undefined>> => {
  if (!token) {
    return makeResponse(false, "Login required", undefined);
  }
  try {
    let decoded = jwt.verify(token, secret) as unknown as {
      _id: mongoose.Types.ObjectId;
    };
    let user = (await repository(decoded._id)) as unknown as IUser;
    if (!user) {
      return makeResponse(false, "Login required", undefined, 401);
    }
    // if (!user.active) {
    //   return makeResponse(
    //     false,
    //     "Account deactivated, contact support to reactivate",
    //     undefined,
    //     403
    //   );
    // }
    return makeResponse(true, "", user);
  } catch (error) {
    return makeResponse(false, "Login required", undefined);
  }
};

// export const generateRecoveryToken = async (user: IUser): Promise<string> => {
//   let code = uuid().split("-").join("").slice(6, 11).toUpperCase();
//   let codeDuplicate = await userRepository.findUserByMatch({
//     recoveryCode: code,
//   });
//   if (codeDuplicate) {
//     return generateRecoveryToken(user);
//   } else {
//     await userRepository.findUserByIdAndUpdate(user._id as string, {
//       recoveryCode: code,
//     });
//     return code;
//   }
// };

// generateOTP generates a random 6 digit OTP
export const generateOTP = async (
  expiry: number = 5
): Promise<{ token: string; expires: Date }> => {
  const expires = new Date(
    new Date().setMinutes(new Date().getMinutes() + expiry)
  );
  const token = Math.floor(10000 + Math.random() * 900000).toString();
  return { token, expires };
};

// generateSecurePassword generates password that contains at least one number, one letter and one special character
export const generateSecurePassword = (length: number = 8): string => {
  let password = "";
  const specialChars = "!@#$%&?=";
  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * 3);
    switch (random) {
      case 0:
        password += String.fromCharCode(48 + Math.floor(Math.random() * 10));
        break;
      case 1:
        password += String.fromCharCode(65 + Math.floor(Math.random() * 26));
        break;
      case 2:
        password += specialChars.charAt(
          Math.floor(Math.random() * specialChars.length)
        );
        break;
    }
  }
  return password;
};
