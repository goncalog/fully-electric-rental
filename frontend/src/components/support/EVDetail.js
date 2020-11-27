import React from 'react';
import EVImageSlider from './EVImageSlider';
import EVKeyFeatures from './EVKeyFeatures';
import EVAdditionalSectionsContainer from './EVAdditionalSectionsContainer';

export default class EVDetail extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeImageButtonClick = this.handleChangeImageButtonClick.bind(this);
        this.handleChangeSectionsVisibility = this.handleChangeSectionsVisibility.bind(this);
    }

    handleChangeImageButtonClick(buttonType) {
        this.props.onChangeImageButtonClick(buttonType);
    }

    handleChangeSectionsVisibility(section) {
        this.props.onChangeSectionsVisibility(section);
    }

    render() {
        return (
            <div className="ev-detail">
                <EVImageSlider 
                    imagePath={this.props.imagePath} 
                    onChangeImageButtonClick={this.handleChangeImageButtonClick}
                />
                <EVKeyFeatures evFeatures={this.props.evFeatures} />
                <EVAdditionalSectionsContainer
                    sectionsVisibility={this.props.sectionsVisibility} 
                    sections={this.props.sections} 
                    onChangeSectionsVisibility={this.handleChangeSectionsVisibility}
                />
            </div>
        );
    }
}
