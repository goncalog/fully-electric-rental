import React from 'react';
import HeadlineContainer from '../../../components/support/HeadlineContainer';
import Headline from '../../../components/support/Headline';
import CallToActionButton from '../../../components/support/CallToActionButton';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('HeadlineContainer', () => {
    let props;
    let shallowHeadlineContainer;
    const mockFunction = jest.fn();
    const headlineContainer = () => {
        if (!shallowHeadlineContainer) {
            shallowHeadlineContainer = shallow(<HeadlineContainer {...props} />);
        }
        return shallowHeadlineContainer;
    }

    // This reset the props and shallowHeadlineContainer variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowHeadlineContainer to undefined here, when the next test runs, 
    // if it calls headlineContainer, a new HeadlineContainer will be created with the current props
    beforeEach(() => {
        props = {
            backgroundImagePath: '/file/path/to/background/image',
            mainHeadline: 'Text to test mainHeadline property',
            secondaryHeadline: 'Text to test secondaryHeadline property',
            callToActionText: 'Text to test callToActionText property',
            onButtonClick: mockFunction,
        };
        shallowHeadlineContainer = undefined;
    });

    test('has 2 children', () => {
        expect(headlineContainer().children().length).toEqual(2);
    });

    test('has background image with source passed as a property', () => {
        expect(headlineContainer().prop('style').backgroundImage).toBe(`url(${props.backgroundImagePath})`);
    });

   test('has one Headline rendered with passed properties', () => {
       const shallowWrapper = headlineContainer().find(Headline);
       expect(shallowWrapper.length).toEqual(1);
       expect(shallowWrapper.prop('mainHeadline')).toBe(props.mainHeadline);
       expect(shallowWrapper.prop('secondaryHeadline')).toBe(props.secondaryHeadline);
   });

   test('has one CallToActionButton rendered with passed property', () => {
       const shalowWrapper = headlineContainer().find(CallToActionButton);
       expect(shalowWrapper.length).toEqual(1);
       expect(shalowWrapper.prop('callToActionText')).toBe(props.callToActionText);
       expect(shalowWrapper.prop('onButtonClick')).toBe(props.onButtonClick);
    });
});
