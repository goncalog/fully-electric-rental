import React from 'react';

class SecondaryHeadline extends React.Component {
    render() {
        const secondaryHeadlineText = this.props.secondaryHeadline;

        return (
            <h3 className="secondary-headline">{secondaryHeadlineText}</h3>
        );
    }
}

export default SecondaryHeadline;
