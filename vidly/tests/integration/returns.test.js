const request = require('supertest');
const { Rental } = require('../../models/rental');
const { User } = require('../../models/user');
const { Movie } = require('../../models/movie');
const mongoose = require('mongoose');
const moment = require('moment');

describe('/api/returns', () => {

    let server;
    let customerId;
    let movieId;
    let rental;
    let token;
    let payload;
    let movie;

    beforeEach(
        async () => {
            server = require('../../index');
            customerId = mongoose.Types.ObjectId();
            movieId = mongoose.Types.ObjectId();
            token = new User().generateAuthToken();


            movie = new Movie({
                title: '12345',
                dailyRentalRate: 2,
                genre: { name: '12345' },
                numberInStock: 10
            }

            );

            const result = await movie.save();
            movieId = result._id;

            payload = { customerId, movieId };

            rental = new Rental({
                customer: {
                    _id: customerId,
                    name: '12345',
                    phone: '12345'
                },
                movie: {
                    _id: movieId,
                    title: '12345',
                    dailyRentalRate: 2
                }
            });

            await rental.save();
        }
    );

    afterEach(
        async () => {
            await server.close();
            await Rental.remove({});
            await Movie.remove({});
        }
    );

    const exec = () => {
        return request(server)
            .put('/api/returns')
            .set('x-auth-token', token)
            .send(payload);
    }

    it('should return 401 if client is not logged in', async () => {
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if customerId is not provided', async () => {

        payload = { movieId };

        const res = await exec();
        expect(res.status).toBe(400);

    });


    it('should return 400 if movie is not provided', async () => {

        payload = { customerId };

        const res = await exec();
        expect(res.status).toBe(400);

    });

    it('should return 404 if no rental found for this customer/movie', async () => {

        payload = { customerId: mongoose.Types.ObjectId(), movieId: mongoose.Types.ObjectId() };

        const res = await exec();
        expect(res.status).toBe(404);
    });

    it('should return 400 if rental already processed', async () => {
        rental.dateReturned = new Date();
        await rental.save();

        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200 if request is valid', async () => {

        const res = await exec();
        expect(res.status).toBe(200);
    });

    it('should set the return date if request is valid', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
        // expect(res.body.dateReturned).toBeDefined();

        const rentalInDb = await Rental.findById(rental._id);
        const diff = new Date() - rentalInDb.dateReturned;
        expect(diff).toBeLessThan(10 * 1000);
    });

    it('should calculate rental fee if request is valid', async () => {
        /*         const res = await exec();
                expect(res.status).toBe(200);
                // expect(res.body.dateReturned).toBeDefined();
        
                const rentalInDb = await Rental.findById(rental._id);
                expect(rentalInDb.rentalFee)
                    .toBeCloseTo((rentalInDb.dateReturned - rentalInDb.dateOut) / 1000 / 60 / 60 / 24 * rentalInDb.movie.dailyRentalRate);
            
            
            */
        rental.dateOut = moment().add(-7, 'days').toDate();
        await rental.save();

        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);

        expect(rentalInDb.rentalFee).toBeCloseTo(14);

    });

    it('should increase the stock', async () => {

        const res = await exec();

        const movieInDb = await Movie.findById(movieId);
        console.log(movieInDb._id);
        expect(movieInDb.numberInStock).toBe(11);
        expect(res.status).toBe(200);
    });

    it('should return rental if request is valid', async () => {

        const res = await exec();
        const rentalInDb = await Rental.findById(rental._id);
        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(
                ['dateOut', 'dateReturned', 'rentalFee',
                'customer', 'movie']
            )
        );

    });
});