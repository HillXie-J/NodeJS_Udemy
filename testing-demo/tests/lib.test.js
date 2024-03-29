const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {

    it('should return a positive number if input is positive', () => {

        const result = lib.absolute(1);
        expect(result).toBe(1);

    });

    it('should return a positive number if input is negative', () => {

        const result = lib.absolute(-1);
        expect(result).toBe(1);

    });

    it('should return zero if input is zero', () => {

        const result = lib.absolute(0);
        expect(result).toBe(0);

    });


});

describe('greet', () => {
    it('should return the greeting message', () => {
        result = lib.greet('Mosh');
        expect(result).toMatch(/Mosh/);
        expect(result).toContain('Mosh');
    });
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();
        /*         expect(result).toContain('USD');
                expect(result).toContain('AUD');
                expect(result).toContain('EUR'); */

        expect(result).toEqual(expect.arrayContaining(['EUR', 'AUD', 'USD']));
    });
});

describe('getProduct', () => {
    it('should return product', () => {
        const result = lib.getProduct(1);
        // expect(result).toEqual({id: 1, price: 10});
        expect(result).toMatchObject({ id: 1, price: 10 });
        expect(result).toHaveProperty('id', 1);
    });
});

describe('registerUser', () => {
    it('should throw exception if username is blank', () => {

        const args = [null, undefined, NaN, '', 0, false];

        args.forEach( a => {
            expect(() => {lib.registerUser(a)}).toThrow();
        });
        

    });

    it('should return user object if username is not blank', () => {
        const result = lib.registerUser("username");
        expect(result).toHaveProperty('username', 'username');
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
        
        db.getCustomerSync = function(customerId) {
            console.log('Fake reading customer...');
            return {id: customerId, points: 20};
        }
        
        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {



        db.getCustomerSync = function(customerId) {
            return {email: 'a' };
        }

        let mailSent = false;
        mail.send = function(email, message) {
            mailSent = true;
        }

        lib.notifyCustomer({customerId: 1});

        expect(mailSent).toBe(true);
    });

    it('should send an email to the customer - Mock Function', () => {

        db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'});
        mail.send = jest.fn();

        lib.notifyCustomer({customerId: 1});

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    })
});

