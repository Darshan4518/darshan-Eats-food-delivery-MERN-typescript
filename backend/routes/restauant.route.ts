import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { upload } from "../middlewares/multer";
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurant,
  getRestaurantOrders,
  getSingleRestaurant,
  searchRestaurants,
  updateRestaurant,
} from "../controllers/restaurent.controller";

const router = Router();

router
  .route("/create")
  .post(isAuthenticated, upload.single("imageFile"), createRestaurant);
router.route("/admin").get(isAuthenticated, getRestaurant);
router.route("/all").get(isAuthenticated, getAllRestaurants);
router.route("/:id").get(isAuthenticated, getSingleRestaurant);
router
  .route("/update")
  .put(isAuthenticated, upload.single("imageFile"), updateRestaurant);
router.route("/oders").get(isAuthenticated, getRestaurantOrders);
router.route("/oders/:orderId/status").put(isAuthenticated);
router.route("/search/:searchText").get(isAuthenticated, searchRestaurants);

export default router;
