const express = require("express");
const router = express.Router();

const { getProduct, 
        getProductById,
        saveProduct,
        updateProduct,
        deleteProduct } = require("../controller/product-controller");

router.get('/product', getProduct);
router.get('/product/:id', getProductById);
router.post('/product', saveProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);

module.exports = routes;