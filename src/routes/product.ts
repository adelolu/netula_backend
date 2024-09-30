import { Router } from "express";
import * as controller from "../controllers/product";
import { asyncHandler } from "../middleware/validators/helpers";
import validate from "../middleware/validators/validate";
import * as validator from "../middleware/validators/product";
import { validateAccess } from "../middleware/auth";
import { UserRoles } from "../types/user";

const router = Router();

router.post(
  "/",
  validate(validator.create, { body: true }),
  validateAccess([UserRoles.admin]),
  asyncHandler(controller.create)
);

export default (app: Router) => app.use("/product", router);
// export default router;
