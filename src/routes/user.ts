import { Router } from "express";
import * as userController from "../controllers/user";
import { loginRequired } from "../middleware/auth";
import { asyncHandler } from "../middleware/validators/helpers";
// import { verifyAccess } from "../middleware/auth";s
// import { UserRoles } from "../models/user";
const router = Router();

router.put("/update", loginRequired, asyncHandler(userController.updateUser));
// router.get("/", getAllUsers);
// router.get("/:_id", getOneUser);

// export default router;
export default (app: Router) => app.use("/user", router);
