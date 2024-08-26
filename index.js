import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import session from "express-session";
import flash from "express-flash";
import { DB_NAME } from "./constants.js";
import dotenv from "dotenv";

const app = express();
const PORT = 8000;

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

// // MongoDB connection
// async () => {
//   try {
//     //Database Connect
//     await mongoose.connect(
//       process.env.MONGODB_URI,
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       },
//       () => {
//         console.log("Database Connected");
//       }
//     );

//     app.listen(3000, () => {
//       console.log("Server is running on port 3000 ...");
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected Successfully'))
.catch(error => console.error('MongoDB Connection Error: ', error));

// Create a schema and model for storing emails
const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// Routes
app.post("/subscribe", (req, res) => {
  const email = req.body.email;

  // Create a new subscriber instance
  const newSubscriber = new Subscriber({ email });

  // Save the new subscriber using .then()/.catch()
  newSubscriber
    .save()
    .then(() => {
      req.flash("success", "Subscribed Successfully!");
      res.redirect("/"); // Redirect to a page, e.g., homepage
    })
    .catch((error) => {
      console.error(error);
      req.flash("error", "Failed to Subscribe. Please Try Again!");
      res.redirect("/"); // Redirect to a page, e.g., homepage
    });
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
