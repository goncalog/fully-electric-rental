import React from 'react';
import Footer from '../../../components/main/Footer';
import { render } from '@testing-library/react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('renders one child', () => {
    const wrapper = shallow(<Footer />);
    expect(React.Children.count(wrapper.children())).toEqual(1);
});

it('renders Title paragraph correctly', () => {
    const date = new Date();
    const year = date.getFullYear();
    const { getByText } = render(<Footer />);
    const titleParagraph = getByText(year.toString(), { exact: false });
    expect(titleParagraph).toBeInTheDocument();
});
