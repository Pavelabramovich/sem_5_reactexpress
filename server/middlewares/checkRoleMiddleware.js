const jsonwebtoken = require('jsonwebtoken');


function checkRole(roleId) {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }
        
        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(401).json({message: "User is unauthorized"});
            }

            const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);
            if (decoded.role !== roleId) {
                return res.status(403).json({message: "User is unauthorized"});
            }

            req.user = decoded;
            next();
        } catch (e) {
            return res.status(401).json({message: "User is unauthorized"});
        }
    }
}

module.exports = checkRole;