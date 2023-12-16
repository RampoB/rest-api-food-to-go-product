const query = require("../database");
const jwt = require("jsonwebtoken");

async function refreshToken(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.sendStatus(401);
        }
        const user = await query(
            `
                SELECT FROM register_user WHERE refresh_token = ?
            `,
            [refreshToken]
        );
        if (!user[0]) {
            return res.sendStatus(403);
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                return res.sendStatus(403);
            }
            const userId= user[0].id;
            const email = user[0].email;
            const accesToken = jwt.sign({
                userId, 
                email
            }, process.env.ACCES_TOKEN_SECRET,{
                expiresIn:'15s'
            });
            res.json({accesToken});
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = refreshToken;