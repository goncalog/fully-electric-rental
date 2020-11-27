import sortString from '../../utils/sortString';

describe('sortString', () => {
    const makes = [
        { _id: '123124134', name: 'Tesla' },
        { _id: '12312413', name: 'Nissan' },
        { _id: '12312414', name: 'Renault' },
        { _id: '12312434', name: 'Audi' },
        { _id: '12312134', name: 'Mercedes-Benz' },
        { _id: '12314134', name: 'BMW' },
    ];

    const makesSorted = [
        { _id: '12312434', name: 'Audi' },
        { _id: '12314134', name: 'BMW' },
        { _id: '12312134', name: 'Mercedes-Benz' },
        { _id: '12312413', name: 'Nissan' },
        { _id: '12312414', name: 'Renault' },
        { _id: '123124134', name: 'Tesla' },
    ];

    it('sorts ', () => {
        expect(sortString(makes, 'name')).toEqual(makesSorted);
    });
});
