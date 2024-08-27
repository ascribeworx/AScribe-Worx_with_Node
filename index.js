import express from "express";
import path from "path";
import mongoose from "mongoose";
import session from "express-session";
import flash from "express-flash";
import dotenv from "dotenv";
import Subscriber from "./models/Subscriber.js";
import ContactUs from "./models/ContactUs.js";
import DB_NAME from "./constants.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

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
app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash("Success");
  next();
});

mongoose
  .connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
  .then(() => console.log("MongoDB connected Successfully"))
  .catch((error) => console.error("MongoDB Connection Error: ", error));

// Routes
app.post("/subscribe", async (req, res) => {
  const email = req.body.email;

  try {
    // Check if the email already exists
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      // Email already exists
      req.flash("success", "Thank you. You are already subscribed!");
      return res.redirect("/");
    }

    // Prepare the new subscriber object
    const newSubscriber = { email: email };

    // Insert the new subscriber using insertOne
    await Subscriber.collection.insertOne(newSubscriber);

    // Flash success message
    req.flash("success", "Subscribed Successfully!");
    res.redirect("/");
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to Subscribe. Please Try Again!");
    res.redirect("/");
  }
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Insert a new contact details
    const newMessage = {
      name: name,
      email: email,
      message: message,
    };

    // Insert the new message
    await ContactUs.collection.insertOne(newMessage);

    // Flash success message
    req.flash(
      "success",
      "Thanks for contacting us! We have received your message successfully."
    );
    res.redirect("/");
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to Send Message. Please Try Again!");
    res.redirect("/");
  }
});

app.get("/", (req, res) => {
  res.render("index", { messages: req.flash("success") });
});

app.get("/about-us", (req, res) => {
  res.render("about_us", { messages: req.flash("success") });
});

app.get("/contact-us", (req, res) => {
  res.render("contact_us", { messages: req.flash("success") });
});

app.get("/our-clients", (req, res) => {
  res.render("our_clients", { messages: req.flash("success") });
});

app.get("/our-expertise", (req, res) => {
  res.render("our_expertise", { messages: req.flash("success") });
});

app.get("/why-choose-us", (req, res) => {
  res.render("why_choose_us", { messages: req.flash("success") });
});

app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
});
