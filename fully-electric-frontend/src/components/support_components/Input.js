import React from 'react';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(e) {
        this.props.onTextChange(this.props.property, e.target.value);
    }

    render() {
        return (
            <div className={this.props.className}>
                <input 
                    placeholder={this.props.placeholder} 
                    value={this.props.text}
                    onChange={this.handleTextChange} 
                    type={this.props.className === 'password' ? this.props.className : '' }
                    required
                >
                </input>
            </div>
        );
    }
}
