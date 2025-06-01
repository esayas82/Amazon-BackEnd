
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();
app.use(cors({origin: true}));
app.use(express.json());
const PORT = process.env.PORT || 5002;
app.get("/", (req, res) => {
    res.status(200).json({ message: "sucess" })
}) 

app.post("/payment/create", async (req, res) => {
    const total = req.query.total;
    if (total > 0) {
       const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd",
       });
        console.log(paymentIntent)
        res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        });
  }else {
        res.status(403).json({ error: "Total amount must be greater than zero." });
    }
})
// Export the app for Firebase Functions



app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Amazon Server running on port ${PORT}, http://localhost:${PORT}`);

})

