import express from "express";
import { handleSubscribe } from "../controllers/subscriberController.js";

const router = express.Router();

// Define the POST route for subscribing
router.post("/", handleSubscribe); // Use the root path for the router

export default router;
