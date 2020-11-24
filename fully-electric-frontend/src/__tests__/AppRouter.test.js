import React from 'react';
import Navigation from '../components/Navigation';
import AppRouter from '../components/AppRouter';
import Home from '../components/Home';
import EV from '../components/EV';
import Contact from '../components/Contact';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

test('renders the Router component', () => {
    const wrapper = shallow(<AppRouter />);
    expect(wrapper.find(Router).length).toBe(1);
  });

it('renders two children', () => {
    const wrapper = shallow(<AppRouter />);
    expect(React.Children.count(wrapper.children())).toEqual(2);
});

test('renders the Navigation component', () => {
    const wrapper = shallow(<AppRouter />);
    expect(wrapper.find(Navigation).length).toBe(1);
    expect(Object.keys(wrapper.find(Navigation).props())).toContain('loggedIn');
    expect(Object.keys(wrapper.find(Navigation).props())).toContain('userId');
});

test('renders the Switch component', () => {
    const wrapper = shallow(<AppRouter />);
    expect(wrapper.find(Switch).length).toBe(1);
});

test('renders 11 Route components', () => {
    const wrapper = shallow(<AppRouter />);
    expect(wrapper.find(Route).length).toBe(11);
});

test('renders all Route components with correct paths', () => {
    const wrapper = shallow(<AppRouter />);
    const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
        const routeProps = route.props();
        pathMap[routeProps.path] = (routeProps.component) ? routeProps.component : routeProps.render;
        return pathMap;
    }, {});
    expect(pathMap['/']).toBe(Home);
    expect(Object.keys(pathMap)).toContain('/evs');
    expect(pathMap['/ev/:id']).toBe(EV);
    expect(pathMap['/seller/:id/contact']).toBe(Contact);
    expect(Object.keys(pathMap)).toContain('/seller/signup');
    expect(Object.keys(pathMap)).toContain('/seller/login');
    expect(Object.keys(pathMap)).toContain('/seller/logout');
    expect(Object.keys(pathMap)).toContain('/seller/:id/evs');
    expect(Object.keys(pathMap)).toContain('/seller/:id/ev/create');
    expect(Object.keys(pathMap)).toContain('/seller/:id/ev/:id');
    expect(Object.keys(pathMap)).toContain('/seller/:id/ev/:id/update');
});
  