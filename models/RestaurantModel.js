const { body } = require('express-validator');

const RestaurantModel = [
  body('name').notEmpty().withMessage('Username is required'),
  body('address').notEmpty().withMessage('Username is required'),
];

module.exports = RestaurantModel;