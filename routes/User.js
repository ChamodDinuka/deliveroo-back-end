const express = require('express');
const moment = require('moment')
const { validationResult } = require('express-validator');
const UserModel = require('../models/UserModel');
const { CreateUser, GetUser } = require('../controllers/UserController')
const response = require('../configurations/response');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/user', UserModel, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response.fail(req, res, response.messages.invalid_params, { errors: errors.array() });
        }
        const {
            first_name, last_name, email, password
        } = req.body;

        const salt = await bcrypt.genSalt(10);
        encryptedPassword = await bcrypt.hash(password, salt);

        let newUser = {
            first_name,
            last_name,
            email,
            password :encryptedPassword,
            createdAt: moment().format('YYYY-MM-DD HH:mm'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm')
        };
        const insertUser = await CreateUser(newUser);
        response.success(req, res, insertUser, 'Restaurant created successfull');
    } catch (err) {
        console.log(err)
        response.fail(req, res, response.messages.server_error, 'Internal server error');
    }
});

router.get('/user', async (req, res) => {
    try {
        const user = await GetUser(req.body.email);
        response.success(req, res, user, 'Get user successfull');
    } catch (err) {
        response.fail(req, res, response.messages.server_error, 'Internal server error');
    }
});

module.exports = router;