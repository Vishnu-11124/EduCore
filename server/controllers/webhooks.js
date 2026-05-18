import { Webhook } from "svix";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const clerkWebhooks = asyncHandler(async (req, res) => {
  const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  await whook.verify(JSON.stringify(req.body), {
    "svix-id": req.headers["svix-id"],
    "svix-timestamp": req.headers["svix-timestamp"],
    "svix-signature": req.headers["svix-signature"],
  });

  const { data, type } = req.body;

  switch (type) {
    case "user.created": {
      const userData = {
        _id: data.id,
        name: `${data.first_name || ""} ${data.last_name || ""}`,
        email: data.email_addresses[0].email_address,
        imageUrl: data.image_url,
      };

      await User.create(userData);

      break;
    }

    case "user.updated": {
      const userData = {
        name: `${data.first_name || ""} ${data.last_name || ""}`,
        email: data.email_addresses[0].email_address,
        imageUrl: data.image_url,
      };

      await User.findByIdAndUpdate(data.id, userData);

      break;
    }

    case "user.deleted": {
      await User.findByIdAndDelete(data.id);

      break;
    }

    default:
      break;
  }

  return res.json({
    success: true,
    message: "Webhook processed",
  });
});