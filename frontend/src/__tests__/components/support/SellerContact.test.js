import React from 'react';
import SellerContact from '../../components/support_components/SellerContact';
import SellerName from '../../components/support_components/SellerName';
import SellerRating from '../../components/support_components/SellerRating';
import CallToActionButton from '../../components/support_components/CallToActionButton';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('SellerContact', () => {
    let props;
    let shallowSellerContact;
    const sellerContact = () => {
        if (!shallowSellerContact) {
            shallowSellerContact = shallow(<SellerContact {...props}/>)
        }
        return shallowSellerContact;
    }

    // This reset the props and shallowSellerContact variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowSellerContact to undefined here, when the next test runs, 
    // if it calls sellerContact, a new SellerContact will be created with the current props
    beforeEach(() => {
        props = {
            name: "Text to test name property",
            rating: "2.25212",
            callToActionText: "Text to test callToActionText property",
        };
        shallowSellerContact = undefined;
    });

    test('has 3 children', () => {
        expect(sellerContact().children().length).toEqual(3);
    });
    
    test('has one SellerName component rendered with a passed name property', () => {
        const shallowWrapper = sellerContact().find(SellerName);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('name')).toBe(props.name);
    });
    
    test('has one SellerRating component rendered with a passed name property', () => {
        const shallowWrapper = sellerContact().find(SellerRating);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('rating')).toBe(props.rating);
    });
    
    test('has one CallToActionButton component rendered with a passed callToActionText property', () => {
        const shallowWrapper = sellerContact().find(CallToActionButton);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('callToActionText')).toBe(props.callToActionText);
        expect(Object.keys(shallowWrapper.props())).toContain('onButtonClick');
    });
});
