import formatRating from '../../utils/formatRating';

describe('formatRating', () => {
    const star = '\u2605';
    test('correctly formats ratings with integer values', () => {
        expect(formatRating('3')).toBe(`3.0${star}`);
    });

    test('correctly formats ratings with real values', () => {
        expect(formatRating('3.1')).toBe(`3.1${star}`);
        expect(formatRating('3.23')).toBe(`3.2${star}`);
        expect(formatRating('3.25')).toBe(`3.3${star}`);
        expect(formatRating('3.74212')).toBe(`3.7${star}`);
        expect(formatRating('3.78212')).toBe(`3.8${star}`);
    });
});
