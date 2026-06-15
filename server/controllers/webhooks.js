import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  const payload = req.body;
  console.log("Payload", payload)

  const headers = {
    "svix-id": req.headers["svix-id"],
    "svix-timestamp": req.headers["svix-timestamp"],
    "svix-signature": req.headers["svix-signature"],
  };

  let event;

  try {
    event = whook.verify(payload, headers);
  } catch (err) {
    return res.status(400).json({ message: "Invalid webhook signature" });
  }

  const { data, type } = event;
  console.log("Event", event)

  switch (type) {
    case "user.created": {
      await User.create({
        _id: data.id,
        name: `${data.first_name || ""} ${data.last_name || ""}`,
        email: data.email_addresses[0].email_address,
        imageUrl: data.image_url,
      });
      break;
    }

    case "user.updated": {
      await User.findByIdAndUpdate(data.id, {
        name: `${data.first_name || ""} ${data.last_name || ""}`,
        email: data.email_addresses[0].email_address,
        imageUrl: data.image_url,
      });
      break;
    }

    case "user.deleted": {
      await User.findByIdAndDelete(data.id);
      break;
    }
  }

  return res.json({ success: true });
};