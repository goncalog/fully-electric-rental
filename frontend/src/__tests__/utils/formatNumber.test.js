import formatNumber from '../../utils/formatNumber';

describe('formatNumber', () => {
    it('returns number in correct format (1)', () => {
        expect(formatNumber(123)).toEqual('123');
        expect(formatNumber(0)).toEqual('0');
        expect(formatNumber(45)).toEqual('45');
        expect(formatNumber(6789)).toEqual('6,789');
        expect(formatNumber(100000)).toEqual('100,000');
        expect(formatNumber(123456)).toEqual('123,456');
        expect(formatNumber(1000000)).toEqual('1,000,000');
        expect(formatNumber(1234567)).toEqual('1,234,567');
    });

    it('returns number in correct format (2)', () => {
        expect(formatNumber('123')).toEqual('123');
        expect(formatNumber('0')).toEqual('0');
        expect(formatNumber('45')).toEqual('45');
        expect(formatNumber('6789')).toEqual('6,789');
        expect(formatNumber('100000')).toEqual('100,000');
        expect(formatNumber('123456')).toEqual('123,456');
        expect(formatNumber('1000000')).toEqual('1,000,000');
        expect(formatNumber('1234567')).toEqual('1,234,567');
    });
});
