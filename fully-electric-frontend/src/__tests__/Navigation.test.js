import React from 'react';
import Navigation from '../components/Navigation';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('renders one child', () => {
    const wrapper = shallow(<Router><Navigation /></Router>);
    expect(React.Children.count(wrapper.children())).toEqual(1);
});

it('renders Title link correctly', () => {
    const { getByText } = render(<Router><Navigation /></Router>);
    const titleLink = getByText(/Fully Electric/);
    expect(titleLink).toBeInTheDocument();
    expect(titleLink.getAttribute('href')).toBe('/');
});

it('renders Home link correctly', () => {
    const { getByText } = render(<Router><Navigation /></Router>);
    const homeLink = getByText(/Home/);
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute('href')).toBe('/');
});

it('renders EVs link correctly', () => {
    const { getByText } = render(<Router><Navigation /></Router>);
    const evsLink = getByText(/Buy/);
    expect(evsLink).toBeInTheDocument();
    expect(evsLink.getAttribute('href')).toBe('/evs');
});

it('renders Sell link correctly', () => {
    const { getByText } = render(<Router><Navigation /></Router>);
    const contactLink = getByText(/Sell/);
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.getAttribute('href')).toBe('/seller/signup');
});

it('renders Log in link correctly', () => {
    const { getByText } = render(<Router><Navigation /></Router>);
    const contactLink = getByText(/Log/);
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.getAttribute('href')).toBe('/seller/login');
});

it('renders the logo correctly', () => {
    const { getByText } = render(<Router><Navigation /></Router>);
    const titleLink = getByText(/Fully Electric/);
    expect(titleLink.firstChild.getAttribute('class')).toBe('App-logo');
    expect(titleLink.firstChild.getAttribute('src')).toBe('logo.svg');
});
