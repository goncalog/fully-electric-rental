import getEvFeaturesArray from '../../utils/getEvFeaturesArray';

describe('getEvFeatures', () => {
    it('returns the right array', () => {
        expect(getEvFeaturesArray(['Air conditioning', 'Brake assistance', 'Traction control', 'Speed control']))
                .toEqual([{ name: 'Air conditioning' },
                          { name: 'Brake assistance' },
                          { name: 'Traction control' },
                          { name: 'Speed control' } ]);

        expect(getEvFeaturesArray(['Brake assistance', 'Speed control']))
                .toEqual([{ name: 'Brake assistance' },
                          { name: 'Speed control' } ]);

        expect(getEvFeaturesArray(['Speed control'])).toEqual([{ name: 'Speed control' } ]);
    });
});
