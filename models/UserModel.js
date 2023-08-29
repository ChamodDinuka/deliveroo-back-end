const { body } = require('express-validator');

const UserModel = [
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('role').notEmpty().withMessage('Role is required'),
  body('email').isEmail().notEmpty().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).notEmpty().withMessage('Password must be at least 6 characters long'),
];

module.exports = UserModel;