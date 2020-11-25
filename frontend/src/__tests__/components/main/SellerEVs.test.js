import React from 'react';
import SellerEVs from '../components/SellerEVs';
import MainHeadline from '../components/support_components/MainHeadline';
import CallToActionButton from '../components/support_components/CallToActionButton';
import EVs from '../components/EVs';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('SellerEVs', () => {
    let shallowSellerEVs;
    let props;
    const sellerEVs = () => {
        if (!shallowSellerEVs) {
            shallowSellerEVs = shallow(<SellerEVs {...props}/>);
        }
        return shallowSellerEVs;
    }

    // This resets the props and the shallowSellerEVs variable before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowSellerEVs to undefined here, when the next test runs, 
    // if it calls sellerEVs, a new SellerEV will be created.
    beforeEach(() => {
        props = {
            match: {
                url: 'current/url',
            }
        }
        shallowSellerEVs = undefined;
    });

    // The default test environment for Jest is a browser-like environment provided by jsdom,
    // which implements most of what an actual browser would provide, but it doesn't implement everything.
    // Specifically, jsdom doesn't implement window.scrollTo, and instead throws an Error.
    const jsdomScrollTo = window.scrollTo;  // remember the jsdom scrollTo
    beforeAll(() => {
        window.scrollTo = jest.fn(); // provide a mock implementation for window.scrollTo
    });

    afterAll(() => {
        window.scrollTo = jsdomScrollTo; // restore the jsdom scrollTo
    });

    test('has 3 children', () => {
        expect(sellerEVs().children().length).toEqual(3);
    });

    test('has one MainHeadline rendered with passed properties', () => {
        const shallowWrapper = sellerEVs().find(MainHeadline);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('mainHeadline');
    });

    test('has one CallToActionButton rendered with passed properties', () => {
        const shallowWrapper = sellerEVs().find(CallToActionButton);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('callToActionText');
        expect(Object.keys(shallowWrapper.props())).toContain('onButtonClick');
    });

    test('has one EVs component rendered with passed property', () => {
        const shallowWrapper = sellerEVs().find(EVs);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('fetchUrl');
    });    
});
