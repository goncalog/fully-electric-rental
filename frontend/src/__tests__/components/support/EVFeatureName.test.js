import React from 'react';
import EVFeatureName from '../../../components/support/EVFeatureName';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('EVFeatureName', () => {
    let props;
    let shallowEVFeatureName;
    const evFeatureName = () => {
        if (!shallowEVFeatureName) {
            shallowEVFeatureName = shallow(<EVFeatureName {...props} />);
        }
        return shallowEVFeatureName;
    }

    // This reset the props and shallowEVFeatureName variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowEVFeatureName to undefined here, when the next test runs, 
    // if it calls evFeatureName, a new EVFeatureName will be created with the current props
    beforeEach(() => {
        props = {
            name: 'Text to test name property',
        }
        shallowEVFeatureName = undefined;
    });

    test('has one child', () => {
        expect(evFeatureName().children().length).toEqual(1);
    });

    test('has one p HTML element with some text passed as a property', () => {
        const shallowWrapper = evFeatureName().find('p.feature-name');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.name);
    });
});
