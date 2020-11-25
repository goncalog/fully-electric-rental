import React from 'react';
import ChangeImageButton from '../../../components/support/ChangeImageButton';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('ChangeImageButton', () => {
    let props;
    let shallowChangeImageButton;
    const changeImageButton = (typeStr, handleClick) => {
        if (!shallowChangeImageButton) {
            props = {
                type: typeStr,
                onChangeImageButtonClick: (handleClick) ? handleClick : '',
            }
            shallowChangeImageButton = shallow(<ChangeImageButton {...props} />);
        }
        return shallowChangeImageButton;
    }

    // This reset the shallowChangeImageButton variable before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowChangeImageButton to undefined here, when the next test runs, 
    // if it calls changeImageButton, a new ChangeImageButton will be created with the specified props
    beforeEach(() => {
        shallowChangeImageButton = undefined;
    });

    test('has one child', () => {
        expect(changeImageButton('next').children().length).toEqual(1);
    });

    test('has one HTML button', () => {
        const shallowWrapper = changeImageButton('next').find('button.change-image');
        expect(shallowWrapper.length).toEqual(1);
    });

    test('has some text depending on the passed property (1)', () => {
        const shallowWrapper = changeImageButton('next').find('button.change-image');
        expect(shallowWrapper.text()).toBe('>');
    });

    test('has some text depending on the passed property (2)', () => {
        const shallowWrapper = changeImageButton('previous').find('button.change-image');
        expect(shallowWrapper.text()).toBe('<');
    });

    test('should call mock function when button is clicked', () => {
        const mockFunction = jest.fn();
        const shallowWrapper = changeImageButton('next', mockFunction).find('button.change-image');
        shallowWrapper.simulate('click');
        expect(mockFunction).toHaveBeenCalled();
        expect(mockFunction).toHaveBeenCalledWith(props.type);
    });
});
