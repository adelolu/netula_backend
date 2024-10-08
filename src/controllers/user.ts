import { Request, Response } from "express";
import User from "../models/user";
import * as userLogic from "../logic/user";
import { responseHandler } from "../middleware/validators/helpers";

export const updateUser = async (req: Request, res: Response) => {
  let response = await userLogic.updateUser(req.user, req.body);
  return responseHandler(res, response);
};

//function to display all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    let users = await User.find();

    res.status(200).json({ data: users, status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    let { _id } = req.params;
    let user = await User.findOne({ _id });
    if (!user) {
      return res
        .status(400)
        .json({ message: "user does not exist", status: false });
    }

    res.status(200).json({ data: user, status: true });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};
