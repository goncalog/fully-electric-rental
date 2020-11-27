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
                modelCreate(makes[0], 'Model 3', false,
                { horsepower: 300, miles_per_kwh: 4, top_speed_mph: 130, zero_to_sixty_mph: 3.9 },
                { range_miles: 240, battery_size_kwh: 60, charge_cost: 7, hours_to_charge: 6 },
                4.6, callback);
            },
            function (callback) {
                modelCreate(makes[1], 'Leaf', false, 
                { horsepower: 200, miles_per_kwh: 3, top_speed_mph: 100, zero_to_sixty_mph: 8.2 },
                { range_miles: 120, battery_size_kwh: 40, charge_cost: 5, hours_to_charge: 5 },
                4.5, callback);
            },
            function (callback) {
                modelCreate(makes[2], 'Zoe', false, 
                { horsepower: 200, miles_per_kwh: 3, top_speed_mph: 100, zero_to_sixty_mph: 8.2 },
                { range_miles: 120, battery_size_kwh: 40, charge_cost: 5, hours_to_charge: 5 },
                4.7, callback);
            },
            function (callback) {
                modelCreate(makes[3], 'Kona', false, 
                { horsepower: 200, miles_per_kwh: 3, top_speed_mph: 100, zero_to_sixty_mph: 8.2 },
                { range_miles: 120, battery_size_kwh: 40, charge_cost: 5, hours_to_charge: 5 },
                4.5, callback);
            },
            function (callback) {
                modelCreate(makes[4], 'e-Niro', false, 
                { horsepower: 200, miles_per_kwh: 3, top_speed_mph: 100, zero_to_sixty_mph: 8.2 },
                { range_miles: 120, battery_size_kwh: 40, charge_cost: 5, hours_to_charge: 5 },
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
                { horsepower: 300, miles_per_kwh: 4, top_speed_mph: 130, zero_to_sixty_mph: 3.9 },
                { range_miles: 240, battery_size_kwh: 60, charge_cost: 7, hours_to_charge: 6 },
                4.6, callback);
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
                ownerCreate('Emily P.', process.env.CONTACT_EMAIL, 5, hashedPasswords[0], callback);
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
                    makes[0], 
                    models[0], 
                    2018, 
                    43,
                    250,
                    '4 weeks',
                    ['Insurance', 'Maintenance', 'MOT'],
                    24550,
                    locations[0],
                    ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.7-d1rVTq_5plECVY8Pm47gHaE8%26pid%3DApi&f=1', 
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FL7pk4vKDg0A%2Fmaxresdefault.jpg&f=1&nofb=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.astonmartinwashingtondc.com%2Fimagetag%2F1544%2F7%2Fl%2FUsed-2016-Tesla-Model-S-P100D.jpg&f=1&nofb=1'],
                    owners[0],
                    currentDate,
                    ['Air conditioning', 'Brake assistance', 'Traction control', 'Speed control'],
                    { colour: 'Black' },
                    { seating: 5, colour: 'Black' },
                    'XXXXXXXXXXXXXXXXX',
                    true,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[1], 
                    models[2], 
                    2017, 
                    24,
                    250,
                    '4 weeks',
                    ['Insurance', 'Maintenance', 'MOT'],
                    34550,
                    locations[1],
                    ['https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.hgmsites.net%2Fhug%2F2016-nissan-leaf_100527043_h.jpg&f=1&nofb=1', 
                            'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fi.evbud.com%2Fb4%2F4818.jpg&f=1&nofb=1', 
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fusedcars.nissan.co.uk%2Fpicserver1%2Fuserdata%2F46%2F501376%2FYhfTBoblFrovo%2Fxxl_kfz893185_dsc04178.jpg&f=1&nofb=1'],
                    owners[0],
                    currentDate,
                    ['Air conditioning', 'Brake assistance', 'Traction control', 'Speed control'],
                    { colour: 'Blue' },
                    { seating: 5, colour: 'Black' },
                    'XXXXXXXXXXXXXXXXX',
                    true,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[2], 
                    models[3], 
                    2016, 
                    17,
                    250,
                    '4 weeks',
                    ['Insurance', 'Maintenance', 'MOT'],
                    54500,
                    locations[2],
                    ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.cdn.autocar.co.uk%2Fsites%2Fautocar.co.uk%2Ffiles%2Fstyles%2Fgallery_slide%2Fpublic%2Frenault-zoe.jpg%3Fitok%3DpnEKK1ba&f=1&nofb=1',
                            'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wintonsworld.com%2Fwp-content%2Fuploads%2F2017%2F08%2FRenault-Zoe_01.jpg&f=1&nofb=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcar-images.bauersecure.com%2Fpagefiles%2F32662%2Fzrenaultzoe-100.jpg&f=1&nofb=1'],
                    owners[0],
                    currentDate,
                    ['Air conditioning', 'Brake assistance', 'Traction control', 'Speed control'],
                    { colour: 'Red' },
                    { seating: 5, colour: 'Beige' },
                    'XXXXXXXXXXXXXXXXX',
                    true,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[3], 
                    models[4], 
                    2019, 
                    37.5,
                    250,
                    '4 weeks',
                    ['Insurance', 'Maintenance', 'MOT'],
                    34500,
                    locations[3],
                    ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Ff%2Ff9%2F2018_Hyundai_Kona_SE_1.0.jpg%2F1200px-2018_Hyundai_Kona_SE_1.0.jpg&f=1&nofb=1', 
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcarwow-uk-wp-3.imgix.net%2F2018-hyundai-kona-review-4.jpg&f=1&nofb=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fst.automobilemag.com%2Fuploads%2Fsites%2F11%2F2017%2F06%2F2018-Hyundai-Kona-proving-grounds-15.jpg&f=1&nofb=1'],
                    owners[0],
                    currentDate,
                    ['Air conditioning', 'Brake assistance', 'Traction control', 'Speed control'],
                    { colour: 'Black' },
                    { seating: 5, colour: 'Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    true,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[4], 
                    models[5], 
                    2019, 
                    23.5,
                    250,
                    '4 weeks',
                    ['Insurance', 'Maintenance', 'MOT'],
                    14500,
                    locations[4],
                    ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.drivingelectric.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Farticle_image_desktop%2Fpublic%2F2018-11%2F2kiae-niro.jpg%3Fh%3Dc3635fa2%26itok%3DhuFgMWcL&f=1&nofb=1', 
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblogmedia.dealerfire.com%2Fwp-content%2Fuploads%2Fsites%2F445%2F2018%2F10%2FRear-View-of-White-2019-Kia-Niro-EV_o.jpg&f=1&nofb=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.autocar.co.uk%2Fsites%2Fautocar.co.uk%2Ffiles%2Fstyles%2Fgallery_slide%2Fpublic%2Fimages%2Fcar-reviews%2Ffirst-drives%2Flegacy%2F2-kia-niro-ev-2019-fd-otr-left_0.jpg%3Fitok%3Dn0vgcLPF&f=1&nofb=1'],
                    owners[0],
                    currentDate,
                    ['Air conditioning', 'Brake assistance', 'Traction control', 'Speed control'],
                    { colour: 'White' },
                    { seating: 5, colour: 'Black' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[5], 
                    models[6], 
                    2018, 
                    13.5,
                    250,
                    '4 weeks',
                    ['Insurance', 'Maintenance', 'MOT'],
                    34500,
                    locations[5],
                    ['https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.telegraph.co.uk%2Fcars%2Fimages%2F2017%2F06%2F20%2FTELEMMGLPICT000130092501-xlarge_trans_NvBQzQNjv4BqJQuPXpcEMOatKkwW02PS65oSssFO5HHodOf-e6p-uYU.jpeg&f=1&nofb=1',
                            'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.thetruthaboutcars.com%2Fwp-content%2Fuploads%2F2015%2F03%2F2015-Volkswagen-Golf-TDI-white.jpg&f=1&nofb=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.autocar.co.uk%2Fsites%2Fautocar.co.uk%2Ffiles%2Fstyles%2Fgallery_slide%2Fpublic%2Fvolkswagen-e-golf-dashboard.jpg%3Fitok%3Dt4Ez5nkV&f=1&nofb=1'],
                    owners[0],
                    currentDate,
                    ['Air conditioning', 'Brake assistance', 'Traction control', 'Speed control'],
                    { colour: 'White' },
                    { seating: 5, colour: 'Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    true,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[6], 
                    models[7], 
                    2015, 
                    30.5,
                    250,
                    '4 weeks',
                    ['Insurance', 'Maintenance', 'MOT'],
                    66000,
                    locations[6],
                    ['https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.cdn.autocar.co.uk%2Fsites%2Fautocar.co.uk%2Ffiles%2Fstyles%2Fgallery_slide%2Fpublic%2FBMWi3-Stan_30125.jpg%3Fitok%3DqRtk_UkH&f=1&nofb=1',
                            'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.thecarconnection.com%2Flrg%2F2014-bmw-i3-leaked_100434427_l.jpg&f=1&nofb=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcarwow-uk-wp-3.imgix.net%2Fbmw-i3-interior-dashboard-uk.jpg&f=1&nofb=1'],
                    owners[0],
                    currentDate,
                    ['Air conditioning', 'Brake assistance', 'Traction control', 'Speed control'],
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
                    makes[7], 
                    models[8], 
                    2018, 
                    38.5,
                    250,
                    '4 weeks',
                    ['Insurance', 'Maintenance', 'MOT'],
                    12400,
                    locations[7],
                    ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fssl.caranddriving.com%2Ff2%2Fimages%2Fnew%2Fbig%2Faudietron0819(2).jpg&f=1&nofb=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fweb21st.imgix.net%2Fassets%2Fimages%2Fnew-vehicles%2Faudi%2Faudi-e-tron-2019-launch-edition-brilliant-black.png&f=1&nofb=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fautocarmalaysia.com%2Fwp-content%2Fuploads%2F2019%2F04%2FAudi_e-tron_55quattro-3a.jpg&f=1&nofb=1'],
                    owners[0],
                    currentDate,
                    ['Air conditioning', 'Brake assistance', 'Traction control', 'Speed control'],
                    { colour: 'Black' },
                    { seating: 5, colour: 'Black' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[8], 
                    models[9], 
                    2020, 
                    58,
                    250,
                    '4 weeks',
                    ['Insurance', 'Maintenance', 'MOT'],
                    22700,
                    locations[8],
                    ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.autoexpress.co.uk%2Fimage%2Fprivate%2Fs--Wzb4sPbF--%2Fv1565018660%2Fautoexpress%2F2019%2F08%2F01_2.jpg&f=1&nofb=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Rk5iGrnkyTN4m1SbGM7V4AHaEK%26pid%3DApi&f=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.carmagazine.co.uk%2FImages%2FPageFiles%2F87936%2FMercedes_EQC_005.jpg&f=1&nofb=1'],
                    owners[0],
                    currentDate,
                    ['Air conditioning', 'Brake assistance', 'Traction control', 'Speed control'],
                    { colour: 'White' },
                    { seating: 5, colour: 'Black' },
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
                    2019, 
                    55,
                    250,
                    '4 weeks',
                    ['Insurance', 'Maintenance', 'MOT'],
                    32700,
                    locations[9],
                    ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F3%2F37%2F2018_Jaguar_I-Pace_EV400_AWD_Front.jpg%2F1200px-2018_Jaguar_I-Pace_EV400_AWD_Front.jpg&f=1&nofb=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.7znu4mm63naud-U_r6DqkAHaEK%26pid%3DApi&f=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.arstechnica.net%2Fwp-content%2Fuploads%2F2018%2F06%2FJaguar-I-Pace-34-980x735.jpg&f=1&nofb=1'],
                    owners[0],
                    currentDate,
                    ['Air conditioning', 'Brake assistance', 'Traction control', 'Speed control'],
                    { colour: 'White' },
                    { seating: 5, colour: 'Black' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[10], 
                    models[11], 
                    2020, 
                    52,
                    250,
                    '4 weeks',
                    ['Insurance', 'Maintenance', 'MOT'],
                    8700,
                    locations[10],
                    ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F9to5google.com%2Fwp-content%2Fuploads%2Fsites%2F4%2F2019%2F02%2Fpolestar_2_1.jpg%3Fquality%3D82%26strip%3Dall&f=1&nofb=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.autocar.co.uk%2Fsites%2Fautocar.co.uk%2Ffiles%2Fimages%2Fcar-reviews%2Ffirst-drives%2Flegacy%2F99-polestar-2-prototype-feature-2020-hero-front.jpg&f=1&nofb=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q0e5O723K8Wq12ored2uWgHaE5%26pid%3DApi&f=1'],
                    owners[0],
                    currentDate,
                    ['Air conditioning', 'Brake assistance', 'Traction control', 'Speed control'],
                    { colour: 'Dark Grey' },
                    { seating: 5, colour: 'Black' },
                    'XXXXXXXXXXXXXXXXX',
                    false,
                    true,
                    callback
                );
            },
            function (callback) {
                evCreate(
                    makes[11], 
                    models[12], 
                    2019, 
                    28.8,
                    250,
                    '4 weeks',
                    ['Insurance', 'Maintenance', 'MOT'],
                    48705,
                    locations[11],
                    ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.iJnLtTabyraAS5eG4XgT2AHaFj%26pid%3DApi&f=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fquickcarreview.com%2Fwp-content%2Fuploads%2F2019%2F10%2F2019_Peugeot_208_e-208_Test_IMG_0768.jpg&f=1&nofb=1',
                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fapi-cdn2.stoneacremotorgroup.co.uk%2F7350136%2Fpeugeot-e-208-gt-100kw-gt-50kwh-5dr-auto-yc69yud-24.jpg&f=1&nofb=1'],
                    owners[0],
                    currentDate,
                    ['Air conditioning', 'Brake assistance', 'Traction control', 'Speed control'],
                    { colour: 'Blue' },
                    { seating: 5, colour: 'Dark Grey' },
                    'XXXXXXXXXXXXXXXXX',
                    true,
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
