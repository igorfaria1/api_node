'use strict';
const jwt = require('jsonwebtoken');
const key = '123456';

module.exports = {
    async generateToken(data) {
        return jwt.sign(data, key, {expiresIn: '1d'});
    },

    async decodeToken(token) {
        let data = await jwt.verify(token, key)
    },

    async authorize(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
        if (!token) {
            res.status(401).json({
                message: 'Restrict Access'
            });
        } else {
            jwt.verify(token, key, function (error, decoded) {
                if (error) {
                    res.status(401).json({
                        message: 'Invalid Token'
                    });
                } else {
                    next();
                }
            });
        }
    }
};