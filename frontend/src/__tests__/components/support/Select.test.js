import React from 'react';
import Select from '../../../components/support/Select';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Select', () => {
    let props;
    let shallowSelect;
    const mockFunction= jest.fn();
    const select = () => {
        if (!shallowSelect) {
            shallowSelect = shallow(<Select {...props}/>);
        }
        return shallowSelect;
    }

    // This resets the props and shallowSelect variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowSelect to undefined here, when the next test runs, 
    // if it calls select, a new Select will be created with the current props.
    beforeEach(() => {
        props = {
            className: "Text to test className property",
            property: "Text to test property property",
            placeholder: "Text to test placeholder property",
            option: '21123231',
            options: [{ name: "Test 1", _id: '21123231' }, { name: "Test 2", _id: '435254243' }],
            onTextChange: mockFunction,
        }
        shallowSelect = undefined;
    });

    test('has one child with passed property', () => {
        expect(select().children().length).toEqual(1);
        expect(select().hasClass(props.className)).toBe(true);
    });

    test('has one HTML select element with passed property', () => {
        const shallowWrapper = select().find('select');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('value')).toBe(props.option);
    });

    test('has 3 HTML option elements', () => {
        const shallowWrapper = select().find('option');
        expect(shallowWrapper.length).toEqual(3);
        shallowWrapper.forEach((node, index) => {
            if (index === 0) {
                expect(node.text()).toBe(props.placeholder);
            } else {
                expect(node.key()).toBe((index-1).toString());
                expect(node.prop('value')).toBe(props.options[index-1]._id);
                expect(node.text()).toBe(props.options[index-1].name);
            }
        });
    });

    test('should call mockFunction onTextChange', () => {
        const shallowWrapper = select().find('select');
        shallowWrapper.simulate('change', { target: { value: 'test' } }); // As noted in the function signature above passing a mock event is optional. It is worth noting that ReactWrapper will pass a SyntheticEvent object to the event handler in your code. Keep in mind that if the code you are testing uses properties that are not included in the SyntheticEvent, for instance event.target.value, you will need to provide a mock event like so .simulate("change", { target: { value: "foo" }}) for it to work.
        expect(mockFunction).toHaveBeenCalled();
        expect(mockFunction).toHaveBeenCalledWith(props.property, 'test');
    });
});
