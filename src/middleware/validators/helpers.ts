import { Response, Request } from "express";
import { MakeResponse } from "../../types/custom";
import { sendErrorResponse, sendSuccessResponse } from "../../helpers/response";


export const asyncHandler =
  (cb: Function) => async (req: Request, res: Response) => {
    try {
      await cb(req, res);
    } catch (error: any) {
        console.log(error);
        
      return res.status(500).json({
        status: false,
        error: "Something Went Wrong, Please Try Again Later",
      });
    }
  };

export const responseHandler = async (res: Response, response: MakeResponse) => {
  if (response.status) {
    return sendSuccessResponse(
      res,
      response.message,
      response.data,
      response.statusCode
    );
  }
  return sendErrorResponse(
    res,
    response.message,
    {},
    response.statusCode || 400
  );
};
