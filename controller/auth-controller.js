const query = require("../database");
const {randomUUID} = require("crypto");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function register(req, res) {
    const{nama_depan, nama_belakang, email, password, no_handphone} = req.body;
    if (nama_depan === undefined ||
        nama_depan === "" ||
        nama_belakang === undefined ||
        nama_belakang === "" ||
        email === undefined ||
        email === "" ||
        password === undefined ||
        password === "" ||
        no_handphone === undefined ||
        isNaN(+no_handphone)) 
    {
        return res.status(400).json("Invalid Data");
    }
    try {
        const isDuplicate = await query(
            `
                SELECT id FROM register_user WHERE email = ?;
            `,[email]
        )
        if (isDuplicate.length > 0 ) {
            return res.status(400).json("User telah ada");
        }
        const salt = await bcryptjs.genSalt(12);
        const hash = await bcryptjs.hash(password, salt);

        await query(
            `
                INSERT INTO register_user VALUES(?,?,?,?,?)
            `,
            [randomUUID(), nama_depan, nama_belakang, email, password, no_handphone]
        );
        return res.status(200).json("Register berhasil");
    } catch (error) {
        return res.status(400).json("Something went wrong");
    }
}

async function login(req, res) {
    const {email, password} = req.body;
    try {
        
    } catch (error) {
        return res.status(400).json("Something went wrong");
    }
}

module.exports = {
    register,
    login,
};