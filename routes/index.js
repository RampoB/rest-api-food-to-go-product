const express = require("express");
const app = express();

const product = require("./product-routes");
const cart = require("./shopping-cart");

const apiUrl = "/api/v1";

app.use(apiUrl, product);
app.use(apiUrl, cart);

module.exports = app;