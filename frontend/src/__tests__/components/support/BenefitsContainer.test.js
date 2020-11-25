import React from 'react';
import BenefitsContainer from '../../../components/support/BenefitsContainer';
import Benefit from '../../../components/support/Benefit';
import CallToActionButton from '../../../components/support/CallToActionButton';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('BenefitContainer', () => {
    let props;
    let shallowBenefitContainer;
    const mockFunction = jest.fn();
    const benefitContainer = () => {
        if (!shallowBenefitContainer) {
            shallowBenefitContainer = shallow(<BenefitsContainer {...props} />);
        }
        return shallowBenefitContainer;
    }

    // This reset the props and shallowBenefitContainer variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowBenefitContainer to undefined here, when the next test runs, 
    // if it calls benefitContainer, a new BenefitsContainer will be created with the current props
    beforeEach(() => {
        props = {
            benefits: [
                { 
                    title: 'Text to test benefit title property #1',
                    text: 'Text to test benefit text property #1',
                },
                { 
                    title: 'Text to test benefit title property #2',
                    text: 'Text to test benefit text property #2',
                },
                { 
                    title: 'Text to test benefit title property #3',
                    text: 'Text to test benefit text property #3',
                },
            ],
            callToActionText: 'Text to test callToActionText property',
            onButtonClick: mockFunction,
        }
        shallowBenefitContainer = undefined;
    });

    test('has 2 children', () => {
        expect(benefitContainer().children().length).toEqual(2);
    });

    test('has 3 Benefit React components rendered with passed properties', () => {
        const shallowWrapper = benefitContainer().find(Benefit);
        expect(shallowWrapper.length).toEqual(3);

        shallowWrapper.forEach((benefit, i) => {
            expect(benefit.prop('benefitTitle')).toBe(props.benefits[i].title);
            expect(benefit.prop('benefitText')).toBe(props.benefits[i].text);
        });
    });

    test('has one CallToActionButton React component rendered with passed properties', () => {
        const shallowWrapper = benefitContainer().find(CallToActionButton);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('callToActionText')).toBe(props.callToActionText);
        expect(shallowWrapper.prop('onButtonClick')).toBe(props.onButtonClick);
    });
});
