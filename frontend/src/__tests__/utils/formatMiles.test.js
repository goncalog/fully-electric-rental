import formatMiles from '../../utils/formatMiles';

describe('formatMiles', () => {
    it('returns miles in correct format', () => {
        expect(formatMiles(123)).toEqual('123mi');
        expect(formatMiles(0)).toEqual('0mi');
        expect(formatMiles(45)).toEqual('45mi');
        expect(formatMiles(6789)).toEqual('6,789mi');
        expect(formatMiles(100000)).toEqual('100,000mi');
        expect(formatMiles(123456)).toEqual('123,456mi');
        expect(formatMiles(1000000)).toEqual('1,000,000mi');
        expect(formatMiles(1234567)).toEqual('1,234,567mi');
    });
});
