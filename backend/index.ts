// Import the express in typescript file
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

// import routes
import userRoute from "./routes/user.route";
import restauentoute from "./routes/restauant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";

dotenv.config();
const app: express.Application = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, _res) => {
  _res.send("TypeScript With Express");
});

// default middlewares

app.use(bodyParser({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOption));

//routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restauentoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

// listening

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
