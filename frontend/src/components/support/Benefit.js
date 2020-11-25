import React from 'react';

export default class Benefit extends React.Component {
    render() {
        return (
            <div className="benefit">
                <h5 className="benefit-title">{this.props.benefitTitle}</h5>
                <p className="benefit-text">{this.props.benefitText}</p>
            </div>
        );
    }
}
