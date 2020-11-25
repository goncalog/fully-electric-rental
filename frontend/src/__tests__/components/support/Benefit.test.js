import React from 'react';
import Benefit from '../../../components/support/Benefit';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Benefit', () => {
    let props;
    let shallowBenefit;
    const benefit = () => {
        if (!shallowBenefit) {
            shallowBenefit = shallow(<Benefit {...props} />);
        }
        return shallowBenefit;
    }

    // This reset the props and shallowBenefit variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowBenefit to undefined here, when the next test runs, 
    // if it calls benefit, a new Benefit will be created with the current props
    beforeEach(() => {
        props = {
            benefitTitle: 'Text to test benefitTitle property',
            benefitText: 'Text to test benefitText property',
        }
        shallowBenefit = undefined;
    });

    test('has two children', () => {
        expect(benefit().children().length).toEqual(2);
    });

    test('has one h5 HTML with some text', () => {
        const shallowWrapper = benefit().find('h5');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.benefitTitle);
    });

    test('has one p HTML with some text', () => {
        const shallowWrapper = benefit().find('p');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.benefitText);
    });
});
