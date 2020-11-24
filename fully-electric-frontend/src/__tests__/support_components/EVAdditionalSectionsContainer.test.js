import React from 'react';
import EVAdditionalSectionsContainer from '../../components/support_components/EVAdditionalSectionsContainer';
import EVAdditionalSection from '../../components/support_components/EVAdditionalSection';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('EVAdditionalSectionsContainer', () => {
    let props;
    let shallowEVAdditionalSectionsContainer;
    const mockFunction = jest.fn();
    const evAdditionalSectionsContainer = () => {
        if (!shallowEVAdditionalSectionsContainer) {
            shallowEVAdditionalSectionsContainer = shallow(<EVAdditionalSectionsContainer {...props} />);
        }
        return shallowEVAdditionalSectionsContainer;
    }

    // This reset the props and shallowEVAdditionalSectionsContainer variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowEVAdditionalSectionsContainer to undefined here, when the next test runs, 
    // if it calls evAdditionalSectionsContainer, a new EVAdditionalSectionsContainer will be created with the current props
    beforeEach(() => {
        props = {
            sectionsVisibility: [false, true, false, true],
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
            onChangeSectionsVisibility: mockFunction,
        }
        shallowEVAdditionalSectionsContainer = undefined;
    });

    test('has 4 children', () => {
        expect(evAdditionalSectionsContainer().children().length).toEqual(4);
    });

    test('has 4 EVAdditionalSection components rendered with passed properties', () => {
        const shallowWrapper = evAdditionalSectionsContainer().find(EVAdditionalSection);
        expect(shallowWrapper.length).toEqual(4);

        shallowWrapper.forEach((section, i) => {
            expect(section.prop('name')).toBe(props.sections[i].name);
            expect(section.prop('expandButtonText')).toBe(props.sections[i].expandButtonText);
            expect(section.prop('evFeatures')).toBe(props.sections[i].evFeatures);
            expect(section.key()).toBe(i.toString());
            expect(section.prop('section')).toBe(i);
            expect(section.prop('sectionVisibility')).toBe(props.sectionsVisibility[i]);
            section.props().onChangeSectionVisibility();
            expect(mockFunction).toHaveBeenCalled();
        });
    });
});
