import React from 'react';
import Input from '../../../components/support/Input';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Input', () => {
    let props;
    let shallowInput;
    const mockFunction= jest.fn();
    const input = () => {
        if (!shallowInput) {
            shallowInput = shallow(<Input {...props}/>);
        }
        return shallowInput;
    }

    // This resets the props and shallowInput variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowInput to undefined here, when the next test runs, 
    // if it calls input, a new Input will be created with the current props.
    beforeEach(() => {
        props = {
            className: "Text to test className property",
            property: "Text to test property property",
            placeholder: "Text to test placeholder property",
            text: "Text to test text property",
            onTextChange: mockFunction,
        }
        shallowInput = undefined;
    });

    test('has one child with passed property', () => {
        expect(input().children().length).toEqual(1);
        expect(input().hasClass(props.className)).toBe(true);
    });

    test('has one HTML input element', () => {
        const shallowWrapper = input().find('input');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('placeholder')).toBe(props.placeholder);
        expect(shallowWrapper.prop('value')).toBe(props.text);
        expect(Object.keys(shallowWrapper.props())).toContain('type');
    });

    test('should call mockFunction onTextChange', () => {
        const shallowWrapper = input().find('input');
        shallowWrapper.simulate('change', { target: { value: 'test' } }); // As noted in the function signature above passing a mock event is optional. It is worth noting that ReactWrapper will pass a SyntheticEvent object to the event handler in your code. Keep in mind that if the code you are testing uses properties that are not included in the SyntheticEvent, for instance event.target.value, you will need to provide a mock event like so .simulate("change", { target: { value: "foo" }}) for it to work.
        expect(mockFunction).toHaveBeenCalled();
        expect(mockFunction).toHaveBeenCalledWith(props.property, 'test');
    });
});
