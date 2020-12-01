import React from 'react';
import OwnerEVs from '../../../components/main/OwnerEVs';
import MainHeadline from '../../../components/support/MainHeadline';
import CallToActionButton from '../../../components/support/CallToActionButton';
import EVs from '../../../components/main/EVs';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('OwnerEVs', () => {
    let shallowOwnerEVs;
    let props;
    const ownerEVs = () => {
        if (!shallowOwnerEVs) {
            shallowOwnerEVs = shallow(<OwnerEVs {...props}/>);
        }
        return shallowOwnerEVs;
    }

    // This resets the props and the shallowOwnerEVs variable before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowOwnerEVs to undefined here, when the next test runs, 
    // if it calls ownerEVs, a new OwnerEV will be created.
    beforeEach(() => {
        props = {
            match: {
                url: 'current/url',
            }
        }
        shallowOwnerEVs = undefined;
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
        expect(ownerEVs().children().length).toEqual(3);
    });

    test('has one MainHeadline rendered with passed properties', () => {
        const shallowWrapper = ownerEVs().find(MainHeadline);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('mainHeadline');
    });

    test('has one CallToActionButton rendered with passed properties', () => {
        const shallowWrapper = ownerEVs().find(CallToActionButton);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('callToActionText');
        expect(Object.keys(shallowWrapper.props())).toContain('onButtonClick');
    });

    test('has one EVs component rendered with passed property', () => {
        const shallowWrapper = ownerEVs().find(EVs);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('fetchUrl');
    });    
});
