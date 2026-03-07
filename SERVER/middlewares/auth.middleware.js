const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/env');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken;
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jsonwebtoken.verify(token, JWT_SECRET);
        req.user = {
            id: decoded.userId,
            role: decoded.role
        };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;