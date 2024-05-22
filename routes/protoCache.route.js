import express from "express";
import ProtoController from "../controllers/protoCache.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!!");
});
router.post("/save-to-db", ProtoController.saveData);
router.get(
  "/get-recent-activities/:userId",
  ProtoController.getRecentActivities
);

export default router;
