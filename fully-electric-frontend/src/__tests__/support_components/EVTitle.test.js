import React from 'react';
import EVTitle from '../../components/support_components/EVTitle';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('EVTitle', () => {
    let props;
    let shallowEVTitle;
    const evTitle = () => {
        if (!shallowEVTitle) {
            shallowEVTitle = shallow(<EVTitle {...props} />);
        }
        return shallowEVTitle;
    }

    // This reset the props and shallowEVTitle variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowEVTitle to undefined here, when the next test runs, 
    // if it calls evTitle, a new EVTitle will be created with the current props
    beforeEach(() => {
        props = {
            title: 'Text to test title property',
        }
        shallowEVTitle = undefined;
    });

    test('has one child', () => {
        expect(evTitle().children().length).toEqual(1);
    });

    test('has one h5 HTML element with some text passed as a property', () => {
        const shallowWrapper = evTitle().find('h5.ev-title');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.title);
    });
});
