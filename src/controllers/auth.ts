import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Email from "../services/email";
import * as logic from "../logic/auth";
import { responseHandler } from "../middleware/validators/helpers";

export const register = async (req: Request, res: Response) => {
  const response = await logic.createUser(req.body);
  return responseHandler(res, response);
};

export const login = async (req: Request, res: Response) => {
  const response = await logic.loginUser(req.body);
  return responseHandler(res, response);
};

export const adminLogin = async (req: Request, res: Response) => {
  const response = await logic.adminLogin(req.body);
  return responseHandler(res, response);
};

export const forgotPassword = async (req: Request, res: Response) => {
  const response = await logic.forgotPassword(req.body);
  return responseHandler(res, response);
};

export const resetPassword = async (req: Request, res: Response) => {
  const response = await logic.resetPassword(req.body);
  return responseHandler(res, response);
};

////////

// export const tokenVerification = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const token: string | undefined = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(400).json({ message: "invalid token", status: false });
//     }
//     const verifyToken = jwt.verify(token, "secretKey") as unknown as MyToken;

//     const verifyuser = await User.findById(verifyToken._id);

//     if (!verifyuser || verifyuser.id !== id) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized acess", status: false });
//     }
//     res.status(200).json({ message: "user is verified", status: true });
//   } catch (error) {
//     res.status(500).json({ message: error, status: false });
//   }
// };

// export const verifyEmail = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "User does not exist", status: false });
//     }
//     const token = crypto.randomBytes(20).toString("hex");
//     const now = new Date();

//     user.verificationCode = token;
//     user.verificationCodeExpiry = new Date(now.getTime() + 60 * 60000); // 1 hour from now

//     await user.save();

//     const verifyLink = `${process.env.WEBSITE}/verified-email?token=${token}`;
//     await new Email().sendVerifyEmail(user, verifyLink);
//     res.status(200).json({ message: "Verification link sent", status: true });
//   } catch (error) {
//     res.status(500).json({ message: error, status: false });
//   }
// };

// export const verifiedEmail = async (req: Request, res: Response) => {
//   try {
//     const token = req.query.token;
//     console.log(token);

//     const user = await User.findOne({
//       verificationCode: token,
//       verificationCodeExpiry: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.status(401).json({
//         message: " Email verification reset token is invalid or has expired.",
//         status: false,
//       });
//     }
//     user.set("emailVerified", true);
//     user.set("verificationCode", undefined);
//     user.set("verificationCodeExpiry", undefined);

//     await user.save();

//     res.status(200).json({ message: "Email has been verified", status: true });
//   } catch (error) {
//     res.status(500).json({ message: error, status: false });
//   }
// };
