import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { upload } from "../middlewares/multer";
import {
  createMenu,
  deleteMenu,
  editMenu,
} from "../controllers/menu.controller";

const router = Router();

router
  .route("/create")
  .post(isAuthenticated, upload.single("image"), createMenu);
router
  .route("/update/:id")
  .post(isAuthenticated, upload.single("image"), editMenu);
router.route("/delete/:id").post(isAuthenticated, deleteMenu);

export default router;
