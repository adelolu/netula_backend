import { Router } from "express";
import * as controller from "../controllers/review";
import { asyncHandler } from "../middleware/validators/helpers";
import validate from "../middleware/validators/validate";
import * as validator from "../middleware/validators/review";
import { loginRequired } from "../middleware/auth";
const router = Router();

router.post(
  "/:product",
  validate(validator.createReview, { body: true }),
  loginRequired,
  asyncHandler(controller.createReview)
);

export default (app: Router) => app.use("/review", router);
// export default router;
