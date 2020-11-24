import React from 'react';
import MainHeadline from './MainHeadline';
import SecondaryHeadline from './SecondaryHeadline';

class Headline extends React.Component {
    render() {
        const mainHeadlineText = this.props.mainHeadline;
        const secondaryHeadlineText = this.props.secondaryHeadline;

        return (
            <div className='headline'>
                <MainHeadline mainHeadline={mainHeadlineText}/>
                <SecondaryHeadline secondaryHeadline={secondaryHeadlineText}/>
            </div>
        );
    }
}

export default Headline;
