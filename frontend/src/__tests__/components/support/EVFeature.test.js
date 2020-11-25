import React from 'react';
import EVFeature from '../../components/support_components/EVFeature';
import EVFeatureName from '../../components/support_components/EVFeatureName';
import EVFeatureValue from '../../components/support_components/EVFeatureValue';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('EVFeature', () => {
    let props;
    let shallowEVFeature;
    const evFeature = () => {
        if (!shallowEVFeature) {
            shallowEVFeature = shallow(<EVFeature {...props}/>)
        }
        return shallowEVFeature;
    }

    // This reset the props and shallowEVFeature variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowEVFeature to undefined here, when the next test runs, 
    // if it calls evFeature, a new EVFeature will be created with the current props
    beforeEach(() => {
        props = {
            name: "Text to test name property",
            value: "Text to test value property",
        };
        shallowEVFeature = undefined;
    });

    test('has 2 children', () => {
        expect(evFeature().children().length).toEqual(2);
    });
    
    test('has one EVFeatureName component rendered with some text passed as a property', () => {
        const shallowWrapper = evFeature().find(EVFeatureName);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('name')).toBe(props.name);
    });

    test('has one EVFeatureValue component rendered with some text passed as a property', () => {
        const shallowWrapper = evFeature().find(EVFeatureValue);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('value')).toBe(props.value);
    });
});
