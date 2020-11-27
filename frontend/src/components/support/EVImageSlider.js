import React from 'react';
import EVImage from './EVImage';
import ChangeImageButton from './ChangeImageButton';

export default class EVImageSlider extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeImageButtonClick = this.handleChangeImageButtonClick.bind(this);
    }

    handleChangeImageButtonClick(buttonType) {
        this.props.onChangeImageButtonClick(buttonType);
    }

    render() {
        return (
            <div className="image-slider">
                <ChangeImageButton 
                        type="previous" 
                        onChangeImageButtonClick={this.handleChangeImageButtonClick} 
                />
                <EVImage {...this.props} />
                <ChangeImageButton 
                        type="next" 
                        onChangeImageButtonClick={this.handleChangeImageButtonClick} 
                />
            </div>
        );
    }
}
