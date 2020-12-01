import React from 'react';
import OwnerEV from '../../../components/main/OwnerEV';
import CallToActionButton from '../../../components/support/CallToActionButton';
import EV from '../../../components/main/EV';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('OwnerEV', () => {
    let shallowOwnerEV;
    let props;
    const ownerEV = () => {
        if (!shallowOwnerEV) {
            shallowOwnerEV = shallow(<OwnerEV {...props}/>);
        }
        return shallowOwnerEV;
    }

    // This resets the props and the shallowOwnerEV variable before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowOwnerEV to undefined here, when the next test runs, 
    // if it calls ownerEV, a new OwnerEV will be created.
    beforeEach(() => {
        props = {
            match: {
                url: 'current/url',
            }
        }
        shallowOwnerEV = undefined;
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

    test('has 2 children', () => {
        expect(ownerEV().children().length).toEqual(2);
    });

    test('has 2 CallToActionButton rendered with passed properties', () => {
        const shallowWrapper = ownerEV().find(CallToActionButton);
        expect(shallowWrapper.length).toEqual(2);
        shallowWrapper.forEach((node) => {
            expect(Object.keys(node.props())).toContain('callToActionText');
            expect(Object.keys(node.props())).toContain('onButtonClick');
        });
        
    });

    test('has one EV component rendered with passed property', () => {
        const shallowWrapper = ownerEV().find(EV);
        expect(shallowWrapper.length).toEqual(1);
    });    
});
