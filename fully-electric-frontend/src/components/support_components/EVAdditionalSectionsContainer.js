import React from 'react';
import EVAdditionalSection from './EVAdditionalSection';

export default class EVAdditionalSectionsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeSectionsVisibility = this.handleChangeSectionsVisibility.bind(this);
    }

    handleChangeSectionsVisibility(section) {
        this.props.onChangeSectionsVisibility(section);
    }

    render() {
        return (
            <div className="sections-container">
                {this.props.sections.map((section, i) => {
                    return (
                        <EVAdditionalSection 
                            key={i}
                            section={i}
                            sectionVisibility={this.props.sectionsVisibility[i]}
                            {...section}
                            onChangeSectionVisibility={this.handleChangeSectionsVisibility}    
                        />
                    );
                })}
            </div>
        );
    }
}
