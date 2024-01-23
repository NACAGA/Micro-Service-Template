const db = require('./db.service');
const Error = require('./domain/buisnessErrror.domain');
const Success = require('./domain/success.domain');

class GetPeopleSuccess extends Success {
    constructor(people) {
        super();
        this.code = 200;
        this.message = 'People successfully retrieved';
        this.people = people;
    }
}

async function getPeople() {
    const getPeopleResult = await db.query(`SELECT * FROM People`);
    if (getPeopleResult instanceof Error.DatabaseError) return getPeopleResult;
    return new GetPeopleSuccess(getPeopleResult.result);
}

module.exports = {
    getPeople,
    GetPeopleSuccess,
};