import React from 'react';
import CallToActionButton from '../../components/support_components/CallToActionButton';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('CallToActionButton', () => {
    let props;
    let shallowCallToActionButton;
    const mockFunction = jest.fn();
    const callToActionButton = () => {
        if (!shallowCallToActionButton) {
            shallowCallToActionButton = shallow(<CallToActionButton {...props} />);
        }
        return shallowCallToActionButton;
    }

    // This reset the props and shallowCallToActionButton variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowCallToActionButton to undefined here, when the next test runs, 
    // if it calls callToActionButton, a new CallToActionButton will be created with the current props
    beforeEach(() => {
        props = {
            callToActionText: 'Text to test callToActionText property',
            onButtonClick: mockFunction,
        };
        shallowCallToActionButton = undefined;
    });

    test('has one child', () => {
        expect(callToActionButton().children().length).toEqual(1);
    });

    test('has one HTML button with some text', () => {
        const shallowWrapper = callToActionButton().find('button.callToActionButton');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.callToActionText);
    });

    test('should call mockFunction on onButtonClick', () => {
        const shallowWrapper = callToActionButton().find('button.callToActionButton');
        shallowWrapper.props().onClick();
        expect(mockFunction).toHaveBeenCalled();
    });
});
