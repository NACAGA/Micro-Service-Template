const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');
const { status } = require('../configs/general.config');

class CreatePersonSuccess extends Success {
    constructor(person) {
        super();
        this.code = 201;
        this.message = 'Person successfully created';
        this.person = person;
    }
}

async function createPerson(person) {
    const personExistsResult = await db.query(`SELECT * FROM People WHERE name = ?`, [person.name]);
    if (personExistsResult instanceof Error.DatabaseError) return personExistsResult;
    if (personExistsResult.result.length > 0) return new Error.PersonAlreadyExistsError();

    const createPersonResult = await db.query(`INSERT INTO People (name, favoritecolor) VALUES (?, ?)`, [
        person.name,
        person.favoriteColor,
    ]);
    if (createPersonResult instanceof Error.DatabaseError) return createPersonResult;
    if (createPersonResult.result.affectedRows > 0) return new CreatePersonSuccess(person);

    return new Error.CreatePersonError();
}

module.exports = {
    createPerson,
    CreatePersonSuccess,
};