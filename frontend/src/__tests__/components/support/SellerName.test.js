import React from 'react';
import SellerName from '../../../components/support/SellerName';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('SellerName', () => {
    let props;
    let shallowSellerName;
    const sellerName = () => {
        if (!shallowSellerName) {
            shallowSellerName = shallow(<SellerName {...props} />);
        }
        return shallowSellerName;
    }

    // This reset the props and shallowSellerName variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowSellerName to undefined here, when the next test runs, 
    // if it calls sellerName, a new SellerName will be created with the current props
    beforeEach(() => {
        props = {
            name: 'Text to test seller name property',
        };
        shallowSellerName = undefined;
    });

    test('has one child', () => {
        expect(sellerName().children().length).toEqual(1);
    });
    
    test('has h5 HTML element with some text', () => {
        const shallowWrapper = sellerName().find('h5.seller-name');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.name);
    });    
});
