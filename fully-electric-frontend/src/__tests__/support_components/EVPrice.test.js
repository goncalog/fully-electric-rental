import React from 'react';
import EVPrice from '../../components/support_components/EVPrice';
import formatPrice from '../../utils/formatPrice';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('EVPrice', () => {
    let props;
    let shallowEVPrice;
    const evPrice = () => {
        if (!shallowEVPrice) {
            shallowEVPrice = shallow(<EVPrice {...props} />);
        }
        return shallowEVPrice;
    }

    // This reset the props and shallowEVPrice variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowEVPrice to undefined here, when the next test runs, 
    // if it calls evPrice, a new EVPrice will be created with the current props
    beforeEach(() => {
        props = {
            price: '4900',
        }
        shallowEVPrice = undefined;
    });

    test('has one child', () => {
        expect(evPrice().children().length).toEqual(1);
    });

    test('has one p HTML element with some text passed as a property', () => {
        const shallowWrapper = evPrice().find('p.price');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(formatPrice('uk', props.price));
    });
});
