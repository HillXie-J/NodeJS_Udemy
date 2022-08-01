const fizzBuzz = require('../exercise1');

describe('fizzBuzz', () => {
    it('should return error if input is not a number', ()=> {

        const args = [null, undefined, 'test', false];

        args.forEach( a => {
            expect(() => fizzBuzz(a)).toThrow();
        });

        
    });

    it('should return FizzBuzz if input is divisible by 3 and 5', () => {
        const result = fizzBuzz(30);
        expect(result).toBe('FizzBuzz');
    })

    it('should return Fizz if input is only divisible by 3', () => {
        const result = fizzBuzz(9);
        expect(result).toBe('Fizz');
    })

    it('should return Buzz if input is only divisible by 5', () => {
        const result = fizzBuzz(10);
        expect(result).toBe('Buzz');
    })

    it('should return input if input is not divisible by 3 or  5', () => {
        const result = fizzBuzz(17);
        expect(result).toBe(17);
    })

});