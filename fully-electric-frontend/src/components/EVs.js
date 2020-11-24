import React from 'react';
import Filters from './support_components/Filters';
import EVsContainer from './support_components/EVsContainer';
import getFullEvTitle from '../utils/getFullEvTitle';
import '../css/EVs.css';
import formatMiles from '../utils/formatMiles';
import formatNumber from '../utils/formatNumber';
import applyFilters from '../utils/applyFilters';
import applySort from '../utils/applySort';

export default class EVs extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            evs: [],
            filteredEvs: [],
            make: { property: 'make', title: 'Make', options: [], },
            price: { property: 'price', title: 'Price', min: "", max: "",},
            mileage: { property: 'mileage', title: 'Mileage', min: "", max: "",},
            range: { property: 'range', title: 'Range', min: "", max: "",},
            extras: { property: 'extras', title: 'Extras', options: [{ name: 'FSD' }], },
            sort: { 
                property: 'sort', 
                title: 'Sort', 
                options: [
                    { name: 'Lowest Price', checked: true }, { name: 'Highest Price' }, 
                    { name: 'Lowest Mileage' }, { name: 'Highest Range' }, 
                ], 
            },
            filterVisibility: { 
                make: false, price: false, mileage: false, range: false, extras: false, sort: false 
            },
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleClick(property) {
        this.setState({ filterVisibility: { [property]: !this.state.filterVisibility[property] }});
    }

    handleTextChange(property, type, text) {
        this.setState({ [property]:  { ...this.state[property], [type]: text }});
    }

    handleOptionChange(prop, i) {
        let options = this.state[prop].options.slice();

        if (prop === 'sort') {
            options = options.map((option, index) => {
                (index === parseInt(i)) ? option.checked = true : option.checked = false;
                return option;
            });
        } else {
            options[i].checked = !options[i].checked;
        }

        this.setState({ [prop]: { ...this.state[prop], options: options }});
    }

    componentDidMount() {
        // Scroll to top of page
        window.scrollTo(0, 0);

        // Upload database data
        fetch(this.props.fetchUrl)
            .then(res => res.json())
            .then((res) => { this.setState({ evs: res.evs, filteredEvs: applySort(res.evs, this.state.sort) }) })

        // Fetch makes
        if (this.state.make.options.length === 0) {
            let url = (process.env.NODE_ENV === 'production') 
                    ? `/content/makes` 
                    : `${process.env.REACT_APP_SERVER_URL}/content/makes`;

            fetch(url)
                .then((res) => res.json())
                .then((res) => {
                    res.makes.forEach((make) => make['checked'] = false);
                    this.setState({ make: { ...this.state.make, options: res.makes }}) 
                })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.make !== this.state.make ||
            prevState.price !== this.state.price ||
            prevState.mileage !== this.state.mileage ||
            prevState.range !== this.state.range ||
            prevState.extras !== this.state.extras ||
            prevState.sort !== this.state.sort
        ) {
            this.setState({ filteredEvs: applySort(applyFilters(this.state), this.state.sort) });
        }
    }

    render() {
        const evs = this.state.filteredEvs.map((item) => {
            let ev = {
                imageUrls: item.image_urls,
                title: getFullEvTitle(item),
                price: item.price,
                evFeatures: [
                    { 
                        name: 'Year',
                        value: item.year,
                    },
                    { 
                        name: 'Mileage',
                        value: formatNumber(item.mileage),
                    },
                    { 
                        name: 'Range',
                        value: formatMiles(item.model.charging.range_miles),
                    },
                ],
                id: item._id,                
            };
            return ev;
        });

        return (
            <div className="evs">
                <Filters 
                    make={this.state.make}
                    price={this.state.price}
                    mileage={this.state.mileage}
                    range={this.state.range}
                    extras={this.state.extras}
                    sort={this.state.sort}
                    visibility={this.state.filterVisibility}
                    onClick={this.handleClick}
                    onTextChange={this.handleTextChange}
                    onOptionChange={this.handleOptionChange}
                />
                <EVsContainer evs={evs} {...this.props} />
            </div>
        );
    }
}
