const express = require('express');
const router = express.Router();
const { body, header } = require('express-validator');
const templateController = require('../controllers/template.controller');

router.post(
    '/create-person',
    [body('name').isString(), body('favoriteColor').isString()],
    templateController.createPerson
);

module.exports = router;
