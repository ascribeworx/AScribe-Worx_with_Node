import express from "express";
import path from "path";
import mongoose from "mongoose";
import session from "express-session";
import flash from "express-flash";
import dotenv from "dotenv";
import DB_NAME from "./constants.js";

import { flashMessage } from "./middlewares/flashMessage.js";
import contactRoutes from "./routers/contactRoutes.js";
import subscriberRoutes from "./routers/subscriberRoutes.js";

const app = express();
const PORT = 8000;

// Middlewares
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Configuring the dotenv
dotenv.config({
  path: "./env",
});

app.use(express.static(path.resolve("./public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Flash middleware and Custom flash middleware
app.use(flash());
app.use(flashMessage);

// Connect to MongoDB
mongoose
  .connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
  .then(() => console.log("MongoDB connected Successfully"))
  .catch((error) => console.error("MongoDB Connection Error: ", error));

// Use routers
app.use("/contact", contactRoutes);
app.use("/subscribe", subscriberRoutes); 

app.get("/", (req, res) => {
  res.render("index", { messages: req.flash("success") });
});

// Other routes...

app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
});
