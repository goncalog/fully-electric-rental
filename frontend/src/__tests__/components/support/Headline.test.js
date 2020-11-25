import React from 'react';
import Headline from '../../components/support_components/Headline';
import MainHeadline from '../../components/support_components/MainHeadline';
import SecondaryHeadline from '../../components/support_components/SecondaryHeadline';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Headline', () => {
    let props;
    let shallowHeadline;
    const headline = () => {
        if (!shallowHeadline) {
            shallowHeadline = shallow(<Headline {...props}/>)
        }
        return shallowHeadline;
    }

    // This reset the props and shallowHeadline variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowHeadline to undefined here, when the next test runs, 
    // if it calls headline, a new Headline will be created with the current props
    beforeEach(() => {
        props = {
            mainHeadline: "Text to test Headline's mainHeadline property",
            secondaryHeadline: "Text to test Headline's secondaryHeadline property",
        };
        shallowHeadline = undefined;
    });

    test('has 2 children', () => {
        expect(headline().children().length).toEqual(2);
    });
    
    test('has one MainHeadline component', () => {
        expect(headline().find(MainHeadline).length).toEqual(1);
    });
    
    test('has one SecondaryHeadline component', () => {
        expect(headline().find(SecondaryHeadline).length).toEqual(1);
    });

    test('passes mainHeadline property with some text to the rendered MainHeadline child', () => {
        expect(headline().find(MainHeadline).prop('mainHeadline')).toBe(props.mainHeadline);
    });
    
    test('passes secondaryHeadline property with some text to SecondaryHeadline child', () => {
        expect(headline().find(SecondaryHeadline).prop('secondaryHeadline'))
                .toBe(props.secondaryHeadline);
    });       
});
