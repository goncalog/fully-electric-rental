import React from 'react';
import EVIntroCard from '../../../components/support/EVIntroCard';
import EVImage from '../../../components/support/EVImage';
import EVTitle from '../../../components/support/EVTitle';
import EVPrice from '../../../components/support/EVPrice';
import EVKeyFeatures from '../../../components/support/EVKeyFeatures';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('EVIntroCard', () => {
    let props;
    let shallowEVIntroCard;
    const evIntroCard = () => {
        if (!shallowEVIntroCard) {
            shallowEVIntroCard = shallow(<EVIntroCard {...props} />);
        }
        return shallowEVIntroCard;
    }

    // This reset the props and shallowEVIntroCard variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowEVIntroCard to undefined here, when the next test runs, 
    // if it calls evIntroCard, a new EVIntroCard will be created with the current props
    beforeEach(() => {
        props = {
            imagePath: '/path/to/ev/image',
            title: 'Text to test title property',
            price: '11900',
            evFeatures: [
                { 
                    name: 'Text to test name property #1',
                    value: 'Text to test value property #1',
                },
                { 
                    name: 'Text to test name property #2',
                    value: 'Text to test value property #2',
                },
                { 
                    name: 'Text to test name property #3',
                    value: 'Text to test value property #3',
                },
            ],
        }
        shallowEVIntroCard = undefined;
    });

    test('has 4 children', () => {
        expect(evIntroCard().children().length).toEqual(4);
    });

    test('has one EVImage component rendered with passed property', () => {
        const shallowWrapper = evIntroCard().find(EVImage);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('imagePath')).toBe(props.imagePath);
    });

    test('has one EVTitle component rendered with passed property', () => {
        const shallowWrapper = evIntroCard().find(EVTitle);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('title')).toBe(props.title);
    });

    test('has one EVPrice component rendered with passed property', () => {
        const shallowWrapper = evIntroCard().find(EVPrice);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('price')).toBe(props.price);
    });

    test('has one EVKeyFeatures components rendered with passed properties', () => {
        const shallowWrapper = evIntroCard().find(EVKeyFeatures);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('evFeatures')).toBe(props.evFeatures);
    });
});
