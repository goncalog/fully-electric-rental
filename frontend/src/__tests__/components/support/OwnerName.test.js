import React from 'react';
import OwnerName from '../../../components/support/OwnerName';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('OwnerName', () => {
    let props;
    let shallowOwnerName;
    const ownerName = () => {
        if (!shallowOwnerName) {
            shallowOwnerName = shallow(<OwnerName {...props} />);
        }
        return shallowOwnerName;
    }

    // This reset the props and shallowOwnerName variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowOwnerName to undefined here, when the next test runs, 
    // if it calls ownerName, a new OwnerName will be created with the current props
    beforeEach(() => {
        props = {
            name: 'Text to test owner name property',
        };
        shallowOwnerName = undefined;
    });

    test('has one child', () => {
        expect(ownerName().children().length).toEqual(1);
    });
    
    test('has h5 HTML element with some text', () => {
        const shallowWrapper = ownerName().find('h5.owner-name');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.name);
    });    
});
