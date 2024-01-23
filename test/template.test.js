require('dotenv').config();
const app = require('../src/app');
const request = require("supertest");
const db = require('../src/services/db.service');

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

    beforeAll(async () => {
        await db.destroyConnection();
        await db.getConnection();
        await db.query(`DELETE FROM People WHERE name = ?`, [testUser.name]);
    });

    afterAll(async () => {
        await db.closeConnection();
    });

    it('OK, creating person works', async () => {
        const res = await request(app).post('/template/create-person')
            .send({ name: testUser.name, favoriteColor: testUser.favoriteColor });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Person successfully created');
    })
    it('OK, updating person works', async () => {
        const newColor = 'newColor';
        const res = await request(app).patch('/template/update-person')
            .send({ name: testUser.name, favoriteColor: newColor });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Person successfully updated');
        testUser.favoriteColor = newColor;
    })
    it('OK, getting people works', async () => {
        const res = await request(app).get('/template/get-people');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('People successfully retrieved');
        expect(res.body.people.length).toBe(1);
    })
    it('OK, deleting person works', async () => {
        const res = await request(app).delete('/template/delete-person')
            .send({ name: testUser.name });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Person successfully deleted');
    })
});
