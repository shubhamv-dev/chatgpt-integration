require("dotenv").config()

const stripe = require('stripe')(`${process.env.STRIPE_KEY }`);
exports.stripeProductCreate = async (req, res) => {
    try {
        const {amount} = req.body
      const product = await stripe.products.create({
        name: 'Subscription', // Replace with your product name
        type: 'service', // Replace with 'good' if it's a physical product
      });
     
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: amount*100, // Amount in cents (e.g., $45.00)
        currency: 'usd',
        recurring: {
          interval: 'month',
        },
      });
  
      // Create a Checkout Session with subscription mode
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        mode: 'subscription', // Set the mode to subscription
        success_url: `${process.env.FRONTEND_URL}/`, // Replace with your success URL
        cancel_url: `${process.env.FRONTEND_URL}/pricing`, // Replace with your cancel URL
      });
  //testt git
      res.json({ url: session.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating payment link.' });
    }
  }


