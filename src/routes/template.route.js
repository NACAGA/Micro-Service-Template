const express = require('express');
const router = express.Router();
const { body, header } = require('express-validator');
const templateController = require('../controllers/template.controller');

router.post(
    '/create-person',
    [body('name').isString(), body('favoriteColor').isString()],
    templateController.createPerson
);

router.delete(
    '/delete-person',
    [header('name').isString()],
    templateController.deletePerson
);

router.patch(
    '/update-person',
    [body('name').isString(), body('favoriteColor').isString()],
    templateController.updatePerson
);

module.exports = router;
