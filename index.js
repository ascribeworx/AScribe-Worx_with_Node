const express = require("express");
const path = require("path");

const app = express();
const PORT = 8000;

// middlewares
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static(path.resolve("./public")));

// routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about-us", (req, res) => {
  res.render("about_us");
});

app.get("/contact-us", (req, res) => {
  res.render("contact_us");
});

app.get("/our-clients", (req, res) => {
  res.render("our_clients");
});

app.get("/our-expertise", (req, res) => {
  res.render("our_expertise");
});

app.get("/why-choose-us", (req, res) => {
  res.render("why_choose_us");
});

app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
});
