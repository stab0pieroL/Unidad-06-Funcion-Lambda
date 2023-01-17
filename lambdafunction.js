const requestHandler = (req, res) => {
require("dotenv").config();
const express = require("express");
const mercadopago = require("mercadopago");
const axios = require("axios");
const cors = require("cors");

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/mercado-pago", async (request, response) => {
  const { data } = request.body;
  const res = await axios.get(
    `https://api.mercadopago.com/v1/payments/${data.id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    }
  );
  console.log(res.data);
});

app.post("/process_payment", async (req, res) => {
  const { body } = await mercadopago.payment.save(req.body);

  const { status, status_detail, id } = body;
  res.status(201).json({ status, status_detail, id });
});

const PORT = 9004;

app.listen(PORT, () => console.log(`Server init http://localhost:${PORT}`));
};