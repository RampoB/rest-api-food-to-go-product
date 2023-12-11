const express = require("express");
const routes = express.Router();
const { getProduct, 
        getProductById,
        saveProduct,
        updateProduct,
        deleteProduct } = require("../controller/product-controller");

routes.get('/product', getProduct);
routes.get('/product/:id', getProductById);
routes.post('/product', saveProduct);
routes.put('/product/:id', updateProduct);
routes.delete('/product/:id', deleteProduct);

module.exports = routes;