class BusinessError {
    constructor() {
        this.message = '';
        this.code = 500;
    }

    getResponse() {
        const properties = { status: this.code, body: {} };
        for (let key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== 'function' && key !== 'code') {
                properties.body[key] = this[key];
            }
        }
        return properties;
    }
}

class DatabaseError extends BusinessError {
    constructor(err) {
        super();
        this.message = 'Error querying the database';
        this.code = 500;
        this.error = err;
    }
}

class CreatePersonError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error creating person';
        this.code = 500;
    }
}

class PersonAlreadyExistsError extends BusinessError {
    constructor() {
        super();
        this.message = 'Person already exists';
        this.code = 403;
    }
}

class PersonDoesNotExistError extends BusinessError {
    constructor() {
        super();
        this.message = 'Person does not exist';
        this.code = 403;
    }
}

class UpdatePersonError extends BusinessError {
    constructor() {
        super();
        this.message = 'Error updating person';
        this.code = 500;
    }
}

module.exports = {
    BusinessError,
    DatabaseError,
    CreatePersonError,
    PersonAlreadyExistsError,
    PersonDoesNotExistError,
    UpdatePersonError,
};
