import React from 'react';
import LogOut from '../../../components/main/LogOut';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('LogOut', () => {
    it('renders one child', () => {
        const wrapper = shallow(<LogOut />);
        expect(React.Children.count(wrapper.children())).toEqual(1);
    });
});
