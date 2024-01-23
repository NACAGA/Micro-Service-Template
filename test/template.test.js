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
    it('OK, creating person works', async () => {
        const res = await request(app).post('/template/create-person')
            .send({ name: 'testName', favoriteColor: 'testColor' });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Person successfully created');
    })
    it('OK, deleting person works', async () => {
        const res = await request(app).delete('/template/delete-person')
            .send({ name: 'testName' });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Person successfully deleted');
    })
});
