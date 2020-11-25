import React from 'react';
import Headline from '../../../components/support/Headline';
import CallToActionButton from '../../../components/support/CallToActionButton';
import SellerContainer from '../../../components/support/SellerContainer';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('SellerContainer', () => {
    let props;
    let shallowSellerContainer;
    const mockFunction = jest.fn();
    const sellerContainer = () => {
        if (!shallowSellerContainer) {
            shallowSellerContainer = shallow(<SellerContainer {...props} />);
        }
        return shallowSellerContainer;
    }

    // This reset the props and shallowSellerContainer variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowSellerContainer to undefined here, when the next test runs, 
    // if it calls sellerContainer, a new SellerContainer will be created with the current props
    beforeEach(() =>  {
        props = {
            backgroundImagePath: '/file/path/to/seller/background/image',
            mainHeadline: 'Text to test mainHeadline property',
            secondaryHeadline: 'Text to test secondaryHeadline property',
            callToActionText: 'Text to test callToActionText property',
            onButtonClick: mockFunction,
        }
        shallowSellerContainer = undefined;
    });

    test('has 2 children', () => {
        expect(sellerContainer().children().length).toEqual(2);
    });

    test('has background image with source passed as property', () => {
        expect(sellerContainer().prop('style').backgroundImage).toBe(`url(${props.backgroundImagePath})`);
    });

    test('has one Headline component rendered with passed properties', () => {
        const shallowWrapper = sellerContainer().find(Headline);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('mainHeadline')).toBe(props.mainHeadline);
        expect(shallowWrapper.prop('secondaryHeadline')).toBe(props.secondaryHeadline);
    });

    test('has one CallToActionButton component rendered with passed property', () => {
        const shallowWrapper = sellerContainer().find(CallToActionButton);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('callToActionText')).toBe(props.callToActionText);
        expect(shallowWrapper.prop('onButtonClick')).toBe(props.onButtonClick);
    });
});
