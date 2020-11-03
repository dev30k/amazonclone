const functions = require('firebase-functions');
const express = require("express");
const cors=require("cors");
const { response } = require('express');
const { RepeatOneSharp } = require('@material-ui/icons');
const stripe = require("stripe")('sk_test_51HiviFH4p5tTdSy5DJUHyUktNFovtK5hv6HSC9oaIN8XFsvMqCeuHBziCmq4RwPkhY2C2XUdmJ619h8mTAuB6Ofp00ObJ9TEzQ')
// API

// APP CONFIG
const app = express();
// MIDDLEWARES
app.use(cors({origin: true}));
app.use(express.json());

// API ROUTES
app.get('/',(request,response) =>response.status(200).send("hello world"));
app.post('/payments/create',async(request,response)=>{
    const total=request.query.total;

    console.log("payment received>>>",total)

    const paymentIntent= await stripe.paymentIntents.create({
        amount:total,
        currency:"usd"
    })
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// LISTEN COMMAND
exports.api=functions.https.onRequest(app)