import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  createCheckoutSession,
  getOrders,
} from "../controllers/order.controller";
const router = Router();

router.route("/").get(isAuthenticated, getOrders);
router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession);

export default router;
