// Controller
const query = require("../database");
const path = require("path");
const fs = require("fs");

async function getProduct(req, res) {
    // const {name, harga, bahan, description} = res.body;
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
    const {id} = req.body;
    try {
        const cekId = await query(
            `
                SELECT name, harga, bahan, description FROM products 
                WHERE id = ?;
            `,
            [id]
            // [req.params.id]
        );
        res.status(200).json("produk ditemukan");
    } catch (error) {
        return res.status(400).json("Ada yang salah");
    }
}

async function saveProduct(req, res) {
    const {name, harga, bahan, description} = req.body;
    const {pd_image} = req.files;
    if (
        name === undefined||
        name === ""||
        harga === undefined||
        isNaN(+harga)||
        bahan === undefined||
        bahan === ""||
        description === undefined||
        description === ""
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
                INSERT INTO products(name,harga,bahan,description, pd_image)
                VALUES(?,?,?,?,?);
            `,
            [name, harga, bahan, description, pd_image]
            // [name, harga, bahan, description]
        );
        return res.status(200).json("berhasil menambahkan");
    } catch (error) {
        return res.status(400).json("Ada yang salah");
    }
}

async function updateProduct(req, res) {
    const {name, harga, bahan, description} = req.body;
    const {pd_image} = req.files;
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