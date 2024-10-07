const express = require("express");
const router = new express.Router();
const Cart = require("../models/cart");
const Wishlist = require("../models/wishlist");
const Product = require("../models/product");
const {auth} = require("../middleware/mid");
const Order = require("../models/order");
const User = require("../models/user");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);














const YOUR_DOMAIN = 'http://localhost:3000';

router.post('/3', auth, async (req, res) => {

    const user = req.userId

    const data = await Cart.findOne({userId: user})  //.populate({path: "products", populate: {path: "productId"}})


  const session = await stripe.checkout.sessions.create({
    customer_email: 'customer@example.com',
    submit_type: 'pay',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['IE', 'NG'],
    },
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: data.products.total,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});





router.post("/o", auth, async (req, res) => {

  const id = await User.findOne({_id: req.userId})  //.populate({path: "products", populate: {path: "productId"}})
  const cart = await Cart.findOne({userId: req.userId})  //.populate({path: "products", populate: {path: "productId"}})


  const paymentMethods = await stripe.paymentMethods.list({
    customer: id.paymentId,
    type: "card",
  });


   if (!id.paymentId || !paymentMethods.data[0]?.id) {
    

  // Create a PaymentIntent with the order amount and currency

  const customer = await stripe.customers.create();

  const user = await User.findOneAndUpdate({_id: req.userId}, {paymentId: customer.id}, {
    new: true
  });

  console.log(paymentMethods);


  user.save()


  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer.id,
    setup_future_usage: "off_session",
    receipt_email: 'sanuthrahman@gmail.com',
   //  submit_type: 'pay',
    // billing_address_collection: 'auto',
     shipping: {
      allowed_countries: ['IE', 'NG'],
    },

    //mode: 'payment',

    amount: 200 * 100, // cart.totalCost * 100, //calculateOrderAmount(data),

    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
        enabled: true,
      },
    
  },


      console.log(cart)

);  res.send({
    clientSecret: paymentIntent.client_secret,
  });
  }

  

  else if(id.paymentId) {
    chargeCustomer(id.paymentId, cart , res)
  }
    
  console.log(id);








});








router.post("/", auth, async (req, res) => {

  const id = await User.findOne({_id: req.userId})  //.populate({path: "products", populate: {path: "productId"}})
  const cart = await Cart.findOne({userId: req.userId})  //.populate({path: "products", populate: {path: "productId"}})

  // Create a PaymentIntent with the order amount and currency
    const customer = await stripe.customers.create();

if (!id.paymentId) {
  
    const user = await User.findOneAndUpdate({_id: req.userId}, {paymentId: customer.id}, {
      new: true
    });
  
    // console.log(paymentMethods);
  
  
    user.save()
}


  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer.id,
    receipt_email: 'sanuthrahman@gmail.com',

   //  submit_type: 'pay',
    // billing_address_collection: 'auto',
    //  shipping: 'auto',
    

    //mode: 'payment',

    amount: 500 * 100, // cart.totalCost * 100, //calculateOrderAmount(data),

    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
        enabled: true,
      },
    
  },



);  res.send({
    clientSecret: paymentIntent.client_secret,
  });
  

  


  console.log(id);








});












// This is your test secret API key.
// Replace this endpoint secret with your endpoint's unique secret
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks
const endpointSecret = 'whsec_4ab892302ab6ec4892387cc1022520047132237e528a41829b78d9a521aa17be'// ||   process.env.STRIPE_ENDPOINT;


router.post('/webhooks', express.raw({type: 'application/json'}), (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});













router.post('/webhook',  express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

 const rawBody = request.rawBody;


  let event;
  if (endpointSecret) {
    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`⚠️  Webhook signature verification failed: ${err.message}`);
        console.log(`⚠️  Webhook signature verification failed.`, err.message);

        return;
    }



    
    if (event.type === 'payment_intent.succeeded') {
        async function order (err) {  
              const user = event.data.object.customer // request.userId 

           const cart = await Cart.findOne({paymentId: user})  //.populate({path: "products", populate: {path: "productId"}})
           const order = await Order.findOne({userId: user})  //.populate({path: "products", populate: {path: "productId"}})

           console.log(event.receipt_email)
          if (err) {
            console.log(err+44);
            return res.redirect("/checkout");
          }
          
          const orders = new Order({
            userId: user._id,
            
              totalCost: cart.totalCost,
              products: cart.products,
          
          //   address: req.body.address,
            transactionId:  event.data.object.id,
            paymentStatus: event.data.object.payment_status,

          });
          orders.save();
          // req.session?.cart = null;
                          Cart.findByIdAndDelete(cart._id);

               cart.save();
      
        }

        console.log(event)
      
         order()
   
            }

  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;

    case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      break;
    case 'checkout.session.async_payment_succeeded':
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      break;
    case 'checkout.session.expired':
      const checkoutSessionExpired = event.data.object;
      // Then define and call a function to handle the event checkout.session.expired
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});





















const chargeCustomer = async (customerId, cart, res) => {
  // Lookup the payment methods available for the customer
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
    type: "card",
  });

  console.log(paymentMethods);
  
  try {
    // Charge the customer and payment method immediately

    const paymentIntent = await stripe.paymentIntents.create({
      // customer: customerId,
      // setup_future_usage: "off_session",
     receipt_email: 'sanuthrahman@gmail.com',
      // submit_type: 'pay',
      // billing_address_collection: 'auto',
      shipping: {
        allowed_countries: ['IE', 'NG'],
      },
      //   payment_method: paymentMethods.data[0].id,
      // off_session: true,
      // confirm: true,
      // mode: 'payment',
  
      // amount: 200 * 100, // cart.totalCost * 100, //calculateOrderAmount(data),
  
    


      amount: 1099,
      currency: "eur",
      customer: customerId,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
  
      
    })

    res.send({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (err) {
    // Error code will be authentication_required if authentication is needed
    console.log("Error code is: ", err);
    const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
    console.log("PI retrieved: ", paymentIntentRetrieved.id);
  }
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Alternatively, set up a webhook to listen for the payment_intent.succeeded event
  // and attach the PaymentMethod to a new Customer
  const customer = await stripe.customers.create();

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer.id,
    setup_future_usage: "off_session",
    amount: calculateOrderAmount(items),
    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  });
});




module.exports = router;