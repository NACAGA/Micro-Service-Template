const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');

class UpdatePersonSuccess extends Success {
    constructor(person) {
        super();
        this.code = 200;
        this.message = 'Person successfully updated';
        this.person = person;
    }
}

async function updatePerson(person) {
    const personExistsResult = await db.query(`SELECT * FROM People WHERE name = ?`, [person.name]);
    if (personExistsResult instanceof Error.DatabaseError) return personExistsResult;
    if (personExistsResult.result.length === 0) return new Error.PersonDoesNotExistError();

    const updatePersonResult = await db.query(`UPDATE People SET favoritecolor = ? WHERE name = ?`, [
        person.favoriteColor,
        person.name,
    ]);
    if (updatePersonResult instanceof Error.DatabaseError) return updatePersonResult;
    if (updatePersonResult.result.affectedRows > 0) return new UpdatePersonSuccess(person);

    return new Error.UpdatePersonError();
}

module.exports = {
    updatePerson,
    UpdatePersonSuccess,
};