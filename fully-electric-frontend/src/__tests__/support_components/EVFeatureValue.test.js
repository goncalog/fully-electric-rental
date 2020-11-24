import React from 'react';
import EVFeatureValue from '../../components/support_components/EVFeatureValue';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('EVFeatureValue', () => {
    let props;
    let shallowEVFeatureValue;
    const evFeatureValue = () => {
        if (!shallowEVFeatureValue) {
            shallowEVFeatureValue = shallow(<EVFeatureValue {...props} />);
        }
        return shallowEVFeatureValue;
    }

    // This reset the props and shallowEVFeatureValue variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowEVFeatureValue to undefined here, when the next test runs, 
    // if it calls evFeatureValue, a new EVFeatureValue will be created with the current props
    beforeEach(() => {
        props = {
            value: 'Text to test value property',
        }
        shallowEVFeatureValue = undefined;
    });

    test('has one child', () => {
        expect(evFeatureValue().children().length).toEqual(1);
    });

    test('has one p HTML element with some text passed as a property', () => {
        const shallowWrapper = evFeatureValue().find('p.feature-value.small');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.value);
    });
});
