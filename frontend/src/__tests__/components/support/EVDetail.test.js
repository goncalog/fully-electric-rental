import React from 'react';
import EVDetail from '../../../components/support/EVDetail';
import EVImageSlider from '../../../components/support/EVImageSlider';
import EVKeyFeatures from '../../../components/support/EVKeyFeatures';
import EVAdditionalSectionsContainer from '../../../components/support/EVAdditionalSectionsContainer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('EVDetail', () => {
    let props;
    let shallowEVDetail;
    const mockFunction = jest.fn();
    const mockFunctionTwo = jest.fn();
    const evDetail = () => {
        if (!shallowEVDetail) {
            shallowEVDetail = shallow(<EVDetail {...props} />);
        }
        return shallowEVDetail;
    }

    // This reset the props and shallowEVDetail variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowEVDetail to undefined here, when the next test runs, 
    // if it calls evDetail, a new EVDetail will be created with the current props
    beforeEach(() => {
        props = {
            imagePath: '/path/to/ev/image',
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
            sectionsVisibiliy: [false, true, false, true],
            sections: [
                {
                    name: 'Text to test name property #1',
                    expandButtonText: 'Text to test expandButtonText property #1',
                    evFeatures: [
                        { 
                            name: 'Text to test name property #1.1',
                            value: 'Text to test value property #1.1',
                        },
                        { 
                            name: 'Text to test name property #1.2',
                            value: 'Text to test value property #1.2',
                        },
                    ],    
                },
                {
                    name: 'Text to test name property #2',
                    expandButtonText: 'Text to test expandButtonText property #2',
                    evFeatures: [
                        { 
                            name: 'Text to test name property #2.1',
                            value: 'Text to test value property #2.1',
                        },
                        { 
                            name: 'Text to test name property #2.2',
                            value: 'Text to test value property #2.2',
                        },
                    ],    
                },
                {
                    name: 'Text to test name property #3',
                    expandButtonText: 'Text to test expandButtonText property #3',
                    evFeatures: [
                        { 
                            name: 'Text to test name property #3.1',
                            value: 'Text to test value property #3.1',
                        },
                        { 
                            name: 'Text to test name property #3.2',
                            value: 'Text to test value property #3.2',
                        },
                    ],    
                },
                {
                    name: 'Text to test name property #4',
                    expandButtonText: 'Text to test expandButtonText property #4',
                    evFeatures: [
                        { 
                            name: 'Text to test name property #4.1',
                            value: 'Text to test value property #4.1',
                        },
                        { 
                            name: 'Text to test name property #4.2',
                            value: 'Text to test value property #4.2',
                        },
                    ],    
                },
            ],
            onChangeImageButtonClick: mockFunction,
            onChangeSectionsVisibility: mockFunctionTwo,
        }
        shallowEVDetail = undefined;
    });

    test('has 3 children', () => {
        expect(evDetail().children().length).toEqual(3);
    });

    test('has one EVImageSlider with passed property', () => {
        const shallowWrapper = evDetail().find(EVImageSlider);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('imagePath')).toBe(props.imagePath);
    });

    test('has one EVKeyFeatures with passed property', () => {
        const shallowWrapper = evDetail().find(EVKeyFeatures);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('evFeatures')).toBe(props.evFeatures);
    });

    test('has one EVAdditionalSectionsContainer with passed properties', () => {
        const shallowWrapper = evDetail().find(EVAdditionalSectionsContainer);
        expect(shallowWrapper.length).toEqual(1);
        expect(shallowWrapper.prop('sectionsVisibility')).toBe(props.sectionsVisibility);
        expect(shallowWrapper.prop('sections')).toBe(props.sections);
    });

    test('should have called mockFunction onChangeImageButtonClick', () => {
        const shallowWrapper = evDetail().find(EVImageSlider);
        shallowWrapper.props().onChangeImageButtonClick();
        shallowWrapper.props().onChangeImageButtonClick();
        expect(mockFunction).toHaveBeenCalledTimes(2);
    });

    test('should have called mockFunction onChangeSectionsVisibility', () => {
        const shallowWrapper = evDetail().find(EVAdditionalSectionsContainer);
        shallowWrapper.props().onChangeSectionsVisibility();
        shallowWrapper.props().onChangeSectionsVisibility();
        shallowWrapper.props().onChangeSectionsVisibility();
        expect(mockFunctionTwo).toHaveBeenCalledTimes(3);
    });
});
