import React from 'react';

export default class ExpandButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeSectionVisibility = this.handleChangeSectionVisibility.bind(this);
    }

    handleChangeSectionVisibility() {
        this.props.onChangeSectionVisibility(this.props.section);
    }

    render() {
        return (
            <button 
                className="expand-button" 
                onClick={this.handleChangeSectionVisibility}
            >
                {this.props.expandButtonText}
            </button>
        );
    }
}
