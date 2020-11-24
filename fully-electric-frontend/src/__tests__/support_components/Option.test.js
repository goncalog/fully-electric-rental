import React from 'react';
import CheckBox from '../../components/support_components/CheckBox';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('CheckBox', () => {
    let props;
    let shallowCheckBox;
    const mockFunction = jest.fn();
    const checkBox = () => {
        if (!shallowCheckBox) {
            shallowCheckBox = shallow(<CheckBox {...props}/>);
        }
        return shallowCheckBox;
    }

    // This resets the props and shallowCheckBox variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowCheckBox to undefined here, when the next test runs, 
    // if it calls checkBox, a new CheckBox will be created with the current props.
    beforeEach(() => {
        props = {
            // option: '21123231',
            options: [{ name: "Test 1", _id: '21123231' }, { name: "Test 2", _id: '435254243' }],
            onChange: mockFunction,
        }
        shallowCheckBox = undefined;
    });

    test('has 2 children', () => {
        expect(checkBox().children().length).toEqual(2);
    });

    test('has 2 HTML input elements', () => {
        const shallowWrapper = checkBox().find('input');
        expect(shallowWrapper.length).toEqual(2);
        shallowWrapper.forEach((node, index) => {
            expect(node.key()).toBe((index).toString());
            expect(node.prop('id')).toBe((index));
            expect(node.prop('value')).toBe(props.options[index]._id);
            expect(node.prop('type')).toBe('checkbox');
            node.simulate('change', { target: { id: 'test' } });
            expect(mockFunction).toHaveBeenCalled();
        });
    });

    test('has 2 HTML label elements', () => {
        const shallowWrapper = checkBox().find('label');
        expect(shallowWrapper.length).toEqual(2);
        shallowWrapper.forEach((node, index) => {
            expect(node.prop('for')).toBe((index));
            expect(node.text()).toBe(props.options[index].name);
        });
    });
});
