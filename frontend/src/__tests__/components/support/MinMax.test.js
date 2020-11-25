import React from 'react';
import MinMax from '../../../components/support/MinMax';
import Input from '../../../components/support/Input';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('MinMax', () => {
    let props;
    let shallowMinMax;
    const mockFunction= jest.fn();
    const minMax = () => {
        if (!shallowMinMax) {
            shallowMinMax = shallow(<MinMax {...props}/>);
        }
        return shallowMinMax;
    }

    // This resets the props and shallowMinMax variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowMinMax to undefined here, when the next test runs, 
    // if it calls minMax, a new MinMax will be created with the current props.
    beforeEach(() => {
        props = {
            min: "Text to test min property",
            max: "Text to test max property",
            onTextChange: mockFunction,
        }
        shallowMinMax = undefined;
    });

    test('has 2 children with passed property', () => {
        expect(minMax().children().length).toEqual(2);
    });

    test('has 2 Input components', () => {
        const shallowWrapper = minMax().find(Input);
        expect(shallowWrapper.length).toEqual(2);
        shallowWrapper.forEach((node, index) => {
            expect(Object.keys(node.props())).toContain('className');
            expect(Object.keys(node.props())).toContain('property');
            expect(Object.keys(node.props())).toContain('placeholder');
            index === 0 
                ? expect(node.prop('text')).toBe(props.min)
                : expect(node.prop('text')).toBe(props.max)
            node.props().onTextChange();
            expect(mockFunction).toHaveBeenCalled();
        });
    });
});
