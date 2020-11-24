import React from 'react';

export default class ChangeImageButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeImageButtonClick = this.handleChangeImageButtonClick.bind(this);
    }

    handleChangeImageButtonClick() {
        this.props.onChangeImageButtonClick(this.props.type);
    }

    render() {
        return (
            <button className="change-image" onClick={this.handleChangeImageButtonClick}>
                {this.props.type === 'next' ? '>' : '<'}
            </button>
        );  
    }
}
