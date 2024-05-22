import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import protoCacheRouter from "./routes/protoCache.route.js";

dotenv.config();

const app = express();

var corsOptions = {
  origin: "*",
};

const initializeExpress = (app) => {
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

initializeExpress(app);

app.use(protoCacheRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on ports: " + process.env.PORT || 3000);
});
