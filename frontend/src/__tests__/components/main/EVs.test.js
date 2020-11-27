import React from 'react';
import EVs from '../../../components/main/EVs';
import Filters from '../../../components/support/Filters';
import EVsContainer from '../../../components/support/EVsContainer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('EVs', () => {
    let shallowEVs;
    let props;
    const evs = () => {
        if (!shallowEVs) {
            shallowEVs = shallow(<EVs {...props}/>);
        }
        return shallowEVs;
    }

    // This reset the props and the shallowEVs variable before every test. 
    // Otherwise, state from one test would leak into another. 
    // By setting shallowEVs to undefined here, when the next test runs, 
    // if it calls evs, a new EVs will be created
    beforeEach(() => {
        props = {
            fetchUrl: 'Text to test the fetchUrl property',
        }
        shallowEVs = undefined;
    });

    // The default test environment for Jest is a browser-like environment provided by jsdom,
    // which implements most of what an actual browser would provide, but it doesn't implement everything.
    // Specifically, jsdom doesn't implement window.scrollTo, and instead throws an Error.
    const jsdomScrollTo = window.scrollTo;  // remember the jsdom scrollTo
    beforeAll(() => {
        window.scrollTo = jest.fn(); // provide a mock implementation for window.scrollTo
    });

    afterAll(() => {
        window.scrollTo = jsdomScrollTo; // restore the jsdom scrollTo
    });

    test('has 2 children', () => {
        expect(evs().children().length).toEqual(2);
    });

    test('has one Filters component rendered with passed properties', () => {
        const shallowWrapper = evs().find(Filters);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('make');
        expect(Object.keys(shallowWrapper.props())).toContain('price');
        expect(Object.keys(shallowWrapper.props())).toContain('range');
        expect(Object.keys(shallowWrapper.props())).toContain('extras');
        expect(Object.keys(shallowWrapper.props())).toContain('sort');
        expect(Object.keys(shallowWrapper.props())).toContain('visibility');
        expect(Object.keys(shallowWrapper.props())).toContain('onClick');
        expect(Object.keys(shallowWrapper.props())).toContain('onTextChange');
        expect(Object.keys(shallowWrapper.props())).toContain('onOptionChange');
    });

    test('has one EVsContainer component rendered with passed properties', () => {
        const shallowWrapper = evs().find(EVsContainer);
        expect(shallowWrapper.length).toEqual(1);
        expect(Object.keys(shallowWrapper.props())).toContain('evs');
    });    
});
