import React from 'react';
import EVsContainer from '../../../components/support/EVsContainer';
import EVIntroCard from '../../../components/support/EVIntroCard';
import { Link } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('EVsContainer', () => {
    let props;
    let shallowEVsContainer;
    const evsContainer = () => {
        if (!shallowEVsContainer) {
            shallowEVsContainer = shallow(<EVsContainer {...props} />);
        }
        return shallowEVsContainer;
    }

    // This reset the props and shallowEVsContainer variables before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowEVsContainer to undefined here, when the next test runs, 
    // if it calls evsContainer, a new EVsContainer will be created with the current props
    beforeEach(() => {
        props = {
            evs: [
                {
                    imageUrls: ['/path/to/evOne/image1', '/path/to/evOne/image2'],
                    title: 'Text to test title property #1',
                    price: 10000,
                    evFeatures: [
                        { 
                            name: 'Text to test name property #1.1',
                            value: 100,
                        },
                        { 
                            name: 'Text to test name property #1.2',
                            value: 200,
                        },
                        { 
                            name: 'Text to test name property #1.3',
                            value: 300,
                        },
                    ],
                    id: '12',    
                },
                {
                    imageUrls: ['/path/to/evTwo/image1', '/path/to/evTwo/image2'],
                    title: 'Text to test title property #2',
                    price: 20000,
                    evFeatures: [
                        { 
                            name: 'Text to test name property #2.1',
                            value: 400,
                        },
                        { 
                            name: 'Text to test name property #2.2',
                            value: 500,
                        },
                        { 
                            name: 'Text to test name property #2.3',
                            value: 600,
                        },
                    ],    
                    id: '34',    
                },
                {
                    imageUrls: ['/path/to/evThree/image1', '/path/to/evThree/image2'],
                    title: 'Text to test title property #3',
                    price: 30000,
                    evFeatures: [
                        { 
                            name: 'Text to test name property #3.1',
                            value: 700,
                        },
                        { 
                            name: 'Text to test name property #3.2',
                            value: 800,
                        },
                        { 
                            name: 'Text to test name property #3.3',
                            value: 900,
                        },
                    ],
                    id: '56',    
                },
                {
                    imageUrls: ['/path/to/evFour/image1', '/path/to/evFour/image2'],
                    title: 'Text to test title property #4',
                    price: 40000,
                    evFeatures: [
                        { 
                            name: 'Text to test name property #4.1',
                            value: 1000,
                        },
                        { 
                            name: 'Text to test name property #4.2',
                            value: 1100,
                        },
                        { 
                            name: 'Text to test name property #4.3',
                            value: 1200,
                        },
                    ],
                    id: '78',    
                },
            ],
            match: {
                params: {
                    id: '',
                }
            }
        }
        shallowEVsContainer = undefined;
    });

    test('has 4 children', () => {
        expect(evsContainer().children().length).toEqual(4);
    });

    test('has 4 Link components rendered with passed properties', () => {
        const shallowWrapper = evsContainer().find(Link);
        expect(shallowWrapper.length).toEqual(4);

        shallowWrapper.forEach((link, i) => {
            expect(link.prop('to')).toBe(`/ev/${props.evs[i].id}`);
            expect(link.children().key()).toBe(i.toString());
        });
    });

    test('has 4 EVIntroCard components rendered with passed properties', () => {
        const shallowWrapper = evsContainer().find(EVIntroCard);
        expect(shallowWrapper.length).toEqual(4);

        shallowWrapper.forEach((ev, i) => {
            expect(ev.prop('imagePath')).toBe(props.evs[i].imageUrls[0]);
            expect(ev.prop('title')).toBe(props.evs[i].title);
            expect(ev.prop('price')).toBe(props.evs[i].price.toString());
            ev.prop('evFeatures').forEach((feature, j) => {
                expect(feature.name).toBe(props.evs[i].evFeatures[j].name);
                expect(feature.value).toBe(props.evs[i].evFeatures[j].value.toString());
            });
            expect(ev.key()).toBe(i.toString());
        });
    });
});
