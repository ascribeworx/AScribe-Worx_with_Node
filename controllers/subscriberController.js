import Subscriber from "../models/Subscriber.js";

export const handleSubscribe = async (req, res) => {
  const { email } = req.body;

  try {
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      req.flash("success", "Thank you. You are already subscribed!");
      return res.redirect("/");
    }

    const newSubscriber = { email };
    await Subscriber.collection.insertOne(newSubscriber);

    req.flash("success", "Subscribed Successfully!");
    res.redirect("/");
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to Subscribe. Please Try Again!");
    res.redirect("/");
  }
};
