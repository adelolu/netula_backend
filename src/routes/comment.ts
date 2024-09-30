import { Router } from "express";
import { addComment, getComments } from "../controllers/comment";
// import { emailVerified, verifyAccess } from "../middleware/auth";

const router = Router();
// router.post("/:postId", emailVerified, addComment);
router.get("/:postId", getComments);

export default (app: Router) => app.use("/comment", router);
// export default router;
