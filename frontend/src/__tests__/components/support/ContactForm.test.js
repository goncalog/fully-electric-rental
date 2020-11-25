import React from 'react';
import ContactForm from '../../components/support_components/ContactForm';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('ContactForm', () => {
    let props;
    let shallowContactForm;
    const mockFunctionEmail = jest.fn();
    const mockFunctionMessage = jest.fn();
    const contactForm = () => {
        if (!shallowContactForm) {
            shallowContactForm = shallow(<ContactForm {...props}/>);
        }
        return shallowContactForm;
    }

    // This resets the props and shallowContactForm variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowContactForm to undefined here, when the next test runs, 
    // if it calls contactForm, a new ContactForm will be created with the current props.
    beforeEach(() => {
        props = {
            legend: "Text to test legend property",
            emailText: "Text to test emailText property",
            messageText: "Text to test messageText property",
            onEmailTextChange: mockFunctionEmail,
            onMessageTextChange: mockFunctionMessage,
        }
        shallowContactForm = undefined;
    });

    test('has one child', () => {
        expect(contactForm().children().length).toEqual(1);
    });

    test('has one HTML legend element rendered with passed property', () => {
        const shallowWrapper = contactForm().find('legend');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.legend);
    });

    test('has one HTML input element for the email', () => {
        const shallowWrapper = contactForm().find('div.input input');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('name')).toBe('email');
        expect(shallowWrapper.prop('value')).toBe(props.emailText);
    });

    test('has one HTML textarea element for the message', () => {
        const shallowWrapper = contactForm().find('div.input textarea');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('name')).toBe('message');
        expect(shallowWrapper.prop('value')).toBe(props.messageText);
    });

    test('should call mockFunctionEmail onEmailTextChange', () => {
        const shallowWrapper = contactForm().find('div.input input');
        shallowWrapper.simulate('change', { target: { value: 'email' } }); // As noted in the function signature above passing a mock event is optional. It is worth noting that ReactWrapper will pass a SyntheticEvent object to the event handler in your code. Keep in mind that if the code you are testing uses properties that are not included in the SyntheticEvent, for instance event.target.value, you will need to provide a mock event like so .simulate("change", { target: { value: "foo" }}) for it to work.
        expect(mockFunctionEmail).toHaveBeenCalled();
    });

    test('should call mockFunctionMessage onMessageTextChange', () => {
        const shallowWrapper = contactForm().find('div.input textarea');
        shallowWrapper.simulate('change', { target: { value: 'message' } }); // As noted in the function signature above passing a mock event is optional. It is worth noting that ReactWrapper will pass a SyntheticEvent object to the event handler in your code. Keep in mind that if the code you are testing uses properties that are not included in the SyntheticEvent, for instance event.target.value, you will need to provide a mock event like so .simulate("change", { target: { value: "foo" }}) for it to work.
        expect(mockFunctionMessage).toHaveBeenCalled();
    });
});
