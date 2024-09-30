import { validateEmail } from "../helpers/func";
import { makeResponse } from "../helpers/response";
import { IUser, UserRoles } from "../types/user";
import * as userRepository from "../repository/user";
import {
  compareHashedPassword,
  generateHashedPassword,
  signToken,
} from "../helpers/utils";
import Email from "../services/email";
import crypto from "crypto";

export const createUser = async (payload: IUser) => {
  //@TOdo validate email in joi
  if (!validateEmail(payload.email)) {
    return makeResponse(false, "Invalid Email");
  }
  payload.email = payload.email!.toLowerCase();
  let existuser = await userRepository.findUserByMatch({
    email: payload.email,
  });
  if (existuser) {
    return makeResponse(false, " Email already in use");
  }

  payload.password = generateHashedPassword(payload.password);
  const user = await userRepository.createUser(payload);
  if (!user) {
    return makeResponse(false, "User Registration Failed, Please Try Again");
  }
  // user.set("password", undefined);

  const token = signToken(user);
  await new Email().sendWelcome(user);
  return makeResponse(
    true,
    "User Registered Successfully",
    { user, token },
    201
  );
};

export const loginUser = async ({
  email,
  password,
}: Pick<IUser, "email" | "password">) => {
  const user = await userRepository.findUserByEmail(email.toLowerCase());

  if (!user) {
    return makeResponse(false, "Account does not exist", {}, 403);
  }

  if (!compareHashedPassword(password, user.password)) {
    return makeResponse(false, "Password Incorrect", {}, 403);
  }

  user.set("password", undefined);
  const token = signToken(user);
  return makeResponse(true, "Login successful", { user, token }, 200);
};

export const adminLogin = async ({
  email,
  password,
}: Pick<IUser, "email" | "password">) => {
  let user = await userRepository.findUserByEmail(email.toLowerCase());
  if (!user) {
    return makeResponse(false, "Invalid email or password", {}, 403);
  }
  if (!compareHashedPassword(password!, user.password)) {
    return makeResponse(false, "Invalid email or password.", {}, 403);
  }
  if (user.role !== UserRoles.admin) {
    return makeResponse(false, "You are not authorized!", {}, 403);
  }
  user.set("password", undefined);
  const token = signToken(user);
  return makeResponse(true, "Login successful", { user, token }, 200);
};

export const forgotPassword = async ({ email }: Pick<IUser, "email">) => {
  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    return makeResponse(false, "User not found!", {}, 404);
  }

  const token = crypto.randomBytes(20).toString("hex");
  const now = new Date();

  user.recoveryCode = token;
  user.recoveryCodeExpiry = new Date(now.getTime() + 60 * 60000); // 1 hour from now

  await user.save();

  const resetLink = `${process.env.WEBSITE}/reset-password?token=${token}`;
  await new Email().sendPasswordReset(user, resetLink);
  return makeResponse(true, "Reset link sent", {}, 200);
};

export const resetPassword = async (payload: { password: string }) => {
  // fix token
  const token = "";
  // req.query.token;
  const user = await userRepository.findUserByMatch({
    recoveryCode: token,
    recoveryCodeExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return makeResponse(
      false,
      "Password reset token is invalid or has expired."
    );
  }

  const hashedpassword = generateHashedPassword(payload.password);
  user.password = hashedpassword;
  user.set("recoveryCode", undefined);
  user.set("recoveryCodeExpiry", undefined);

  await user.save();

  return makeResponse(true, "Password has been reset");
};

// {
//   "userId": "abc123",
//   "firstName": "Jane",
//   "lastName": "Doe",
//   "email": "jane.doe@example.com",
//   "passwordHash": "$2b$10$7EJ/123hashPlaceholder987XY",
//   "phone": "+1234567890",
//   "shippingAddress": {
//     "addressLine1": "123 Main Street",
//     "addressLine2": "Apt 4B",
//     "city": "Los Angeles",
//     "state": "CA",
//     "postalCode": "90001",
//     "country": "USA"
//   },
//   "billingAddress": {
//     "addressLine1": "123 Main Street",
//     "addressLine2": "Apt 4B",
//     "city": "Los Angeles",
//     "state": "CA",
//     "postalCode": "90001",
//     "country": "USA"
//   },
//   "wishlist": [
//     {
//       "productId": "wig001",
//       "name": "Curly Lace Front Wig",
//       "price": 150,
//       "image": "curly-wig.jpg"
//     },
//     {
//       "productId": "wig002",
//       "name": "Straight Bob Wig",
//       "price": 120,
//       "image": "bob-wig.jpg"
//     }
//   ],
//   "orderHistory": [
//     {
//       "orderId": "order001",
//       "date": "2024-08-15T14:30:00Z",
//       "total": 270,
//       "items": [
//         {
//           "productId": "wig001",
//           "name": "Curly Lace Front Wig",
//           "quantity": 1,
//           "price": 150
//         },
//         {
//           "productId": "wig002",
//           "name": "Straight Bob Wig",
//           "quantity": 1,
//           "price": 120
//         }
//       ],
//       "shippingStatus": "delivered"
//     }
//   ],
//   "cart": [
//     {
//       "productId": "wig003",
//       "name": "Long Wavy Wig",
//       "quantity": 1,
//       "price": 200
//     }
//   ],
//   "joinedDate": "2023-05-10T09:45:00Z",
//   "lastLogin": "2024-09-25T12:00:00Z",
//   "role": "customer",
//   "newsletterSubscribed": true
// }
