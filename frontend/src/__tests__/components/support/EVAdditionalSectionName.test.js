import React from 'react';
import EVAdditionalSectionName from '../../components/support_components/EVAdditionalSectionName';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('EVAdditionalSectionName', () => {
    let props;
    let shallowEVAdditionalSectionName;
    const evAdditionalSectionName = () => {
        if (!shallowEVAdditionalSectionName) {
            shallowEVAdditionalSectionName = shallow(<EVAdditionalSectionName {...props} />);
        }
        return shallowEVAdditionalSectionName;
    }

    // This reset the props and shallowEVAdditionalSectionName variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowEVAdditionalSectionName to undefined here, when the next test runs, 
    // if it calls evAdditionalSectionName, a new EVAdditionalSectionName will be created with the current props
    beforeEach(() => {
        props = {
            name: 'Text to test name property',
        }
        shallowEVAdditionalSectionName = undefined;
    });

    test('has one child', () => {
        expect(evAdditionalSectionName().children().length).toEqual(1);
    });

    test('has one h5 HTML element with some text passed as a property', () => {
        const shallowWrapper = evAdditionalSectionName().find('h5.section-name');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.name);
    });
});
