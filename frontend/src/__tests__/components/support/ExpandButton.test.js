import React from 'react';
import ExpandButton from '../../components/support_components/ExpandButton';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('ExpandButton', () => {
    let props;
    let shallowExpandButton;
    const mockFunction = jest.fn();
    const expandButton = () => {
        if (!shallowExpandButton) {
            shallowExpandButton = shallow(<ExpandButton {...props} />);
        }
        return shallowExpandButton;
    }

    // This reset the props and shallowExpandButton variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowExpandButton to undefined here, when the next test runs, 
    // if it calls expandButton, a new ExpandButton will be created with the current props
    beforeEach(() => {
        props = {
            section: 'Text to test section property',
            expandButtonText: 'Text to test expandButtonText property',
            onChangeSectionVisibility: mockFunction,
        };
        shallowExpandButton = undefined;
    });

    test('has one child', () => {
        expect(expandButton().children().length).toEqual(1);
    });

    test('has one HTML button with some text', () => {
        const shallowWrapper = expandButton().find('button.expand-button');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.expandButtonText);
    });

    test('should call mockFunction onChangeSectionVisibility', () => {
        const shallowWrapper = expandButton().find('button.expand-button');
        shallowWrapper.props().onClick();
        expect(mockFunction).toHaveBeenCalled();
        expect(mockFunction).toHaveBeenCalledWith(props.section);
    });
});
