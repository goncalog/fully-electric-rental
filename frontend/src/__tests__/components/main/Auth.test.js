import React from 'react';
import Auth from '../components/Auth';
import MainHeadline from '../components/support_components/MainHeadline';
import Input from '../components/support_components/Input';
import CallToActionButton from '../components/support_components/CallToActionButton';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Auth', () => {
    let shallowAuth;
    let props;
    const auth = () => {
        if (!shallowAuth) {
            shallowAuth = shallow(<Auth {...props} />);
        }
        return shallowAuth;
    }

    // This resets the shallowAuth variable before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowAuth to undefined here, when the next test runs, 
    // if it calls auth, a new Auth will be created.
    beforeEach(() => {
        props = {
            match: { 
                url: '/test/url',
            }
        };
        shallowAuth = undefined;
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

    test('has 5 children', () => {
        expect(auth().children().length).toEqual(5);
    });

    test('has one MainHeadline rendered with passed properties', () => {
        const shallowWrapper = auth().find(MainHeadline);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('mainHeadline');
    });

    test('has 4 Input components rendered with passed properties', () => {
        const shallowWrapper = auth().find(Input);
        expect(shallowWrapper.length).toEqual(4);
        shallowWrapper.forEach((node) => {
            expect(Object.keys(node.props())).toContain('className');
            expect(Object.keys(node.props())).toContain('property');
            expect(Object.keys(node.props())).toContain('placeholder');
            expect(Object.keys(node.props())).toContain('text');
            expect(Object.keys(node.props())).toContain('onTextChange');
        })
    });

    test('has one CallToActionButton rendered with passed properties', () => {
        const shallowWrapper = auth().find(CallToActionButton);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('callToActionText');
        expect(Object.keys(shallowWrapper.props())).toContain('onButtonClick');
    });    
});
