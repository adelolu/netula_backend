import { Router } from "express";
import * as controller from "../controllers/auth";
// import { verifyAccess } from "../middleware/auth";
import { UserRoles } from "../types/user";
import validate from "../middleware/validators/validate";
import * as validator from "../middleware/validators/auth";
import { asyncHandler } from "../middleware/validators/helpers";
const router = Router();

router.post(
  "/register",
  validate(validator.register, { body: true }),
  asyncHandler(controller.register)
);
router.post(
  "/login",
  validate(validator.login, { body: true }),
  controller.login
);

router.post(
  "/admin/login",
  validate(validator.login, { body: true }),
  controller.adminLogin
);

//not tested

router.post(
  "/reset-password",
  validate(validator.resetPassword, { body: true }),
  controller.resetPassword
);

router.post(
  "/forgot-password",
  validate(validator.forgotPassword, { body: true }),
  controller.forgotPassword
);
// router.post("/adminsignup", verifyAccess([UserRoles.admin]), createAdmin);

export default (app: Router) => app.use("/auth", router);
