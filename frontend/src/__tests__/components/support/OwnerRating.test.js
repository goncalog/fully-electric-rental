import React from 'react';
import OwnerRating from '../../../components/support/OwnerRating';
import formatRating from '../../../utils/formatRating';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('OwnerRating', () => {
    let props;
    let shallowOwnerRating;
    const ownerRating = () => {
        if (!shallowOwnerRating) {
            shallowOwnerRating = shallow(<OwnerRating {...props} />);
        }
        return shallowOwnerRating;
    }

    // This reset the props and shallowOwnerRating variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowOwnerRating to undefined here, when the next test runs, 
    // if it calls ownerRating, a new OwnerRating will be created with the current props
    beforeEach(() => {
        props = {
            rating: '4.3276',
        };
        shallowOwnerRating = undefined;
    });

    test('has one child', () => {
        expect(ownerRating().children().length).toEqual(1);
    });
    
    test('has p HTML element with some text', () => {
        const shallowWrapper = ownerRating().find('p.owner-rating');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(formatRating(props.rating));
    });    
});
