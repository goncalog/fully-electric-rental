import React from 'react';
import MainHeadline from '../../../components/support/MainHeadline';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('MainHeadline', () => {
    let props;
    let shallowMainHeadline;
    const mainHeadline = () => {
        if (!shallowMainHeadline) {
            shallowMainHeadline = shallow(<MainHeadline {...props} />);
        }
        return shallowMainHeadline;
    }

    // This reset the props and shallowMainHeadline variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowMainHeadline to undefined here, when the next test runs, 
    // if it calls mainHeadline, a new MainHeadline will be created with the current props
    beforeEach(() => {
        props = {
            mainHeadline: 'Text to test MainHeadline',
        };
        shallowMainHeadline = undefined;
    });

    test('has one child', () => {
        expect(mainHeadline().children().length).toEqual(1);
    });
    
    test('has h1 HTML element with some text', () => {
        const shallowWrapper = mainHeadline().find('h1.main-headline');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.mainHeadline);
    });    
});
