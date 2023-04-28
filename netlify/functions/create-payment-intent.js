// serverless function logic
// we are using netlify here, which used Amazon Lambda under the hood (which works for approx 10 secs, 
// which is enough for us to create & send a req, receive a response from stripe, and send back a req)

// now stripe only accepts request from backend, to setup the same, we also have
// installed stripe backend libraby via 'yarn add stripe dotenv' .
// the dotenv here is used to install the .env environment which is not present in the stripe set-up backend
// environment, but is by default present in the 'create-react-app' land.

// non ES6 syntax, using vanilla JS import statement basically. node JS writing style.

// netlify works with functions as if they are API endpoints

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    try {
        const { amount } = JSON.parse(event.body);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "inr",
            payment_method_types: ["card"],
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent }),
        };
    }
    catch (error) {
        console.log({ error });

        return {
            status: 400,
            body: JSON.stringify({ error }),
        }
    }
};