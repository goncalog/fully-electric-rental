import React from 'react';
import MainHeadline from '../support/MainHeadline';
import Input from '../support/Input';
import Select from '../support/Select';
import CallToActionButton from '../support/CallToActionButton';
import EVAdditionalFeatures from '../support/EVAdditionalFeatures';
import '../../css/EVForm.css';

export default class EVForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            make: '',
            model: '',
            price: '',
            year: '',
            mileage: '',
            location: '',
            imageUrl: '',
            imageUrls: [],
            equipmentAndOption: '',
            equipmentAndOptions: [],
            bodyStyle: '',
            exteriorColour: '',
            interiorColour: '',
            seating: '',
            vehicleIdentificationNumber: '',
            fullVehicleInspection: '',
            makes: [],
            models: [],
            locations: [],
            makeSelected: false,
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAddImageUrlButtonClick = this.handleAddImageUrlButtonClick.bind(this);
        this.handleAddEquimentAndOptionsButtonClick = this.handleAddEquimentAndOptionsButtonClick.bind(this);
        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
        this.handleMakeSelection = this.handleMakeSelection.bind(this);
    }
    
    handleTextChange(property, value) {
        this.setState({ [property]: value });
    }

    handleAddImageUrlButtonClick() {
        if (this.state.imageUrl === '') {
            alert('Please provide a valid image url.');
            return;
        }

        this.setState((state) => {
            let array = state.imageUrls.slice(); // Creating a new copy
            array.push(state.imageUrl);
            return { imageUrls: array, imageUrl: '' };
        });
    }

    handleAddEquimentAndOptionsButtonClick() {
        if (this.state.equipmentAndOption === '') {
            alert('Please provide a valid input.');
            return;
        }

        this.setState((state) => {
            let array = state.equipmentAndOptions.slice(); // Creating a new copy
            array.push({ name: state.equipmentAndOption });
            return { equipmentAndOptions: array, equipmentAndOption: '' };
        });
    }

    handleSaveButtonClick() {
        // Validation
        if (this.state.make === '') {
            alert('Please provide a valid make.');
            return;
        }

        if (this.state.model === '') {
            alert('Please provide a valid model.');
            return;
        }

        if (this.state.price < 0 || this.state.price === '' || isNaN(Number(this.state.price))) {
            alert('Please provide a valid price.');
            return;
        }

        if (this.state.year < 1900 || this.state.year === '' || isNaN(Number(this.state.year))) {
            alert('Please provide a valid year.');
            return;
        }

        if (this.state.mileage < 0 || this.state.mileage === '' || isNaN(Number(this.state.mileage))) {
            alert('Please provide a valid mileage.');
            return;
        }

        if (this.state.location === '') {
            alert('Please provide a valid location.');
            return;
        }

        if (this.state.imageUrls === []) {
            alert('Please add some images.');
            return;
        }

        if (this.state.exteriorColour === '') {
            alert('Please provide a valid exterior colour.');
            return;
        }

        if (this.state.interiorColour === '') {
            alert('Please provide a valid interior colour.');
            return;
        }

        if (this.state.seating <= 0 || isNaN(Number(this.state.seating))) {
            alert('Please provide a valid seating.');
            return;
        }

        if (this.state.vehicleIdentificationNumber === '' || 
                this.state.vehicleIdentificationNumber.length !== 17) {
            alert('Please provide a valid VIN.');
            return;
        }

        if (this.state.fullVehicleInspection === '') {
            alert('Please provide the vehicle inspection status.');
            return;
        } 

        // Send data to backend
        let url = (process.env.NODE_ENV === 'production') 
            ? `/content${this.props.match.url}`
            : `${process.env.REACT_APP_SERVER_URL}/content${this.props.match.url}`;
        
        const currentDate = new Date();
        let data = {
            make: this.state.make,
            model: this.state.model,
            price: this.state.price,
            year: this.state.year,
            mileage: this.state.mileage,
            location: this.state.location,
            imageUrls: this.state.imageUrls,
            // Not sending the seller because the backend (Passport) already has this info
            listDate: currentDate,
            equipmentAndOptions: this.state.equipmentAndOptions.map((item) => item.name),
            bodyStyle: this.state.bodyStyle,
            exteriorColour: this.state.exteriorColour,
            interiorColour: this.state.interiorColour,
            seating: this.state.seating,
            vehicleIdentificationNumber: this.state.vehicleIdentificationNumber,
            fullVehicleInspection: this.state.fullVehicleInspection,
        };

        fetch(url, {
            method: this.props.match.url.slice(-6) === 'update' ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        })
            .then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                console.log('Success:', data);
                // Go to Seller Page
                this.props.history.push(`/seller/${data.userId}/evs`);
            })            
            .catch((error) => {
                console.error('Error:', error);
                alert(`Error: ${error}`);
            });        
    }

    handleMakeSelection(property, value) {
        // Fetch models of selected make
        if (value !== "") {
            let url = (process.env.NODE_ENV === 'production') 
                    ? `/content/make/${value}/models`
                    : `${process.env.REACT_APP_SERVER_URL}/content/make/${value}/models`;

            fetch(url)
                .then((res) => res.json())
                .then((res) => { this.setState({ models: res.models }) })
        }

        (value === "")
                ? this.setState({ [property]: value,  makeSelected: false})
                : this.setState({ [property]: value,  makeSelected: true})
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        // Fetch makes and locations
        if (this.state.makes.length === 0) {
            let url = (process.env.NODE_ENV === 'production') 
                    ? `/content/makes` 
                    : `${process.env.REACT_APP_SERVER_URL}/content/makes`;

            fetch(url)
                .then((res) => res.json())
                .then((res) => { this.setState({ makes: res.makes }) })
        }

        if (this.state.locations.length === 0) {
            let url = (process.env.NODE_ENV === 'production') 
                    ? `/content/locations` 
                    : `${process.env.REACT_APP_SERVER_URL}/content/locations`;

            fetch(url)
                .then((res) => res.json())
                .then((res) => { this.setState({ locations: res.locations }) })
        }

        // If this is the update page, load EV data
        if (this.props.match.url.slice(-6) === 'update') {
            let url = (process.env.NODE_ENV === 'production') 
                    ? `/content${this.props.match.url}` 
                    : `${process.env.REACT_APP_SERVER_URL}/content${this.props.match.url}`;

            fetch(url, { credentials: 'include' })
                .then((res) => res.json())
                .then((res) => {
                    this.handleMakeSelection('make', res.ev.make._id);
                    this.setState({
                        model: res.ev.model._id,
                        price: res.ev.price,
                        year: res.ev.year,
                        mileage: res.ev.mileage,
                        location: res.ev.location._id,
                        imageUrls: res.ev.image_urls,
                        equipmentAndOptions: res.ev.equipment_and_options.map((item) => ({ name: item })),
                        bodyStyle: res.ev.exterior.body_style ? res.ev.exterior.body_style : '',
                        exteriorColour: res.ev.exterior.colour,
                        interiorColour: res.ev.interior.colour,
                        seating: res.ev.interior.seating,
                        vehicleIdentificationNumber: res.ev.vehicle_identification_number,
                        fullVehicleInspection: res.ev.full_vehicle_inspection, 
                    }); 
                });
        }
    }

    render() {
        return (
            <div className="ev-form">
                <MainHeadline mainHeadline="Your EV for sale" />
                <CallToActionButton 
                    callToActionText="Save" 
                    onButtonClick={this.handleSaveButtonClick}
                />

                <Select 
                    className="make"
                    property="make"
                    placeholder="Make" 
                    onTextChange={this.handleMakeSelection}
                    option={this.state.make} 
                    options={this.state.makes}
                />
                <Select 
                    className={this.state.makeSelected ? "model" : "model invisible"}
                    property="model"
                    placeholder="Model" 
                    onTextChange={this.handleTextChange}
                    option={this.state.model}
                    options={this.state.models}
                />
                <Input 
                    className="price"
                    property="price"
                    placeholder="Price" 
                    text={this.state.price}
                    onTextChange={this.handleTextChange}
                />
                <Input 
                    className="year"
                    property="year"
                    placeholder="Year" 
                    text={this.state.year}
                    onTextChange={this.handleTextChange}
                />
                <Input 
                    className="mileage"
                    property="mileage"
                    placeholder="Mileage" 
                    text={this.state.mileage}
                    onTextChange={this.handleTextChange}
                />
                <Select
                    className="location"
                    property="location"
                    placeholder="Location"
                    onTextChange={this.handleTextChange}
                    option={this.state.location} 
                    options={this.state.locations}
                />
                
                <div className="image-urls-container add">
                    <Input 
                        className="image-url"
                        property="imageUrl"
                        placeholder="Image URL" 
                        text={this.state.imageUrl}
                        onTextChange={this.handleTextChange}
                    />
                    <CallToActionButton  
                        callToActionText="Add" 
                        onButtonClick={this.handleAddImageUrlButtonClick}
                    />
                   <p className="image-urls">
                        {`${this.state.imageUrls.length} ${this.state.imageUrls.length === 1 
                                ? 'image' : 'images'} added`}
                    </p>
                </div>

                <div className="equipment-and-options-container add">
                    <Input 
                        className="equipment-and-option"
                        property="equipmentAndOption"
                        placeholder="Equipment and Options" 
                        text={this.state.equipmentAndOption}
                        onTextChange={this.handleTextChange}
                    />
                    <CallToActionButton  
                        callToActionText="Add" 
                        onButtonClick={this.handleAddEquimentAndOptionsButtonClick}
                    />
                    <EVAdditionalFeatures 
                        evFeatures={this.state.equipmentAndOptions}
                        sectionVisibility={true}
                    />
                </div>
                
                <Input 
                    className="body-style"
                    property="bodyStyle"
                    placeholder="Body style" 
                    text={this.state.bodyStyle}
                    onTextChange={this.handleTextChange}
                />
                <Input 
                    className="exterior-colour"
                    property="exteriorColour"
                    placeholder="Exterior colour" 
                    text={this.state.exteriorColour}
                    onTextChange={this.handleTextChange}
                />
                <Input 
                    className="interior-colour"
                    property="interiorColour"
                    placeholder="Interior colour" 
                    text={this.state.interiorColour}
                    onTextChange={this.handleTextChange}
                />
                <Input 
                    className="seating"
                    property="seating"
                    placeholder="Seating" 
                    text={this.state.seating}
                    onTextChange={this.handleTextChange}
                />
                <Input 
                    className="vehicle-identification-number"
                    property="vehicleIdentificationNumber"
                    placeholder="Vehicle Identification Number" 
                    text={this.state.vehicleIdentificationNumber}
                    onTextChange={this.handleTextChange}
                />
                <Select 
                    className="full-vehicle-inspection"
                    property="fullVehicleInspection"
                    placeholder="Full Vehicle Inspection" 
                    onTextChange={this.handleTextChange}
                    option={this.state.fullVehicleInspection} 
                    options={[{ name: 'Yes', _id: true }, { name: 'No', _id: false }]}
                />

                <CallToActionButton 
                    callToActionText="Save" 
                    onButtonClick={this.handleSaveButtonClick}
                />
            </div>
        );
    }
}
