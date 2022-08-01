const request = require('supertest');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const mongoose = require('mongoose');

let server;

describe('/genre', () => {

    beforeEach(
        () => {
            server = require('../../index');

        }
    );

    afterEach(
        async () => {
            await server.close(); 
            Genre.remove({});   
        }
    );

    describe('POST /', () => {

        let token;
        let name;

        const exec = async () => {
            const res = await request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({name: name});

            return res;
        };

        beforeEach(
            () => {
                token = new User().generateAuthToken();
                name = 'genre1';
            }

        );

        it("should return 400 if request is not valid", async () => {

            name = 'a';
    
            const res = await exec();
            expect(res.status).toBe(400);
    
        });

        it("should return 400 if genre is more than 50 characters", async () => {

            name = new Array(52).join('a');
    
            const res = await exec();
            expect(res.status).toBe(400);
    
        });        
    
        it("should save genre if request is valid", async() => {

            const res = await exec();

            const genre = await Genre.find({name: 'genre1'});
            expect(genre).not.toBeNull();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');

        });
    
        it("should return 401 if request is authorized", async () => {

            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        })
    });

    describe('/put',  () => {

        let gengre;
        let newGengre;
        let id;

        const exec = () => {
            return request(server)
                .put('/api/genres/' + id)
                .set('x-auth-token', token)
                .send(newGengre);
        }

        beforeEach(
            async () => {
                gengre = new Genre({name: 'genre1'});
                token = new User().generateAuthToken();
                await gengre.save();
                id = gengre._id.toHexString();
                newGengre = {name: 'newGengre'};
            }

        );

        it('should return 400 if request body has invalid attributes', async () => {
            newGengre = {invalid: true};
            const res = await exec();
            expect(res.status).toBe(400);
        })

        it('should return 400 if genre name is too short', async () => {
            newGengre = {name: 'a'};
            const res = await exec();
            expect(res.status).toBe(400);
        })

        it('should return 400 if genre name is too long', async () => {
            const newName = new Array(52).join('a');
            newGengre = {name: newName};
            const res = await exec();
            expect(res.status).toBe(400);
        })

        it('should return 404 if genre is not found', async () => {
            id = mongoose.Types.ObjectId().toHexString();
            const res = await exec();
            expect(res.status).toBe(404);
        })

        it('should update genre if input is valid', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', newGengre.name);
        })
    });

    describe('/delete',  () => {

        let gengre;
        let id;
        let token;

        const exec = () => {
            return request(server)
                .delete('/api/genres/' + id)
                .set('x-auth-token', token)
                .send();
        }

        beforeEach(
            async () => {
                gengre = new Genre({name: 'genre1'});
                token = new User({name: 'user1', isAdmin: true}).generateAuthToken();
                await gengre.save();
                id = gengre._id.toHexString();
            }

        );

        it('should return 401 if user is not logged in', async () => {
            token = "";
            const res = await exec();
            expect(res.status).toBe(401);
        })

        it('should return 403 if user is not admin', async () => {
            token = new User({name: 'user1', isAdmin: false}).generateAuthToken();
            const res = await exec();
            expect(res.status).toBe(403);
        })

        it('should return 404 if genre is not found', async () => {
            id = mongoose.Types.ObjectId().toHexString();
            const res = await exec();
            expect(res.status).toBe(404);
        })

        it('should delete genre if input is valid', async () => {
            const res = await exec();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', id);
            expect(res.body).toHaveProperty('name', gengre.name);

            const genreInDb = await Genre.findById(id);
            expect(genreInDb).toBeNull();
        })
    });    

});
