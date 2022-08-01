const {User} = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('generateAuthToken', () => {
    it('should generate a valid JWT token', () => {

        // config.get = jest.fn().mockReturnValue('config');
        jwt.sign = jest.fn().mockReturnValue({_id: 1, isAdmin: true});

        const user = new User({
            name: 'username', email: 'email', password: 'passowrd', isAdmin: true
        });
        
        const token = user.generateAuthToken();
        const payload = { _id: 1, isAdmin: true };
        expect(token).toMatchObject(payload);
    });
/* 
    it('should generate a valid JWT token - no jwt mocking', () => {

        const payload = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);

    }); */

});