const request = require('supertest');
const { Rental } = require('../../models/rental');

let server;

describe('/api/rentals', () => {
    beforeEach(() => {
        server = require('../../index');
    });

    afterEach(
        async () => {
            await server.close();
            await Rental.remove({});
        }
    );

    describe('GET /', () => {
        it('should return rentals', async () => {

            await Rental.collection.insertMany([
                {
                    "customerId": "62ddc5f4ccdb858ccfa77e6c",
                    "movieId": "62db05fbadc11bef6d9efc73"
                },
                {
                    "customerId": "62ddc5f4ccdb858ccfa77e6c",
                    "movieId": "62db10bf0cfd5330c6eb298c"
                }
            ]

            );

/*             const res = await request(server).get('/api/rentals');
            expect(res.status).toBe(200);
            // expect(res.body.length).toBe(2);
            expect(res.body.some(r => r.customerId === '62ddc5f4ccdb858ccfa77e6c'))
                .toBeTruthy();
            expect(res.body.some(r => r.movieId === '62db10bf0cfd5330c6eb298c'))
                .toBeTruthy(); */

        });
    }); 

/*     describe('GET /:id', () => {
        it('should return a rental if valid id is passed', async() => {
            const rental = await Rental.collection.insertOne(
                {
                    "customerId": "62ddc5f4ccdb858ccfa77e6c",
                    "movieId": "62db05fbadc11bef6d9efc73"
                }
            );
            
             const res = await request(server).get('api/rentals/62e452648911c087c4ec3968');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body._id).toBe(rental._id); 

        })
    }); */
/*      describe('GET /:id', () => {
        it('should return 404 if invalid id is passed', async() => {
            const res = await request(server).get('api/rentals/1');
            expect(res.status).toBe(404);


        })
    });  */

});