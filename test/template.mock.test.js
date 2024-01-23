require('dotenv').config();
const app = require('../src/app');
const request = require("supertest");
const db = require('../src/services/db.service');

function createDBJestFn() {
    let val = jest.fn();
    val.mockDbReturn = (val) => mockExecute.mockReturnValueOnce([val]);
    return val;
}
let mockExecute, mockEnd, mockDbConnection;

describe('GET /', () => {
    it('OK, getting root works', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('ok');
    })
});


describe('router template', () => {
    const testUser = {
        name: 'testUser',
        favoriteColor: 'testColor',
    };

    // ! change to beforeEach if you don't want calls to accumulate
    beforeEach(async () => {
        // make a mock db execute function
        mockExecute = createDBJestFn();
        mockEnd = jest.fn(); // doesn't need to do anything

        mockDbConnection = {
            execute: mockExecute,
            end: mockEnd
        };

        await db.setConnection(mockDbConnection);
    });

    it('OK, creating person works', async () => {
        mockExecute.mockDbReturn([]).mockDbReturn({ affectedRows: 1 });
        const res = await request(app).post('/template/create-person')
            .send({ name: testUser.name, favoriteColor: testUser.favoriteColor });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Person successfully created');
        expect(mockExecute).toHaveBeenCalled();
        expect(mockExecute).toHaveBeenCalledWith("SELECT * FROM People WHERE name = ?", [testUser.name]);
        expect(mockExecute).toHaveBeenCalledWith("INSERT INTO People (name, favoritecolor) VALUES (?, ?)", [testUser.name, testUser.favoriteColor]);
    });

    it('OK, updating person works', async () => {
        const newColor = 'newColor';
        mockExecute.mockDbReturn([{ name: testUser.name, favoritecolor: testUser.favoriteColor }]).mockDbReturn({ affectedRows: 1 });
        const res = await request(app).patch('/template/update-person')
            .send({ name: testUser.name, favoriteColor: newColor });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Person successfully updated');
        expect(mockExecute).toHaveBeenCalled();
        expect(mockExecute).toHaveBeenCalledWith("SELECT * FROM People WHERE name = ?", [testUser.name]);
        expect(mockExecute).toHaveBeenCalledWith("UPDATE People SET favoritecolor = ? WHERE name = ?", [newColor, testUser.name]);
    });

    it('OK, getting people works', async () => {
        mockExecute.mockDbReturn([{ name: testUser.name, favoritecolor: testUser.favoriteColor }]);
        const res = await request(app).get('/template/get-people');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('People successfully retrieved');
        expect(res.body.people.length).toBe(1);
        expect(mockExecute).toHaveBeenCalled();
        // expect(mockExecute).toHaveBeenCalledWith("SELECT * FROM People");
    });

    it('OK, deleting person works', async () => {
        mockExecute.mockDbReturn([{ name: testUser.name, favoritecolor: testUser.favoriteColor }]).mockDbReturn({ affectedRows: 1 });
        const res = await request(app).delete('/template/delete-person')
            .send({ name: testUser.name });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Person successfully deleted');
        expect(mockExecute).toHaveBeenCalled();
        expect(mockExecute).toHaveBeenCalledWith("SELECT * FROM People WHERE name = ?", [testUser.name]);
        expect(mockExecute).toHaveBeenCalledWith("DELETE FROM People WHERE name = ?", [testUser.name]);
    });
});