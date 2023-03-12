const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  //organising the items as the format
  const transformedItems = items.map((item) => ({
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
        description: item.description,
      },
    },
  }));

  //prepare the format
  const session = await stripe.checkout.sessions.create({
    // payment_method_types: ["card"],
    // // shipping_rates: ["shr_1MkhjpSFwpst7WfOOYZrRrjo"],
    // shipping_options: [
    //   {
    //     shipping_rate_data: {
    //       type: "fixed_amount",
    //       fixed_amount: { amount: 0, currency: "usd" },
    //       display_name: "Free shipping",
    //       delivery_estimate: {
    //         minimum: { unit: "business_day", value: 5 },
    //         maximum: { unit: "business_day", value: 7 },
    //       },
    //     },
    //     // shipping_rate: ["shr_1MkhjpSFwpst7WfOOYZrRrjo"],
    //   },
    // ],
    // shipping_address_collection: {
    //   allowed_countries: ["GB", "US", "CA", "IN"],
    // },
    // line_items: transformedItems,
    // mode: "payment",
    // success_url: `${process.env.HOST}/sucess`,
    // cancel_url: `${process.env.HOST}/checkout`,
    // metadata: {
    //   email,
    //   images: JSON.stringify(items.map((item) => item.image)),
    // },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/sucess`,
    cancel_url: `${process.env.HOST}/checkout`,
  });

  res.status(200).json({ id: session.id });
};
