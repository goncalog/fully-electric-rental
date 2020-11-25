import React from 'react';
import App from '../components/App';
import Footer from '../components/Footer';
import AppRouter from '../components/AppRouter';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

test('renders the Footer component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Footer).length).toBe(1);
});

test('renders Routes component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(AppRouter).length).toBe(1);
});
