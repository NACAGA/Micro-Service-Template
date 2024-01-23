const createPersonService = require('../services/createPerson.service');

async function createPerson(req, res, next) {
    try {
        let response = await createPersonService.createPerson(req.body);
        response = response.getResponse();
        res.status(response.status).json(response.body);
    } catch (err) {
        console.error('Error while creating a new person:', err);
        next(err);
    }
}
module.exports = {
    createPerson
};
