const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1];
   if (token == null) {
        return res.sendStatus(401); // without token
   }
   jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, decoded)=>{
        if (err) {
            return res.sendStatus(403);
        }
        req.email = decoded.email;
        next();
   });
}
module.exports = verifyToken