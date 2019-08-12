'use strict';

const mongoose = require('mongoose');
const md5 = require('md5');
const User = mongoose.model('User');

module.exports = {
    async index(req, res) {
        const users = await User.find();
        return res.json(users);    
    },

    async store(req, res) {
        try {
            req.body.password = md5(req.body.password);
            const user = await User.create(req.body);
            
            return res.status(200).json({
                statusCode: 200,
                data: user
            });
            
        } catch (error) {
            return res.status(400).json({
                statusCode: 400,
                menssage: 'Error at save the new user'
            });
        }
    },

    async update(req, res) {

        if (req.body.password) {
            req.body.password = md5(req.body.password);
        }
        
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(user);
    },

    async delete(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                menssage: 'User deleted with success',
            });  
        } catch(e) {
            return res.json({
                menssage: e.message.menssage,
            });
        }
    }
};