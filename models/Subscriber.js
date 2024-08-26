import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { collection: "newsletter_subscribers" }
); 

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

export default Subscriber;
