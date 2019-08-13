'use strict';

const mongoose = require('mongoose');
const md5 = require('md5');
const authService = require('../services/auth-service');

const User = mongoose.model('User');

module.exports = {
    async login(req, res) {

        try {
            const user = await User.findOne({
                email: req.body.email,
                password: md5(req.body.password)
            });
    
            if (!user) {
                return res.status(401).send({
                    message: "Email or password invalid!"
                });
            }
    
            const token = await authService.generateToken({
                id: user._id,
                email: user.email,
                name: user.name,
            });
    
            return res.status(201).send({
                token,
                data: user
            });

        } catch (error) {
            return res.status(500).send({
                message: 'Error at process the request.'
            });
        }
    }
};