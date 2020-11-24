import validateEmail from '../../utils/validateEmail';

describe('validateEmail', () => {
    it('accepts emails with correct format', () => {
        expect(validateEmail('xpto@gmail.com')).toBe(true);
        expect(validateEmail('xpto.xpto@proton.com')).toBe(true);
        expect(validateEmail('xpto.xpto.xtpo@hotmail.com')).toBe(true);
        expect(validateEmail('xpto@idaho.co')).toBe(true);
        expect(validateEmail('xpto@usd.co.uk')).toBe(true);
    });

    it('rejects emails with incorrect format', () => {
        expect(validateEmail('xpto@gmail')).toBe(false);
        expect(validateEmail('@proton.com')).toBe(false);
        expect(validateEmail('xpto.xpto.xtpohotmail.com')).toBe(false);
        expect(validateEmail('')).toBe(false);
        expect(validateEmail('xpto@usd.')).toBe(false);
    });
});
