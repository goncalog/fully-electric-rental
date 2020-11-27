import formatPrice from '../../utils/formatPrice';

describe('formatPrice', () => {
    test('correctly formats prices', () => {
        expect(formatPrice('uk', '9.5')).toBe('£9.5/day');
        expect(formatPrice('uk', '90')).toBe('£90/day');
    });
});
