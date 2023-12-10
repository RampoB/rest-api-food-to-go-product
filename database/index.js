const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb",
    connectionLimit:10,
    enableKeepAlive:true,
    keepAliveInitialDelay:0
});

async function query(query, value) {
    try {
        const [excecuteQuery] = await db.query(query, value ?? []);
        return excecuteQuery;
    } catch (error) {
        console.log(error);
    }
}

module.exports = query;