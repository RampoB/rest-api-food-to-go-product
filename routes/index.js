const express = require("express");
const app = express();

const product = require("./product-routes");

const apiUrl = "/api/v1";

app.use(apiUrl, product);

module.exports = app;