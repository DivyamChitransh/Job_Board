const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async(req,res,next) => {
    const token = req.header('Authorization')?.replace('Bearer ','');
    try{
        const decode = jwt.verify(token,JWT_SECRET);
        req.user = decode;
        next();
    }
    catch{
        res.status(401).json({error:'Invalid token'})
    }
};

module.exports = {authenticate};