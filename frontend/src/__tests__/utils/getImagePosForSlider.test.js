import getImagePosForSlider from '../../utils/getImagePosForSlider';

describe('getImagePosForSlider', () => {
    test('returns correct value when currentImage is >= 0', () => {
        expect(getImagePosForSlider(3, 0)).toBe(0);
        expect(getImagePosForSlider(3, 1)).toBe(1);
        expect(getImagePosForSlider(3, 2)).toBe(2);
        expect(getImagePosForSlider(3, 3)).toBe(0);
        expect(getImagePosForSlider(3, 4)).toBe(1);
        expect(getImagePosForSlider(3, 5)).toBe(2);
        expect(getImagePosForSlider(3, 6)).toBe(0);
        expect(getImagePosForSlider(4, 5)).toBe(1);
        expect(getImagePosForSlider(4, 6)).toBe(2);
        expect(getImagePosForSlider(4, 7)).toBe(3);
        expect(getImagePosForSlider(4, 8)).toBe(0);
    });

    test('returns correct value when currentImage is < 0', () => {
        expect(getImagePosForSlider(3, -1)).toBe(2);
        expect(getImagePosForSlider(3, -2)).toBe(1);
        expect(getImagePosForSlider(3, -3)).toBe(0);
        expect(getImagePosForSlider(3, -4)).toBe(2);
        expect(getImagePosForSlider(3, -5)).toBe(1);
        expect(getImagePosForSlider(3, -6)).toBe(0);
        expect(getImagePosForSlider(4, -5)).toBe(3);
        expect(getImagePosForSlider(4, -6)).toBe(2);
        expect(getImagePosForSlider(4, -7)).toBe(1);
        expect(getImagePosForSlider(4, -8)).toBe(0);
    });
});
