import React from 'react';
import EVKeyFeatures from '../../components/support_components/EVKeyFeatures';
import EVFeature from '../../components/support_components/EVFeature';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('EVKeyFeatures', () => {
    let props;
    let shallowEVKeyFeatures;
    const evKeyFeatures = () => {
        if (!shallowEVKeyFeatures) {
            shallowEVKeyFeatures = shallow(<EVKeyFeatures {...props} />);
        }
        return shallowEVKeyFeatures;
    }

    // This reset the props and shallowEVKeyFeatures variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowEVKeyFeatures to undefined here, when the next test runs, 
    // if it calls evKeyFeatures, a new EVKeyFeatures will be created with the current props
    beforeEach(() => {
        props = {
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
        shallowEVKeyFeatures = undefined;
    });

    test('has 3 children', () => {
        expect(evKeyFeatures().children().length).toEqual(3);
    });

    test('has 3 EVFeature components rendered with passed properties', () => {
        const shallowWrapper = evKeyFeatures().find(EVFeature);
        expect(shallowWrapper.length).toEqual(3);

        shallowWrapper.forEach((evFeature, i) => {
            expect(evFeature.prop('name')).toBe(props.evFeatures[i].name);
            expect(evFeature.prop('value')).toBe(props.evFeatures[i].value);
        });
    });
});
