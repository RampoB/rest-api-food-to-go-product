// Controller
const query = require("../database");
const path = require("path");
const fs = require("fs");

async function getProduct(req, res) {
    // const {name, price, ingredient, desc, photoProduct} = res.body;
    try {
        const getResponse = await query(
            `
            SELECT * FROM products;
            `
        );
        res.status(200).json(getResponse);
    } catch (error) {
        return res.status(400).json("Ada yang salah");
    }
}

async function getProductById(req, res) {
    try {
        
    } catch (error) {
        return res.status(400).json("Ada yang salah");
    }
}

async function saveProduct(req, res) {
    const {name, price, ingredient, desc, photoProduct} = req.body;
    if (
        name === undefined||
        name === ""||
        price === undefined||
        isNaN(+price)||
        ingredient === undefined||
        ingredient === ""||
        desc === undefined||
        desc === ""||
        photoProduct === undefined||
        photoProduct === ""
    ) {
        return res.status(400).json("Invalid Data");
    }
    
    try {
        // logic handling
        const cekNama = await query(
            `
            SELECT id FROM products WHERE name = ?
            `,
            [name]
        );
        if (cekNama.length > 0) {
            return res.status(400).json("nama produk telah ada");
        }

        await query(
            `
                INSERT INTO products(name,harga,bahan,description,product-image)
                VALUES(?,?,?,?,?);
            `,
            [name, price, ingredient, desc, photoProduct]
        );
        return res.status(200).json("berhasil menambahkan");
    } catch (error) {
        return res.status(400).json("Ada yang salah");
    }
}

async function updateProduct(req, res) {
    const {name, price, ingredient, desc, photoProduct} = req.body;
    try {
        
    } catch (error) {
        return res.status(400).json("Ada yang salah");
    }
}

async function deleteProduct(req, res) {
    try {
        
    } catch (error) {
        return res.status(400).json("Ada yang salah");
    }
}

module.exports = {
    getProduct,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
}