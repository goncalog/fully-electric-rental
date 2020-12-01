import React from 'react';
import OwnerContact from '../../../components/support/OwnerContact';
import OwnerName from '../../../components/support/OwnerName';
import OwnerRating from '../../../components/support/OwnerRating';
import CallToActionButton from '../../../components/support/CallToActionButton';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('OwnerContact', () => {
    let props;
    let shallowOwnerContact;
    const ownerContact = () => {
        if (!shallowOwnerContact) {
            shallowOwnerContact = shallow(<OwnerContact {...props}/>)
        }
        return shallowOwnerContact;
    }

    // This reset the props and shallowOwnerContact variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowOwnerContact to undefined here, when the next test runs, 
    // if it calls ownerContact, a new OwnerContact will be created with the current props
    beforeEach(() => {
        props = {
            name: "Text to test name property",
            rating: "2.25212",
            callToActionText: "Text to test callToActionText property",
        };
        shallowOwnerContact = undefined;
    });

    test('has 3 children', () => {
        expect(ownerContact().children().length).toEqual(3);
    });
    
    test('has one OwnerName component rendered with a passed name property', () => {
        const shallowWrapper = ownerContact().find(OwnerName);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('name')).toBe(props.name);
    });
    
    test('has one OwnerRating component rendered with a passed name property', () => {
        const shallowWrapper = ownerContact().find(OwnerRating);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('rating')).toBe(props.rating);
    });
    
    test('has one CallToActionButton component rendered with a passed callToActionText property', () => {
        const shallowWrapper = ownerContact().find(CallToActionButton);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('callToActionText')).toBe(props.callToActionText);
        expect(Object.keys(shallowWrapper.props())).toContain('onButtonClick');
    });
});
