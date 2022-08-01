const {User} = require('../../models/user');
const {Genre} = require('../../models/genre');
const request = require('supertest');

let server;
let token;

describe('auth middleware', () => {

    const exec = () => {
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({name: 'genre1'});
    }

    beforeEach(
        () => {
            server = require('../../index');
            token = new User().generateAuthToken();
        }
    );

    afterEach(
        async () => {
            server.close();    
            await Genre.remove({});
        }
    );

    it('should return 401 if no token is provided', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async () => {
        token = 'invalid';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });

    
});