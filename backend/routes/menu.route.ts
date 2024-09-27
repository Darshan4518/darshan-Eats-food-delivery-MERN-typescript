import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { upload } from "../middlewares/multer";
import {
  createMenu,
  deleteMenu,
  editMenu,
  getMenu,
} from "../controllers/menu.controller";

const router = Router();

router
  .route("/create")
  .post(isAuthenticated, upload.single("image"), createMenu);
router
  .route("/update/:id")
  .put(isAuthenticated, upload.single("image"), editMenu);
router.route("/delete/:id").delete(isAuthenticated, deleteMenu);
router.route("/:id").get(isAuthenticated, getMenu);

export default router;
