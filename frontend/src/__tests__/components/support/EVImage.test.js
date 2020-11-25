import React from 'react';
import EVImage from '../../components/support_components/EVImage';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('EVImage', () => {
    let props;
    let shallowEVImage;
    const evImage = () => {
        if (!shallowEVImage) {
            shallowEVImage = shallow(<EVImage {...props} />);
        }
        return shallowEVImage;
    }

    // This reset the props and shallowEVImage variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowEVImage to undefined here, when the next test runs, 
    // if it calls evImage, a new EVImage will be created with the current props
    beforeEach(() => {
        props = {
            imagePath: '/path/to/ev/image',
        }
        shallowEVImage = undefined;
    });

    test('has one child', () => {
        expect(evImage().children().length).toEqual(1);
    });

    test('has one img HTML element with a source passed as a property', () => {
        const shallowWrapper = evImage().find('img.ev-image');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('src')).toBe(props.imagePath);
    });
});
