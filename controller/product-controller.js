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
    // const {id} = req.body;
    try {
        const data = await query(
            `
                SELECT name, harga, bahan, description FROM products 
                WHERE id = ?;
            `,
            // [id]
            [req.params.id]
        );
        res.status(200).json({data});
    } catch (error) {
        return res.status(400).json("Ada yang salah");
    }
}

async function saveProduct(req, res) {
    const {name, harga, bahan, description} = req.body;
    const {pd_image} = req.body;

    // WKWKWKWWKWKWK comment terus
    // if (
    //     name === undefined||
    //     name === ""||
    //     harga === undefined||
    //     isNaN(+harga)||
    //     bahan === undefined||
    //     bahan === ""||
    //     description === undefined||
    //     description === ""
    // ) {
    //     return res.status(400).json("Invalid Data");
    // }
    
    try {
        // logic handling

        // const cekNama = await query(
        //     `
        //     SELECT id FROM products WHERE name = ?
        //     `,
        //     [name]
        // );
        // if (cekNama.length > 0) {
        //     return res.status(400).json("nama produk telah ada");
        // }

        const {DataProduct:id} = await query(
            `
                INSERT INTO products(name,harga,bahan,description, pd_image)
                VALUES(?,?,?,?,?);
            `,
            [name, harga, bahan, description, pd_image]
            // [name, harga, bahan, description]
        );
        // if (name.affectedRows > 0) {
        //     return res.status(404).json("Data sudah ada");
        // }
        return res.status(200).json({
            message: "berhasil menyimpan produk",
            data:{
                id,
                ...req.body
            },
        });
    } catch (error) {
        return res.status(400).json("Ada yang salah");
    }
}

async function updateProduct(req, res) {
    const {name, harga, bahan, description} = req.body;
    const {pd_image} = req.body;
    try {
        const ubahData = await query(
            `
            UPDATE products SET
            name = ?, harga = ?, bahan = ?, description = ?, pd_image = ?
            WHERE id = ?;
            `,
            [req.params.id,name,harga, bahan, description, pd_image]
        );

        if (ubahData.affectedRows === 0) {
            return res.status(400).json({
                message: `Data dengan id ${req.params.id} tidak ada`
            })
        }

        return res.status(200).json({
            message:"Update data berhasil",
            data:{
                id:req.params.id,
                ...req.body
            }
        });
    } catch (error) {
        return res.status(400).json("Ada yang salah");
    }
}

async function deleteProduct(req, res) {
    try {
        const deleteData = await query(
            `
                DELETE FROM products
                WHERE id = ?;
            `,
            [req.params.id]
        );
        if (deleteData.affectedRows === 0) {
            return res.status(404).json("Data tidak ada dan tidak dapat dihapus");
        }
        return res.status(200).json({
            message: "Data berhasil dihapus",
            data:{
                id:req.params.id
            }
        });
    } catch (error) {
        return res.status(400).json("Ada yang salah");
    }
}

module.exports = {
    getProduct,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct,
}