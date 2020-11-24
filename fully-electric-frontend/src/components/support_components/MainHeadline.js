import React from 'react';

class MainHeadline extends React.Component {
    render() {
        const mainHeadlineText = this.props.mainHeadline;

        return (
            <h1 className="main-headline">{mainHeadlineText}</h1>
        );
    }
}

export default MainHeadline;
