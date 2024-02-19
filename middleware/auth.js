const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({error: " no token"}) 
    }
    try {
        const tokenBearer = token.replace('Bearer ' , '');
        const decoded = jwt.verify(tokenBearer , process.env.SECRETKEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {   
        res.status(401).json({error: "invalid token"})
    }
};

module.exports = authMiddleware;