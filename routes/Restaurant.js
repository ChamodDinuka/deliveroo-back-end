const express = require('express');
const moment = require('moment')
const { validationResult } = require('express-validator');
const RestaurantModel = require('../models/RestaurantModel');
const { CreateRestaurant, UpdateRestaurant, GetRestaurants, DeleteRestaurants } = require('../controllers/RestaurantController')
const response = require('../configurations/response');

const router = express.Router();

router.post('/restaurant', RestaurantModel, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response.fail(req, res, response.messages.invalid_params, { errors: errors.array() });
        }
        const {
            name, address
        } = req.body;

        let newRestaurant = {
            name,
            address,
            createdAt: moment().format('YYYY-MM-DD HH:mm'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm')
        };
        const insertRestaurant = await CreateRestaurant(newRestaurant);
        response.success(req, res, insertRestaurant, 'Restaurant created successfull');
    } catch (err) {
        response.fail(req, res, response.messages.server_error, 'Internal server error');
    }
});

router.put('/restaurant/:id', RestaurantModel, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response.fail(req, res, response.messages.invalid_params, { errors: errors.array() });
        }
        const {
            name, address
        } = req.body;

        let newRestaurant = {
            name,
            address,
            createdAt: moment().format('YYYY-MM-DD HH:mm'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm')
        };
        const insertRestaurant = await UpdateRestaurant(newRestaurant, req.params.id);
        response.success(req, res, insertRestaurant, 'Restaurant created successfull');
    } catch (err) {
        response.fail(req, res, response.messages.server_error, 'Internal server error');
    }
});
router.get('/restaurant', async (req, res) => {
    try {
        const restaurants = await GetRestaurants();
        response.success(req, res, restaurants, 'Get retaurant successfull');
    } catch (err) {
        response.fail(req, res, response.messages.server_error, 'Internal server error');
    }
});
router.delete('/restaurant/:id', async (req, res) => {
    try {
        const restaurants = await DeleteRestaurants(req.params.id);
        response.success(req, res, restaurants, 'Delete retaurant successfull');
    } catch (err) {
        response.fail(req, res, response.messages.server_error, 'Internal server error');
    }
});


module.exports = router;