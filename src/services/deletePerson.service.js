const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');

class DeletePersonSuccess extends Success {
    constructor(name) {
        super();
        this.code = 200;
        this.message = 'Person successfully deleted';
        this.name = name;
    }
}

async function deletePerson(person) {
    const personExistsResult = await db.query(`SELECT * FROM People WHERE name = ?`, [person.name]);
    if (personExistsResult instanceof Error.DatabaseError) return personExistsResult;
    if (personExistsResult.result.length === 0) return new Error.PersonDoesNotExistError();

    const deletePersonResult = await db.query(`DELETE FROM People WHERE name = ?`, [person.name]);
    if (deletePersonResult instanceof Error.DatabaseError) return deletePersonResult;
    if (deletePersonResult.result.affectedRows > 0) return new DeletePersonSuccess(person.name);

    return new Error.DeletePersonError();
}

module.exports = {
    deletePerson,
    DeletePersonSuccess,
};