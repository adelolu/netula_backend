import { NextFunction, Request, RequestHandler, Response } from "express";
import { makeResponse, sendErrorResponse } from "../helpers/response";
import { MakeResponse } from "../types/custom";
import { verifyToken } from "../helpers/utils";
import { findUserById } from "../repository/user";

export const loginRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const validated = await checkUser(req, res);
  if (!validated.status) {
    return sendErrorResponse(res, validated.message, {}, 401);
  }
  return next();
};

export const validateAccess = (roles: string[]): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const validated = await checkUser(req, res);
    if (!validated.status) {
      return sendErrorResponse(res, validated.message, {}, 401);
    }

    if (!roles.includes(req.user.role)) {
      return sendErrorResponse(
        res,
        "You are not authorized to perform this action",
        {},
        403
      );
    }
    return next();
  };
};

const checkUser = async (
  req: Request,
  res: Response
): Promise<MakeResponse> => {
  const token = req.headers.authorization;
  if (!token) {
    return makeResponse(false, "LOGIN_REQUIRED");
  }
  if (!token.split(" ")[1]) {
    return makeResponse(false, "LOGIN_REQUIRED");
  }
  const verified = await verifyToken(
    token.split(" ")[1]!,
    process.env.jwt_secret!,
    findUserById
  );
  if (!verified.status || !verified.data) {
    return makeResponse(
      false,
      verified.message,
      {},
      verified.statusCode || 401
    );
  }
  req.user = verified.data;
  return makeResponse(true, "");
};
