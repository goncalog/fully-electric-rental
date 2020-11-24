import React from 'react';
import EVAdditionalSectionName from './EVAdditionalSectionName';
import ExpandButton from './ExpandButton';
import EVAdditionalFeatures from './EVAdditionalFeatures';

export default class EVAdditionalSection extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeSectionVisibility = this.handleChangeSectionVisibility.bind(this);
    }

    handleChangeSectionVisibility(section) {
        this.props.onChangeSectionVisibility(section);
    }

    render() {
        return (
            <div className="ev-additional-section">
                <EVAdditionalSectionName name={this.props.name} />
                <ExpandButton
                    section={this.props.section} 
                    expandButtonText={this.props.expandButtonText} 
                    onChangeSectionVisibility={this.handleChangeSectionVisibility}    
                />
                <EVAdditionalFeatures 
                    evFeatures={this.props.evFeatures} 
                    sectionVisibility={this.props.sectionVisibility}
                />
            </div>
        );
    }
}
