const { validationResult } = require('express-validator');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const response = require('../configurations/response');
const UserModel = require('../models/UserModel');
const { GetUser } = require('../controllers/UserController');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const {
            email, password
        } = req.body;

        const user = await GetUser(email);

        if (!user) {
          return response.fail(req, res, response.messages.server_error, 'Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return response.fail(req, res, response.messages.server_error, 'Invalid credentials');
        }
        const payload = {
            user: {
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              role: user.role
            }
          };
  
          jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            return response.success(req, res, { token }, 'Authenticated');
          });
    } catch (err) {
        response.fail(req, res, response.messages.server_error, 'Internal server error');
    }
});

module.exports = router;

