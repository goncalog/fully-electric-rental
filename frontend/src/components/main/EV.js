import React from 'react';
import EVTitle from '../support/EVTitle';
import EVPrice from '../support/EVPrice';
import OwnerContact from '../support/OwnerContact';
import EVDetail from '../support/EVDetail';
import formatRating from '../../utils/formatRating';
import formatMiles from '../../utils/formatMiles';
import formatNumber from '../../utils/formatNumber';
import getFullEvTitle from '../../utils/getFullEvTitle';
import getEvFeaturesArray from '../../utils/getEvFeaturesArray';
import getImagePosForSlider from '../../utils/getImagePosForSlider';
import '../../css/EV.css';

export default class EV extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            ev: {}, 
            currentImage: 0,
            sectionsVisibility: [false, false, false, false], 
        };
        this.handleChangeImageButtonClick = this.handleChangeImageButtonClick.bind(this);
        this.handleChangeSectionsVisibility = this.handleChangeSectionsVisibility.bind(this);
    }

    handleChangeImageButtonClick(buttonType) {
        if (buttonType === 'next') {
            this.setState((state) => ({ currentImage: state.currentImage + 1 }));
        } else if (buttonType === 'previous') {
            this.setState((state) => ({ currentImage: state.currentImage - 1 }));
        }
    }

    handleChangeSectionsVisibility(section) {
        this.setState((state) => { 
            let sectionsVisibility = state.sectionsVisibility.slice(); // Creating a new copy
            sectionsVisibility[section] = !sectionsVisibility[section];
            return { sectionsVisibility };
        });
    }

    componentDidMount() {
        // Scroll to top of page
        window.scrollTo(0, 0);

        // Upload database data
        let evUrl;
        
        if (process.env.NODE_ENV === 'production') {
            evUrl = `/content/ev/${this.props.match.params.id}`;
        } else {
            evUrl = `${process.env.REACT_APP_SERVER_URL}/content/ev/${this.props.match.params.id}`;
        }

        fetch(evUrl)
            .then((res) => res.json())
            .then((res) => { this.setState({ ev: res.ev }) })
    }

    render() {
        let ev = {
            title: '', 
            price: '',
            owner: { 
                name: '', 
                rating: '', 
                callToActionText: '',
                contact: '',
                id: '', 
            },
            detail: { 
                imagePath: '', 
                evFeatures: [], 
                sectionsVisibility: [], 
                sections: [], 
                onChangeImageButtonClick: this.handleChangeImageButtonClick, 
                onChangeSectionsVisibility: this.handleChangeSectionsVisibility, 
            },
        }

        if (Object.keys(this.state.ev).length > 0) {
            const imagePath = this.state.ev.image_urls[
                getImagePosForSlider(this.state.ev.image_urls.length, this.state.currentImage)
            ];

            console.log(this.state.ev);
            
            ev = {
                title: getFullEvTitle(this.state.ev),
                price: this.state.ev.price_per_day.toString(),
                owner: {
                    name: this.state.ev.owner.name,
                    rating: this.state.ev.owner.rating,
                    callToActionText: 'Contact Owner',
                    contact: this.state.ev.owner.contact,
                    id: this.state.ev.owner._id,
                },
                detail: {
                    imagePath: imagePath,
                    evFeatures: [
                        { 
                            name: 'Year',
                            value: this.state.ev.year,
                        },
                        { 
                            name: 'Mileage',
                            value: formatNumber(this.state.ev.mileage),
                        },
                        { 
                            name: 'Range',
                            value: formatMiles(this.state.ev.model.charging.range_miles),
                        },
                        { 
                            name: 'Location',
                            value: this.state.ev.location.city,
                        },
                        { 
                            name: 'Rating',
                            value: formatRating(this.state.ev.model.rating),
                        },
                        { 
                            name: 'Full Charge',
                            value: `${this.state.ev.model.charging.hours_to_charge}h`,
                        },
                    ],
                    sectionsVisibility: this.state.sectionsVisibility,
                    sections: [
                        {
                            name: 'Equipment and options',
                            expandButtonText: (this.state.sectionsVisibility[0]) ? '-' : '+',
                            evFeatures: getEvFeaturesArray(this.state.ev.equipment_and_options),    
                        },
                        {
                            name: 'Exterior',
                            expandButtonText: (this.state.sectionsVisibility[1]) ? '-' : '+',
                            evFeatures: [
                                { 
                                    name: 'Body style',
                                    value: (this.state.ev.exterior.body_style) ? 
                                    `${this.state.ev.exterior.body_style}` : 
                                    'N/a',
                                },
                                { 
                                    name: 'Colour',
                                    value: this.state.ev.exterior.colour,
                                },
                            ],    
                        },
                        {
                            name: 'Interior',
                            expandButtonText: (this.state.sectionsVisibility[2]) ? '-' : '+',
                            evFeatures: [
                                { 
                                    name: 'Seating',
                                    value: this.state.ev.interior.seating,
                                },
                                { 
                                    name: 'Colour',
                                    value: this.state.ev.interior.colour,
                                },
                            ],    
                        },
                        {
                            name: 'Performance',
                            expandButtonText: (this.state.sectionsVisibility[3]) ? '-' : '+',
                            evFeatures: [
                                { 
                                    name: 'Horsepower',
                                    value: `${this.state.ev.model.performance.horsepower}hp`,
                                },
                                { 
                                    name: 'Top speed',
                                    value: `${this.state.ev.model.performance.top_speed_mph}mph`,
                                },
                                { 
                                    name: '0-60mph',
                                    value: `${this.state.ev.model.performance.zero_to_sixty_mph}sec`,
                                },
                                { 
                                    name: 'Miles per kWh',
                                    value: (this.state.ev.model.performance.miles_per_kwh) ? 
                                            `${this.state.ev.model.performance.miles_per_kwh}` : 
                                            'N/a',
                                },
                            ],    
                        },
                    ],
                    onChangeImageButtonClick: this.handleChangeImageButtonClick,
                    onChangeSectionsVisibility: this.handleChangeSectionsVisibility,
                },
            }             
        }
        
        return (
            <div className="ev">
                <EVTitle title={ev.title} />
                <EVPrice price={ev.price} />
                <OwnerContact {...ev.owner} />
                <EVDetail {...ev.detail} />
                <OwnerContact {...ev.owner} />
            </div>
        )
    }
}
