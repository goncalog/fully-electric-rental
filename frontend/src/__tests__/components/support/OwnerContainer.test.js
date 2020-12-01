import React from 'react';
import Headline from '../../../components/support/Headline';
import CallToActionButton from '../../../components/support/CallToActionButton';
import OwnerContainer from '../../../components/support/OwnerContainer';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('OwnerContainer', () => {
    let props;
    let shallowOwnerContainer;
    const mockFunction = jest.fn();
    const ownerContainer = () => {
        if (!shallowOwnerContainer) {
            shallowOwnerContainer = shallow(<OwnerContainer {...props} />);
        }
        return shallowOwnerContainer;
    }

    // This reset the props and shallowOwnerContainer variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowOwnerContainer to undefined here, when the next test runs, 
    // if it calls ownerContainer, a new OwnerContainer will be created with the current props
    beforeEach(() =>  {
        props = {
            backgroundImagePath: '/file/path/to/owner/background/image',
            mainHeadline: 'Text to test mainHeadline property',
            secondaryHeadline: 'Text to test secondaryHeadline property',
            callToActionText: 'Text to test callToActionText property',
            onButtonClick: mockFunction,
        }
        shallowOwnerContainer = undefined;
    });

    test('has 2 children', () => {
        expect(ownerContainer().children().length).toEqual(2);
    });

    test('has background image with source passed as property', () => {
        expect(ownerContainer().prop('style').backgroundImage).toBe(`url(${props.backgroundImagePath})`);
    });

    test('has one Headline component rendered with passed properties', () => {
        const shallowWrapper = ownerContainer().find(Headline);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('mainHeadline')).toBe(props.mainHeadline);
        expect(shallowWrapper.prop('secondaryHeadline')).toBe(props.secondaryHeadline);
    });

    test('has one CallToActionButton component rendered with passed property', () => {
        const shallowWrapper = ownerContainer().find(CallToActionButton);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('callToActionText')).toBe(props.callToActionText);
        expect(shallowWrapper.prop('onButtonClick')).toBe(props.onButtonClick);
    });
});
