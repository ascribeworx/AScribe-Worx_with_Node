import ContactUs from "../models/ContactUs.js";

export const handleContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = { name, email, message };
    await ContactUs.collection.insertOne(newMessage);

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
};
