"use server";
import { checkAuth } from "@/lib/server-utils";
import { redirect } from "next/navigation";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async () => {
  const session = await checkAuth();
  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price: process.env.LIFETIME_PRICE,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`,
  });

  redirect(checkoutSession.url);
};
