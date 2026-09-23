import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      // mode: "subscription",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Note App Premium",
            },
            unit_amount: 500,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.FE_URL}/success`,
      cancel_url: `${process.env.FE_URL}/cancel`,
    });

    res.json({
      url: session.url,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to create checkout session",
    });
  }
};