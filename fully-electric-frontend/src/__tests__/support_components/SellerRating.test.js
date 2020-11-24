import React from 'react';
import SellerRating from '../../components/support_components/SellerRating';
import formatRating from '../../utils/formatRating';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('SellerRating', () => {
    let props;
    let shallowSellerRating;
    const sellerRating = () => {
        if (!shallowSellerRating) {
            shallowSellerRating = shallow(<SellerRating {...props} />);
        }
        return shallowSellerRating;
    }

    // This reset the props and shallowSellerRating variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowSellerRating to undefined here, when the next test runs, 
    // if it calls sellerRating, a new SellerRating will be created with the current props
    beforeEach(() => {
        props = {
            rating: '4.3276',
        };
        shallowSellerRating = undefined;
    });

    test('has one child', () => {
        expect(sellerRating().children().length).toEqual(1);
    });
    
    test('has p HTML element with some text', () => {
        const shallowWrapper = sellerRating().find('p.seller-rating');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(formatRating(props.rating));
    });    
});
