import React from 'react';
import SecondaryHeadline from '../../components/support_components/SecondaryHeadline';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('SecondaryHeadline', () => {
    let props;
    let shallowSecondaryHeadline;
    const secondaryHeadline = () => {
        if (!shallowSecondaryHeadline) {
            shallowSecondaryHeadline = shallow(<SecondaryHeadline {...props}/>);
        }
        return shallowSecondaryHeadline;
    }

    // This reset the props and shallowSecondaryHeadline variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowSecondaryHeadline to undefined here, when the next test runs, 
    // if it calls secondaryHeadline, a new SecondaryHeadline will be created with the current props
    beforeEach(() => {
        props = {
            secondaryHeadline: 'Text to test SecondaryHeadline',
        };
        shallowSecondaryHeadline = undefined;
    });

    test('has one child', () => {
        expect(secondaryHeadline().children().length).toEqual(1);
    });
    
    test('has h3 HTML element with some text', () => {
        const shallowWrapper = secondaryHeadline().find('h3.secondary-headline');
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.text()).toBe(props.secondaryHeadline);
    });
});
