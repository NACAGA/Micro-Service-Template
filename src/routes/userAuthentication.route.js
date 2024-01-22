const express = require('express');
const router = express.Router();
const { body, header } = require('express-validator');
const userAuthenticationController = require('../controllers/userAuthentication.controller');

const validateRequestBody = (expectedFields) => {
    return (req, res, next) => {
        const missingFields = expectedFields.filter((field) => !(field in req.body));

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing fields: ${missingFields.join(', ')}`,
            });
        }

        next();
    };
};

validateRequestHeaders = (expectedFields) => {
    return (req, res, next) => {
        const missingFields = expectedFields.filter((field) => !(field in req.headers));

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing fields: ${missingFields.join(', ')}`,
            });
        }

        next();
    };
};

/* POST create user. */
router.post(
    '/create-user',
    [validateRequestBody(['username', 'password']), body('username').isString(), body('password').isString()],
    userAuthenticationController.createUser
);

/* POST login user. */
router.post(
    '/login-user',
    [validateRequestBody(['username', 'password']), body('username').isString(), body('password').isString()],
    userAuthenticationController.loginUser
);

/* DELETE delete user. */
router.delete('/delete-user', [validateRequestBody(['id']), body('id').isInt()], userAuthenticationController.deleteUser);

/* PATCH change username. */
router.patch(
    '/change-username',
    [
        validateRequestBody(['new_username']),
        validateRequestHeaders(['authorization']),
        body('new_username').isString(),
        header('authorization').isString(),
    ],
    userAuthenticationController.changeUsername
);

/* PATCH change user info. */
router.patch(
    '/change-user-info',
    [validateRequestBody(['new_fields']), validateRequestHeaders(['authorization']), header('authorization').isString()],
    userAuthenticationController.changeUserInfo
);

/* GET get users. */
router.get('/get-users', [validateRequestBody(['fields']), body('fields').isObject()], userAuthenticationController.getUsers);

/* GET get user info. */
router.get('/get-user-info', [validateRequestBody(['id']), body('id').isInt()], userAuthenticationController.getUserInfo);

module.exports = router;
