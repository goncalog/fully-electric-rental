import React from 'react';
import EVAdditionalFeatures from '../../components/support_components/EVAdditionalFeatures';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('EVAdditionalFeatures', () => {
    let props;
    let shallowEVAdditionalFeatures;
    const evAdditionalFeatures = () => {
        if (!shallowEVAdditionalFeatures) {
            shallowEVAdditionalFeatures = shallow(<EVAdditionalFeatures {...props} />);
        }
        return shallowEVAdditionalFeatures;
    }

    // This reset the props and shallowEVAdditionalFeatures variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowEVAdditionalFeatures to undefined here, when the next test runs, 
    // if it calls evAdditionalFeatures, a new EVAdditionalFeatures will be created with the current props
    beforeEach(() => {
        props = {
            evFeatures: [
                { 
                    name: 'Text to test name property #1',
                },
                { 
                    name: 'Text to test name property #2',
                    value: 'Text to test value property #2',
                },
                { 
                    name: 'Text to test name property #3',
                    value: 'Text to test value property #3',
                },
                { 
                    name: 'Text to test name property #4',
                    value: 'Text to test value property #4',
                },
            ],
            sectionVisibility: false,
        }
        shallowEVAdditionalFeatures = undefined;
    });

    test('has 4 children', () => {
        expect(evAdditionalFeatures().children().length).toEqual(4);
    });

    test('has 4 p HTML elements rendered with passed properties', () => {
        const shallowWrapper = evAdditionalFeatures().find('p.additional-feature');
        expect(shallowWrapper.length).toEqual(4);

        shallowWrapper.forEach((evFeature, i) => {
            if (i === 0) {
                expect(evFeature.text()).toBe(`- ${props.evFeatures[i].name}`);
            } else {
                expect(evFeature.text()).toBe(`- ${props.evFeatures[i].name}: ${props.evFeatures[i].value}`);                
            }
            expect(evFeature.key()).toBe(i.toString());
        });
    });

    test('has class based on passed property', () => {
        expect(evAdditionalFeatures().hasClass(`additional-features${props.sectionVisibility ? "" : " hidden"}`))
            .toBe(true);
    });
});
