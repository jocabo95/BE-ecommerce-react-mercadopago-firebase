const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
require("dotenv").config();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

app.use(express.json());
app.use(cors());

// endpoints
app.get("/", (req, res) => {
  res.send("todo okay");
});

//mercadopago endpoint
app.post("/create_preference", (req, res) => {
  let preference = {
    items: req.body.items,
    back_urls: {
      success: "http://localhost:5173/shop",
      failure: "http://localhost:5173/shop",
      pending: "",
    },
    auto_return: "approved",
    shipments: {
      cost: +req.body.shipment_cost,
      mode: "not_specified",
    },
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(8000, () => {
  console.log("servidor corriendo");
});
