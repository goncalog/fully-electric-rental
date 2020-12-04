function createDatabaseItems(mongooseConnection) {
    console.log('This script populates some test EVs, makes, models, locations and owners to the database');

    const async = require('async');
    
    // Import mongoose models
    const EV = require('../models/ev');
    const Make = require('../models/make'); 
    const Model = require('../models/model');
    const Location = require('../models/location');
    const Owner = require('../models/owner');
    
    let hashedPasswords = [];
    let makes = [];
    let models = [];
    let locations = [];
    let owners = [];
    let evs = [];
    
    function hashedPasswordCreate(password, cb) {
        const bcrypt = require('bcryptjs');
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                cb(err, null);
                return;
            }
            // console.log(`New HashedPassord: ${hashedPassword}`);
            hashedPasswords.push(hashedPassword);
            cb(null, hashedPassword);
        });
    }
    
    function makeCreate(name, cb) {
        makeDetail = { name: name };
    
        const make = new Make(makeDetail);
    
        make.save(function (err) {
            if (err) {
                cb(err, null);
                return;
            }
    
            // console.log(`New Make: ${make}`);
            makes.push(make);
            cb(null, make);
        });
    }
    
    function modelCreate(make, name, secondaryName, performance, charging, rating, cb) {
        modelDetail = { 
            make: make,
            name: name,
            performance: performance,
            charging: charging,
            rating: rating,
        };
        if (secondaryName != false) {
            modelDetail.secondary_name = secondaryName;
        }
    
        const model = new Model(modelDetail);
    
        model.save(function (err) {
            if (err) {
                cb(err, null);
                return;
            }
    
            // console.log(`New Model: ${model}`);
            models.push(model);
            cb(null, model);
        });
    }
    
    function locationCreate(name, city, country, cb) {
        locationDetail = { 
            name: name, 
            city: city, 
            country: country, 
        }
    
        const location = new Location(locationDetail);
    
        location.save(function (err) {
            if (err) {
                cb(err, null);
                return;
            }
    
            // console.log(`New Location: ${location}`);
            locations.push(location);
            cb(null, location);
        });
    }
    
    function ownerCreate(name, contact, rating, password, cb) {
        ownerDetail = { 
            name: name, 
            contact: contact,
            rating: rating,
            password: password, 
        }
    
        const owner = new Owner(ownerDetail);
    
        owner.save(function (err) {
            if (err) {
                cb(err, null);
                return;
            }
    
            // console.log(`New Owner: ${owner}`);
            owners.push(owner);
            cb(null, owner);
        });
    }
    
    function evCreate(make, model, year, pricePerDay, deposit, minRentalPeriod, includedExtras, 
                mileage, location, imageUrls, owner, listDate, equipmentAndOptions, exterior, interior, 
                vehicleIdentificationNumber, fullVehicleInspection, pcoLicense, cb) {
        evDetail = { 
            make: make, 
            model: model,
            year: year,
            price_per_day: pricePerDay,
            deposit: deposit,
            min_rental_period: minRentalPeriod,
            included_extras: includedExtras,
            mileage: mileage,
            location: location,
            image_urls: imageUrls,
            owner: owner,
            list_date: listDate,
            equipment_and_options: equipmentAndOptions,
            exterior: exterior,
            interior: interior,
            vehicle_identification_number: vehicleIdentificationNumber,
            full_vehicle_inspection: fullVehicleInspection, 
            pco_license: pcoLicense, 
        }
    
        const ev = new EV(evDetail);
    
        ev.save(function (err) {
            if (err) {
                cb(err, null);
                return;
            }
    
            // console.log(`New EV: ${ev}`);
            evs.push(ev);
            cb(null, ev);
        });
    }

    function createMakes(cb) {
        async.series([
            function (callback) {
                makeCreate('Tesla', callback);
            },
            function (callback) {
                makeCreate('Nissan', callback);
            },
            function (callback) {
                makeCreate('Renault', callback);
            },
            function (callback) {
                makeCreate('Hyundai', callback);
            },
            function (callback) {
                makeCreate('Kia', callback);
            },
            function (callback) {
                makeCreate('Volkswagen', callback);
            },
            function (callback) {
                makeCreate('BMW', callback);
            },
            function (callback) {
                makeCreate('Audi', callback);
            },
            function (callback) {
                makeCreate('Mercedes-Benz', callback);
            },
            function (callback) {
                makeCreate('Jaguar', callback);
            },
            function (callback) {
                makeCreate('Polestar', callback);
            },
            function (callback) {
                makeCreate('Peugeot', callback);
            },
        ],
        // Optional callback
        cb
        );
    }
    
    function createHashedPasswords(cb) {
        async.series([
            function (callback) {
                hashedPasswordCreate('12345678', callback);
            },
        ],
        // Optional callback
        cb
        );
    }
    
    function createModels(cb) {
        async.series([
            function (callback) {
                modelCreate(makes[0], 'Model S', false, 
                { horsepower: 400, miles_per_kwh: 4, top_speed_mph: 150, zero_to_sixty_mph: 3.2 },
                { range_miles: 300, battery_size_kwh: 75, charge_cost: 8, hours_to_charge: 7 },
                4.7, callback);
            },
            function (callback) {
                modelCreate(makes[0], 'Model 3', 'Standard Range Plus',
                { horsepower: 320, miles_per_kwh: 4.3, top_speed_mph: 140, zero_to_sixty_mph: 5.6 },
                { range_miles: 200, battery_size_kwh: 50, charge_cost: 7, hours_to_charge: 5.25 },
                5, callback);
            },
            function (callback) {
                modelCreate(makes[1], 'Leaf', false, 
                { horsepower: 148, miles_per_kwh: 3.8, top_speed_mph: 90, zero_to_sixty_mph: 7.9 },
                { range_miles: 135, battery_size_kwh: 40, charge_cost: 5.6, hours_to_charge: 7.5 },
                4.0, callback);
            },
            function (callback) {
                modelCreate(makes[2], 'Zoe', false, 
                { horsepower: 200, miles_per_kwh: 3, top_speed_mph: 100, zero_to_sixty_mph: 8.2 },
                { range_miles: 120, battery_size_kwh: 40, charge_cost: 5, hours_to_charge: 5 },
                4.7, callback);
            },
            function (callback) {
                modelCreate(makes[3], 'Kona', '39kWh', 
                { horsepower: 134, miles_per_kwh: 4, top_speed_mph: 96, zero_to_sixty_mph: 9.9 },
                { range_miles: 155, battery_size_kwh: 42, charge_cost: 5.9, hours_to_charge: 4.25 },
                4.5, callback);
            },
            function (callback) {
                modelCreate(makes[4], 'e-Niro', '64kWh', 
                { horsepower: 201, miles_per_kwh: 3.6, top_speed_mph: 104, zero_to_sixty_mph: 7.5 },
                { range_miles: 230, battery_size_kwh: 64, charge_cost: 9, hours_to_charge: 10.5 },
                4.5, callback);
            },
            function (callback) {
                modelCreate(makes[5], 'e-Golf', false, 
                { horsepower: 300, miles_per_kwh: 4, top_speed_mph: 130, zero_to_sixty_mph: 3.9 },
                { range_miles: 240, battery_size_kwh: 60, charge_cost: 7, hours_to_charge: 6 },
                4.7, callback);
            },
            function (callback) {
                modelCreate(makes[6], 'i3', false, 
                { horsepower: 300, miles_per_kwh: 4, top_speed_mph: 130, zero_to_sixty_mph: 3.9 },
                { range_miles: 240, battery_size_kwh: 60, charge_cost: 7, hours_to_charge: 6 },
                4.6, callback);
            },
            function (callback) {
                modelCreate(makes[7], 'e-tron', '55', 
                { horsepower: 300, miles_per_kwh: 4, top_speed_mph: 130, zero_to_sixty_mph: 3.9 },
                { range_miles: 240, battery_size_kwh: 60, charge_cost: 7, hours_to_charge: 6 },
                4.5, callback);
            },
            function (callback) {
                modelCreate(makes[8], 'EQC', false, 
                { horsepower: 300, miles_per_kwh: 4, top_speed_mph: 130, zero_to_sixty_mph: 3.9 },
                { range_miles: 240, battery_size_kwh: 60, charge_cost: 7, hours_to_charge: 6 },
                4.6, callback);
            },
            function (callback) {
                modelCreate(makes[9], 'I-Pace', false, 
                { horsepower: 394, miles_per_kwh: 2.7, top_speed_mph: 124, zero_to_sixty_mph: 4.8 },
                { range_miles: 225, battery_size_kwh: 90, charge_cost: 12.6, hours_to_charge: 9.25 },
                5.0, callback);
            },
            function (callback) {
                modelCreate(makes[10], '2', false, 
                { horsepower: 300, miles_per_kwh: 4, top_speed_mph: 130, zero_to_sixty_mph: 3.9 },
                { range_miles: 240, battery_size_kwh: 60, charge_cost: 7, hours_to_charge: 6 },
                4.5, callback);
            },
            function (callback) {
                modelCreate(makes[11], 'e208', false, 
                { horsepower: 200, miles_per_kwh: 3, top_speed_mph: 100, zero_to_sixty_mph: 8.2 },
                { range_miles: 120, battery_size_kwh: 40, charge_cost: 5, hours_to_charge: 5 },
                4.5, callback);
            },
            function (callback) {
                modelCreate(makes[1], 'Leaf', 'N-Connecta', 
                { horsepower: 148, miles_per_kwh: 3.8, top_speed_mph: 90, zero_to_sixty_mph: 7.9 },
                { range_miles: 135, battery_size_kwh: 40, charge_cost: 5.6, hours_to_charge: 7.5 },
                4.0, callback);
            },
            function (callback) {
                modelCreate(makes[3], 'Ioniq', false, 
                { horsepower: 134, miles_per_kwh: 4.1, top_speed_mph: 103, zero_to_sixty_mph: 9.7 },
                { range_miles: 155, battery_size_kwh: 40, charge_cost: 5.6, hours_to_charge: 6.25 },
                3, callback);
            },
            function (callback) {
                modelCreate(makes[1], 'Leaf', 'Acenta', 
                { horsepower: 148, miles_per_kwh: 3.8, top_speed_mph: 90, zero_to_sixty_mph: 7.9 },
                { range_miles: 135, battery_size_kwh: 40, charge_cost: 5.6, hours_to_charge: 7.5 },
                4.0, callback);
            },
            function (callback) {
                modelCreate(makes[1], 'Leaf', 'e+ Tekna', 
                { horsepower: 215, miles_per_kwh: 3.6, top_speed_mph: 98, zero_to_sixty_mph: 7.3 },
                { range_miles: 200, battery_size_kwh: 62, charge_cost: 8.7, hours_to_charge: 10 },
                4.0, callback);
            },
            function (callback) {
                modelCreate(makes[3], 'Kona', '64kWh', 
                { horsepower: 201, miles_per_kwh: 3.8, top_speed_mph: 104, zero_to_sixty_mph: 7.9 },
                { range_miles: 245, battery_size_kwh: 67.5, charge_cost: 9.5, hours_to_charge: 7 },
                4.5, callback);
            },
            function (callback) {
                modelCreate(makes[1], 'Leaf', 'Tekna', 
                { horsepower: 148, miles_per_kwh: 3.8, top_speed_mph: 90, zero_to_sixty_mph: 7.9 },
                { range_miles: 135, battery_size_kwh: 40, charge_cost: 5.6, hours_to_charge: 7.5 },
                4.0, callback);
            },
        ],
        // Optional callback
        cb
        );
    }
    
    function createLocations(cb) {
        async.series([
            function (callback) {
                locationCreate('London', 'London', 'UK', callback);
            },
            function (callback) {
                locationCreate('Manchester', 'Manchester', 'UK', callback);
            },
            function (callback) {
                locationCreate('Liverpool', 'Liverpool', 'UK', callback);
            },
            function (callback) {
                locationCreate('Bristol', 'Bristol', 'UK', callback);
            },
            function (callback) {
                locationCreate('Brighton', 'Brighton', 'UK', callback);
            },
            function (callback) {
                locationCreate('Southampton', 'Southampton', 'UK', callback);
            },
            function (callback) {
                locationCreate('Leeds', 'Leeds', 'UK', callback);
            },
            function (callback) {
                locationCreate('Hull', 'Hull', 'UK', callback);
            },
            function (callback) {
                locationCreate('Leicester', 'Leicester', 'UK', callback);
            },
            function (callback) {
                locationCreate('Portsmouth', 'Portsmouth', 'UK', callback);
            },
            function (callback) {
                locationCreate('York', 'York', 'UK', callback);
            },
            function (callback) {
                locationCreate('Reading', 'Reading', 'UK', callback);
            },
        ],
        // Optional callback
        cb
        );
    }
    
    function createOwners(cb) {    
        async.series([
            function (callback) {
                ownerCreate('Goncalo G.', process.env.CONTACT_EMAIL, 0, hashedPasswords[0], callback);
            },
            function (callback) {
                ownerCreate('Otto Car', 'test@gmail.com', 4.4, hashedPasswords[0], callback);
            },
            function (callback) {
                ownerCreate('WeFlex', 'test1@gmail.com', 4.3, hashedPasswords[0], callback);
            },
            function (callback) {
                ownerCreate('Openstart', 'test2@gmail.com', 4.5, hashedPasswords[0], callback);
            },
            function (callback) {
                ownerCreate('Solis Cars', 'test3@gmail.com', 0, hashedPasswords[0], callback);
            },
            function (callback) {
                ownerCreate('PCO Rentals', 'test4@gmail.com', 3.3, hashedPasswords[0], callback);
            },
            function (callback) {
                ownerCreate('BM Car Rentals', 'test5@gmail.com', 0, hashedPasswords[0], callback);
            },
            function (callback) {
                ownerCreate('Rahman', 'test6@gmail.com', 0, hashedPasswords[0], callback);
            },
            function (callback) {
                ownerCreate('Emmanuel', 'test7@gmail.com', 0, hashedPasswords[0], callback);
            },
            function (callback) {
                ownerCreate('PaceHire', 'test8@gmail.com', 3.1, hashedPasswords[0], callback);
            },
        ],
        // Optional callback
        cb
        );
    }
    
    function createEvs(cb) {
        const currentDate = new Date();
    
        async.series([
            function (callback) {
                evCreate(
                    makes[1], 
                    models[13], 
                    2019, 
                    32.7,
                    250,
                    '4 weeks',
                    ['Insurance', 'Servicing', 'Tyres and Brakes', 'Road Tax, MOT, PHV Licence', 'Free CCTV Installed'],
                    0,
                    locations[0],
                    ['https://ottocar.co.uk/wp-content/uploads/2019/04/leaf1.jpg', 
                            'https://ottocar.co.uk/wp-content/uploads/2019/04/leaf7.jpg',
                            'https://ottocar.co.uk/wp-content/uploads/2019/04/leaf6.jpg',
                            'https://ottocar.co.uk/wp-content/uploads/2019/04/leaf5.jpg',
                            'https://ottocar.co.uk/wp-content/uploads/2019/04/leaf4.jpg',
                            'https://ottocar.co.uk/wp-content/uploads/2019/04/leaf3.jpg'],
                    owners[1],
                    currentDate,
                    ['17" Alloy Wheels', 'E-Pedal', 'Parking Sensors', 'Android Auto & Apple CarPlay', 'Bluetooth & USB', 'Air Con', 'Privacy Glass', 'LED Lights', 'Intelligent Driving Assist', 'Large Boot Space', 'Excellent Leg Room'],
                    { colour: 'White' },
                    { seating: 5, colour: 'Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[4], 
                    models[5], 
                    2020, 
                    28.4,
                    500,
                    '4 weeks',
                    [],
                    0,
                    locations[0],
                    ['https://www.weflex.co.uk/wp-content/uploads/2020/10/KIA_eNiro_Style_AEM_front_parking_960x720-1.jpg',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/10/KIA_eNiro_Style_AEM_interior_dashboard_960x720-1.jpg',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/10/Kia_e-Niro-01@2x-2-1030x579.jpg',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/10/KIA_eNiro_Back_Desktop_1920x1100.jpg8-1-1030x590.jpg',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/10/KIA_eNiro_Style_AEM_side_view_960x720-1.jpg'],
                    owners[2],
                    currentDate,
                    ['Adjustable Head Restraints', 'Roof Rails','Leather Trimmed Steering Wheel', 'Heated Steering Wheel And Front Seats', 'Air Conditioning - Climate Control', 'LED Daytime Running Lights', 'Door Mirrors - Electric Adjustment and Heated with Power Folding Function', '10.25" Touchscreen Satellite Navigation with European Mapping', 'Bluetooth Connectivity', 'Wireless Phone Charging Pad', 'Speakers: Infinity Sound System '],
                    { colour: 'Dark Grey' },
                    { seating: 5, colour: 'Dark Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[3], 
                    models[14], 
                    2020, 
                    23.6,
                    500,
                    '4 weeks',
                    [],
                    0,
                    locations[0],
                    ['https://www.weflex.co.uk/wp-content/uploads/2020/10/gallery_04.jpg',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/10/gallery_03-1030x552.jpg',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/10/gallery_01-1030x552.jpg',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/10/gallery_02-1030x552.jpg',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/10/gallery_05-1030x552.jpg'],
                    owners[2],
                    currentDate,
                    ['Adjustable Head Restraints', 'Roof Rails','Leather Wrapped Steering Wheel', 'Heated Steering Wheel', 'Air Conditioning - Climate Control', 'Rear Lights - LED', 'Door Mirrors - Electric Adjustment and Heated with Power Folding Function', '10.25" Widescreen Navigation with Bluelink® & Mapcare', 'Bluetooth Connectivity', 'Wireless Phone Charging Pad', 'Speakers: Infinity Sound System '],
                    { colour: 'White' },
                    { seating: 5, colour: 'Dark Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[3], 
                    models[4], 
                    2020, 
                    27.9,
                    500,
                    '4 weeks',
                    [],
                    0,
                    locations[0],
                    ['https://www.weflex.co.uk/wp-content/uploads/2020/09/Mailing-Hyundai-Kona-EV-12-1030x805.png',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/09/Mailing-Hyundai-Kona-EV-15-1030x806.png',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/09/Mailing-Hyundai-Kona-EV-13-1030x806.png',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/09/Mailing-Hyundai-Kona-EV-14-1030x806.png',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/09/Mailing-Hyundai-Kona-EV-16-1030x806.png'],
                    owners[2],
                    currentDate,
                    ['Adjustable Head Restraints', 'Roof Rails','Leather Wrapped Steering Wheel', 'Air Conditioning - Climate Control', 'Rear Lights - LED', 'Door Mirrors - Electric Adjustment and Heated with Power Folding Function', '10.25" Widescreen Navigation with Bluelink® & Mapcare', 'Wireless Phone Charging Pad'],
                    { colour: 'Light Blue' },
                    { seating: 5, colour: 'Dark Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[9], 
                    models[10], 
                    2018, 
                    37.9,
                    3000,
                    '5 years',
                    [],
                    0,
                    locations[0],
                    ['https://www.weflex.co.uk/wp-content/uploads/2020/02/Jaguar-I-Pace-2019-weflex.png',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/02/Jaguar-I-Pace-2019-weflex2.png',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/02/Jaguar-I-Pace-2019-weflex3.png',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/02/Jaguar-I-Pace-2019-weflex4.png',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/02/Jaguar-I-Pace-2019-weflex5.png',
                            'https://www.weflex.co.uk/wp-content/uploads/2020/02/Jaguar-I-Pace-2019-weflex6-1.png'],
                    owners[2],
                    currentDate,
                    [],
                    { colour: 'Grey' },
                    { seating: 5, colour: 'Black' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[1], 
                    models[15], 
                    2020, 
                    23.1,
                    500,
                    '4 weeks',
                    ['Servicing'],
                    0,
                    locations[0],
                    ['https://www.weflex.co.uk/wp-content/uploads/2019/12/Nissan-Leaf_e_plus-2019-1600-11-1-1-1030x710.jpg',
                            'https://www.weflex.co.uk/wp-content/uploads/2019/12/Nissan-Leaf_e_plus-2019-1280-29-1-1030x688.jpg',
                            'https://www.weflex.co.uk/wp-content/uploads/2019/12/Nissan-Leaf_e_plus-2019-1024-27-1.jpg',
                            'https://www.weflex.co.uk/wp-content/uploads/2019/12/Nissan-Leaf_e_plus-2019-1024-21.jpg'],
                    owners[2],
                    currentDate,
                    ['e-Pedal', 'Nissan Safety Shield including Lane Departure Warning, Intelligent Emergency Braking with Pedestrian Recognition, Intelligent Lane Intervention, Intelligent Cruise Control, Rear Cross Traffic Alert, High-Beam Assist', 'NissanConnect Services 8" Touchscreen Navigation and Entertainment System, Rear View Camera, Active Charging, Eco-Routing, Driving Range, Preset Air Conditioning, Nearby Charging Stations', 'Apple CarPlay® and Android Auto® Smartphone App Integration', '16" Alloy Wheels', '6.6 kW On-Board Charger and 50kW ChaDeMo Rapid Charge Port'],
                    { colour: 'White' },
                    { seating: 5, colour: 'Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[1], 
                    models[16], 
                    2019, 
                    37.1,
                    125,
                    '1 month',
                    ['Servicing', 'Maintenance', 'MOT', 'Insurance', 'Road tax and Licensing', 'Breakdown cover', 'Dash Camera'],
                    0,
                    locations[0],
                    ['https://images.squarespace-cdn.com/content/v1/57836f74c534a5d68f2ab97b/1597918972753-I9KEBZTZ8SLFK76XJBX9/ke17ZwdGBToddI8pDm48kJc19hslvQdVTOowd1oK-2sUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKchlw3RDhHIUv2J-Tldg5v2JtfapxOx37geVhCHPHbiV_TO4ykRZhjFT5vh-1adsTk/iris-8.jpeg?format=750w',
                            'https://images.squarespace-cdn.com/content/v1/57836f74c534a5d68f2ab97b/1597919085625-WDT8IVO3O17V0SRIUICD/ke17ZwdGBToddI8pDm48kGgtG-X-V8IPG9-oDiLWMyVZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PI79_6AbPI8GY6iEiqeOEHvMBCXAh71Z8hr4oSho3m178KMshLAGzx4R3EDFOm1kBS/nissan-leaf-3589.jpg?format=750w'],
                    owners[3],
                    currentDate,
                    [],
                    { colour: 'Grey' },
                    { seating: 5, colour: 'Dark Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[1], 
                    models[15], 
                    2019, 
                    28.4,
                    125,
                    '1 month',
                    ['Servicing', 'Maintenance', 'MOT', 'Insurance', 'Road tax and Licensing', 'Breakdown cover', 'Dash Camera'],
                    0,
                    locations[0],
                    ['https://images.squarespace-cdn.com/content/v1/57836f74c534a5d68f2ab97b/1597918748982-GZ68UNOOCVB4JK2W1LY8/ke17ZwdGBToddI8pDm48kJhLZo8aFNoGYo4V-5eHQ2sUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dgTrcntzO78fVKP2OYeFGIrQvvnqMmEqALG5FiWxHSZRW07ycm2Trb21kYhaLJjddA/iris-7.jpeg?format=750w',
                            'https://images.squarespace-cdn.com/content/v1/57836f74c534a5d68f2ab97b/1597918816054-LOC9U2Y623RJ6WAIKR1M/ke17ZwdGBToddI8pDm48kGgtG-X-V8IPG9-oDiLWMyVZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PI79_6AbPI8GY6iEiqeOEHvMBCXAh71Z8hr4oSho3m178KMshLAGzx4R3EDFOm1kBS/11-nissan-leaf-2018-uk-review-dashboard.jpg?format=750w'],
                    owners[3],
                    currentDate,
                    [],
                    { colour: 'Light Grey' },
                    { seating: 5, colour: 'Dark Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[1], 
                    models[13], 
                    2019, 
                    28.4,
                    125,
                    '1 month',
                    ['Servicing', 'Maintenance', 'MOT', 'Insurance', 'Road tax and Licensing', 'Breakdown cover', 'Dash Camera'],
                    0,
                    locations[0],
                    ['https://images.squarespace-cdn.com/content/v1/57836f74c534a5d68f2ab97b/1597918748982-GZ68UNOOCVB4JK2W1LY8/ke17ZwdGBToddI8pDm48kJhLZo8aFNoGYo4V-5eHQ2sUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2dgTrcntzO78fVKP2OYeFGIrQvvnqMmEqALG5FiWxHSZRW07ycm2Trb21kYhaLJjddA/iris-7.jpeg?format=750w',
                            'https://images.squarespace-cdn.com/content/v1/57836f74c534a5d68f2ab97b/1597918816054-LOC9U2Y623RJ6WAIKR1M/ke17ZwdGBToddI8pDm48kGgtG-X-V8IPG9-oDiLWMyVZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PI79_6AbPI8GY6iEiqeOEHvMBCXAh71Z8hr4oSho3m178KMshLAGzx4R3EDFOm1kBS/11-nissan-leaf-2018-uk-review-dashboard.jpg?format=750w'],
                    owners[3],
                    currentDate,
                    [],
                    { colour: 'Light Grey' },
                    { seating: 5, colour: 'Dark Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[3], 
                    models[14], 
                    2019, 
                    28.4,
                    125,
                    '1 month',
                    ['Servicing', 'Maintenance', 'MOT', 'Insurance', 'Road tax and Licensing', 'Breakdown cover', 'Dash Camera'],
                    0,
                    locations[0],
                    ['https://images.squarespace-cdn.com/content/v1/57836f74c534a5d68f2ab97b/1562249860936-5SNAPKSD96Q4VTHSFCA4/ke17ZwdGBToddI8pDm48kLFEISkpoWfSFI-Xuo6gEDdZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIGx32PsXeIEvYn9mo4ZoIXF0IfhPa4BI0J5LLf1QmEuE/cc_2018HYC330001_01_640_NKA.jpg?format=750w',
                            'https://images.squarespace-cdn.com/content/v1/57836f74c534a5d68f2ab97b/1544621213000-Y9OYERLDZBAR7ROCNKKF/ke17ZwdGBToddI8pDm48kDVYnQx84rzrm2qQOUd7Sy17gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UY8mqlSYPG-nmIUWpJc006SuQyuTTLGA4klG9-z6Yewc3-7Z7Bn97rMKff5yJsS8Lw/1600-IONIQ_Hybrid_Interior__2_.jpg?format=750w'],
                    owners[3],
                    currentDate,
                    [],
                    { colour: 'Black' },
                    { seating: 5, colour: 'Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[1], 
                    models[13], 
                    2020, 
                    31.4,
                    300,
                    '1 month',
                    ['Servicing', 'MOT', 'Road Tax', 'PHV Licensing', 'Tyres and Brakes'],
                    0,
                    locations[0],
                    ['https://soliscars.com/wp-content/uploads/2020/09/NISSAN1.png',
                            'https://soliscars.com/wp-content/uploads/2020/09/NISSAN2.png',
                            'https://soliscars.com/wp-content/uploads/2020/09/NISSAN3.png',
                            'https://soliscars.com/wp-content/uploads/2020/09/NISSAN4.png',
                            'https://soliscars.com/wp-content/uploads/2020/09/NISSAN5.png',
                            'https://soliscars.com/wp-content/uploads/2020/09/NISSAN6.png'],
                    owners[4],
                    currentDate,
                    ['A/C', 'Automatic Transmission'],
                    { colour: 'Light Grey' },
                    { seating: 5, colour: 'Dark Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[0], 
                    models[1], 
                    2020, 
                    49.9,
                    900,
                    '3 months',
                    ['Insurance', 'Breakdown Cover', 'Maintenance', 'Servicing', 'PCO Licensing', 'MOT'],
                    0,
                    locations[0],
                    ['https://www.pcorent.com/wp-content/uploads/2019/09/Toyota-Prius-Plus-1969.png'],
                    owners[5],
                    currentDate,
                    [],
                    { colour: 'White' },
                    { seating: 5, colour: 'Dark Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[1], 
                    models[2], 
                    2020, 
                    32.1,
                    500,
                    '3 months',
                    ['Insurance', 'Breakdown Cover', 'Maintenance', 'Servicing', 'PCO Licensing', 'MOT'],
                    0,
                    locations[0],
                    ['https://www.pcorent.com/wp-content/uploads/2019/10/PCO-Rentals-Nissan-Leaf-yellow.png'],
                    owners[5],
                    currentDate,
                    [],
                    { colour: 'White' },
                    { seating: 5, colour: 'Dark Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[1], 
                    models[2], 
                    2020, 
                    32.4,
                    500,
                    '8 weeks',
                    ['Maintenance', 'Servicing'],
                    0,
                    locations[0],
                    ['https://lirp-cdn.multiscreensite.com/496748a5/dms3rep/multi/opt/C5-320w.png'],
                    owners[6],
                    currentDate,
                    ['17 " Alloy Wheels', 'E-Pedal', 'Parking Sensors', 'Android Auto & Apple carplay', 'Bluetooth & USB', 'Air Con', 'Privacy Glass', 'LED Lights', 'Intelligent Driving Assist'],
                    { colour: 'White' },
                    { seating: 5, colour: 'Dark Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[4], 
                    models[5], 
                    2020, 
                    24.3,
                    0,
                    '1 week',
                    [],
                    0,
                    locations[0],
                    ['https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/dcsAAOSwiWBfuQ8k/$_86.JPG',
                            'https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/fWQAAOSwYL9fuQ8n/$_86.JPG',
                            'https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/G18AAOSwVrZfuQ8p/$_86.JPG',
                            'https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/frQAAOSwKcxfuQ8h/$_86.JPG'],
                    owners[7],
                    currentDate,
                    [],
                    { colour: 'Dark Blue' },
                    { seating: 5, colour: 'Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[3], 
                    models[17], 
                    2020, 
                    33.6,
                    200,
                    '1 week',
                    ['Road Tax', 'MOT', 'PHV License', 'Servicing'],
                    0,
                    locations[0],
                    ['https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/V9sAAOSwSkNfeinm/$_86.JPG',
                            'https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/bycAAOSwp2Vfeinp/$_86.JPG',
                            'https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/bycAAOSwp2Vfeinp/$_86.JPG',
                            'https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/bycAAOSwp2Vfeinp/$_86.JPG'],
                    owners[8],
                    currentDate,
                    [],
                    { colour: 'Yellow' },
                    { seating: 5, colour: 'Dark Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[3], 
                    models[17], 
                    2020, 
                    34.3,
                    500,
                    '12 weeks',
                    ['Insurance', 'Servicing', 'Maintenance'],
                    0,
                    locations[0],
                    ['https://www.pacehire.co.uk/wp-content/uploads/2020/08/kona-electric-1-1.jpg',
                            'https://www.pacehire.co.uk/wp-content/uploads/2020/08/kona-electric-3.jpg',
                            'https://www.pacehire.co.uk/wp-content/uploads/2020/08/kona-electric-6.jpg',
                            'https://www.pacehire.co.uk/wp-content/uploads/2020/08/kona-electric-4.jpg',
                            'https://www.pacehire.co.uk/wp-content/uploads/2020/08/kona-electric-5-1.jpg',
                            'https://www.pacehire.co.uk/wp-content/uploads/2020/08/kona-electric-2.jpg'],
                    owners[9],
                    currentDate,
                    ['17" Alloy Wheels', 'Exterior Door Handles - Body Coloured', 'Metallic / Pearl Paint', 'Leather Wrapped Steering Wheel', 'Driver\'s Seat Electric Adjustments', 'Driver\'s Seat Height Adjustment (Manual)', 'Driver\'s Seat Manual Adjustments', 'Front Passenger\'s Seat Height Adjustment (Electric)', 'Front Seats - Heated', 'Rear Seats (Outer) - Heated', 'Seat Trim - Leather (Seat Facings Only)', 'Automatic Headlights with Dusk Sensor', 'Interior Light - Centre', 'Privacy Glass - Rear Side and Tailgate', 'Cruise Control - Smart Adaptive Speed Control with Stop and Go Function', 'Steering Column - Height and Reach Adjustable', '10.25" Widescreen Navigation with Bluelink® & Mapcare', 'Driver\'s Supervision Instrument Cluster with TFT Display (7")', 'KRELL Premium Audio - 8 Speaker + Subwoofer', 'Driver\'s Supervision Instrument Cluster with TFT Display (7")', 'Radio - RDS and Digital DAB', 'Door Mirrors - Body Coloured', 'Roof Rails', 'Interior Door Handles - Chrome Effect', 'Adjustable Head Restraints', 'Driver\'s Seat Height Adjustment (Electric)', 'Driver\'s Seat Lumbar Support (Electric)', 'Front Passenger\'s Seat Electric Adjustments', 'Front Passenger\'s Seat Manual Adjustments', 'Front Seats - Ventilated', 'Seat Trim - Cloth', 'Air Conditioning - Climate Control', 'Cornering Lights - Static', 'Positioning Lights - LED', 'Battery Heater', 'Sun Visors - with Driver and Passenger Vanity Mirrors Illuminated', 'Steering Column - Height and Reach Adjustable', 'Bluetooth® Connectivity with Voice Recognition', 'Head Up Display (HUD)', 'Wireless Phone Charging Pad', 'USB and AUX Connections - Front'],
                    { colour: 'Red' },
                    { seating: 5, colour: 'Dark Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[1], 
                    models[18], 
                    2020, 
                    32.1,
                    500,
                    '12 weeks',
                    ['Insurance', 'Servicing', 'Maintenance'],
                    0,
                    locations[0],
                    ['https://www.pacehire.co.uk/wp-content/uploads/2019/11/18tdieulhd-leafhelios202.jpg.ximg_.l_full_m.smart-1.jpg',
                            'https://www.pacehire.co.uk/wp-content/uploads/2019/11/nissan_leaf_2018_06.jpg',
                            'https://www.pacehire.co.uk/wp-content/uploads/2019/11/nissan_leaf_2018_03.jpg',
                            'https://www.pacehire.co.uk/wp-content/uploads/2019/11/nissan_leaf_2018_07.jpg',
                            'https://www.pacehire.co.uk/wp-content/uploads/2019/11/nissan_leaf_2018_08.jpg',
                            'https://www.pacehire.co.uk/wp-content/uploads/2019/11/nissan_leaf_2018_10.jpg',
                            'https://www.pacehire.co.uk/wp-content/uploads/2019/11/nissan_leaf_2018_04.jpg',
                            'https://www.pacehire.co.uk/wp-content/uploads/2019/11/nissan_leaf_2018_09.jpg'],
                    owners[9],
                    currentDate,
                    ['Airbags', 'Alarm System', 'Automatic Climate Control', 'Cruise Control', 'Reversing Camera', 'Android Auto & Apple carplay', 'Air Conditioning', 'Audio Interface', 'Bluetooth® Handset', 'Electric Parking Brake', '7 Bose® Speakers: 2 Tweeters, 4 high'],
                    { colour: 'White' },
                    { seating: 5, colour: 'Dark Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
        ],
        // Optional callback
        cb
        );
    }
    
    async.series([
        createHashedPasswords,
        createMakes,
        createModels,
        createLocations,
        createOwners,
        createEvs,
    ],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log(`CREATE DATABASE FINAL ERR: ${err}`);
        } else {
            // console.log(`EVs: ${evs}`);

            // All done, so close connection to database in case one was passed to this function
            if (mongooseConnection) {
                mongooseConnection.close();
            }
        }
    });
}

module.exports = createDatabaseItems;
