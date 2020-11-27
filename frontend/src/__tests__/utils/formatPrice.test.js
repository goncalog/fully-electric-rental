import formatPrice from '../../utils/formatPrice';

describe('formatPrice', () => {
    test('correctly formats prices below 1000', () => {
        expect(formatPrice('uk', '900')).toBe('£900');
    });

    test('correctly formats prices equal or larger than 1000', () => {
        expect(formatPrice('uk', '1000')).toBe('£1,000');
        expect(formatPrice('uk', '10000')).toBe('£10,000');
        expect(formatPrice('uk', '50000')).toBe('£50,000');
        expect(formatPrice('uk', '100000')).toBe('£100,000');
        expect(formatPrice('uk', '500000')).toBe('£500,000');
    });
});
