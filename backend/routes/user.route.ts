import express from "express";
import {
  checkAuth,
  forgetPassword,
  login,
  logout,
  register,
  resetPassword,
  updateProfile,
  verifyEmail,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { upload } from "../middlewares/multer";

const router = express.Router();

router.route("/check-auth").get(isAuthenticated, checkAuth);
router.route("/signup").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/verify-email").post(verifyEmail);
router.route("/forget-password").post(forgetPassword);
router.route("/reset-password/:resetToken").post(resetPassword);
router
  .route("/profile/update")
  .put(isAuthenticated, upload.single("profilePicture"), updateProfile);

export default router;
