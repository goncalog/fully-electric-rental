import React from 'react';
import Contact from '../../../components/main/Contact';
import ContactForm from '../../../components/support/ContactForm';
import CallToActionButton from '../../../components/support/CallToActionButton';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Contact', () => {
    let shallowContact;
    const contact = () => {
        if (!shallowContact) {
            shallowContact = shallow(<Contact />);
        }
        return shallowContact;
    }

    // This resets the shallowContact variable before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowContact to undefined here, when the next test runs, 
    // if it calls contact, a new Contact will be created.
    beforeEach(() => {
        shallowContact = undefined;
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
        expect(contact().children().length).toEqual(2);
    });

    test('has one CallToActionButton rendered with passed properties', () => {
        const shallowWrapper = contact().find(CallToActionButton);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('callToActionText')).toBe('Send Message');
        expect(Object.keys(shallowWrapper.props())).toContain('onButtonClick');
    });

    test('has one ContactForm rendered with passed properties', () => {
        const shallowWrapper = contact().find(ContactForm);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('legend')).toBe('Send your message:');
        expect(Object.keys(shallowWrapper.props())).toContain('emailText');
        expect(Object.keys(shallowWrapper.props())).toContain('messageText');
        expect(Object.keys(shallowWrapper.props())).toContain('onEmailTextChange');
        expect(Object.keys(shallowWrapper.props())).toContain('onMessageTextChange');
    });
});
