const assert = require('chai').assert;
const EV = require('../models/ev');
const Make = require('../models/make');
const Model = require('../models/model');
const Location = require('../models/location');
const Owner = require('../models/owner');

const tesla = new Make({
    name: "Tesla",
    test: 2,
});

const s70 = new Model({
    make: tesla,
    name: 'S',
    secondary_name: '70',
    performance: {
        horsepower: 500,
        miles_per_kwh: 3.5,
        top_speed_mph: 155,
        zero_to_sixty_mph: 2.3,
    },
    charging: {
        range_miles: 250,
        battery_size_kwh: 65,
        charge_cost: 5,
        hours_to_charge: 7,
    },
    rating: 4.75,
    test: 2,
});

const london = new Location({
    name: 'London',
    city: 'London',
    country: 'UK',
    test: 2,
});

const missTesla = new Owner({
    name: 'Miss Tesla',
    contact: 'miss.tesla@gmail.com',
    rating: 4.2,
    password: '12345678',
    test: 2,
});

const date = new Date;
const includedExtras = ['Insurance', 'Maintenance', 'MOT'];
const equipmentAndOptions = ['Air conditioning', 'Heated seats', 'Brake assist'];
const imageUrls = ['https://placeholder.com/image111', 'https://placeholder.com/image222']; 

const ev = new EV({
    make: tesla,
    model: s70,
    year: 2018,
    price_per_day: 50,
    deposit: 250,
    min_rental_period: '4 weeks',
    included_extras: includedExtras,
    mileage: 18000,
    location: london,
    image_urls: imageUrls,
    owner: missTesla,
    list_date: date,
    equipment_and_options: equipmentAndOptions,
    exterior: {
        body_style: 'Sedan',
        colour: 'Blue',
    },
    interior: {
        seating: 5,
        colour: 'Black',
    },
    vehicle_identification_number: '1M8GDM9AXKP042788',
    full_vehicle_inspection: true,
    pco_license: true,
    test: 2,
});

describe('EV model', () => {
    it('EV model exists', () => {
        assert.instanceOf(ev, EV, 'ev is instance of EV');
    });

    it('EV model has 18 properties', () => {
        assert.strictEqual(Object.keys(ev.schema.tree).length, 22, 'ev has 22 properties');
    });

    it('EV model has make', () => {
        assert.instanceOf(ev.make, Make, 'ev\'s make is instance of Make');
    });

    it('EV model has model', () => {
        assert.instanceOf(ev.model, Model, 'ev\'s model is instance of Model');
    });

    it('EV model has year', () => {
        assert.strictEqual(ev.year, 2018, 'ev\'s year is 2018');
    });

    it('EV model has price per day', () => {
        assert.strictEqual(ev.price_per_day, 50, 'ev\'s price per day is 50');
    });

    it('EV model has deposit', () => {
        assert.strictEqual(ev.deposit, 250, 'ev\'s deposit is 250');
    });

    it('EV model has min rental period', () => {
        assert.strictEqual(ev.min_rental_period, '4 weeks', 'ev\'s min rental period is 4 weeks');
    });

    it('has included extras array', () => {
        assert.instanceOf(ev.included_extras, Array, 'ev\'s included extras is an Array');
        assert.strictEqual(ev.included_extras.length, 3, 'ev\'s included extras has 3 items');
        ev.included_extras.forEach((extra, index) => {
            assert.strictEqual(extra, includedExtras[index], 
                    'ev\'s included extras is an array with Insurance, Maintenance and MOT');
        });
    });

    it('EV model has mileage', () => {
        assert.strictEqual(ev.mileage, 18000, 'ev\'s year is 18000');
    });

    it('EV model has location', () => {
        assert.instanceOf(ev.location, Location, 'ev\'s location is instance of Location');
    });

    it('has image urls array', () => {
        assert.instanceOf(ev.image_urls, Array, 'ev\'s image urls is an Array');
        assert.strictEqual(ev.image_urls.length, 2, 'ev\'s image urls has 2 items');
        ev.image_urls.forEach((url, index) => {
            assert.strictEqual(url, imageUrls[index], 
                    'ev\'s image urls is an array with https://placeholder.com/image111 and https://placeholder.com/image222');
        });
    });

    it('EV model has owner', () => {
        assert.instanceOf(ev.owner, Owner, 'ev\'s owner is instance of Owner');
    });

    it('EV model has list date', () => {
        assert.strictEqual(ev.list_date, date, `ev\'s list date is ${date}`);
    });

    it('has equipment and options array', () => {
        assert.instanceOf(ev.equipment_and_options, Array, 'ev\'s equipment and options is an Array');
        assert.strictEqual(ev.equipment_and_options.length, 3, 'ev\'s equipment and options has 3 items');
        ev.equipment_and_options.forEach((item, index) => {
            assert.strictEqual(item, equipmentAndOptions[index], 
                    'ev\'s equipment and options is an array with Air conditioning, Heated seats and Brake assist');
        });
    });

    it('has exterior object', () => {
        assert.instanceOf(ev.exterior, Object, 'ev\'s exterior is an object');
    });

    it('has exterior object with 2 children', () => {
        assert.strictEqual(Object.keys(ev.exterior).length, 2, 'ev\'s exterior has 2 children');
        assert.strictEqual(ev.exterior.body_style, 'Sedan', 'ev\'s body style is Sedan');
        assert.strictEqual(ev.exterior.colour, 'Blue', 'ev\'s exterior colour is Blue');    
    });

    it('has interior object with 2 children', () => {
        assert.instanceOf(ev.interior, Object, 'ev\'s interior is an object');
        assert.strictEqual(Object.keys(ev.interior).length, 2, 'ev\'s interior has 2 children');
        assert.strictEqual(ev.interior.seating, 5, 'ev\'s seating is 5');
        assert.strictEqual(ev.interior.colour, 'Black', 'ev\'s interior colour is Black');    
    });

    it('EV model has vehicle identification number', () => {
        assert.strictEqual(ev.vehicle_identification_number, '1M8GDM9AXKP042788', 
                'ev\'s vehicle identification number is 1M8GDM9AXKP042788');
    });

    it('EV model has full vehicle inspection', () => {
        assert.strictEqual(ev.full_vehicle_inspection, true, 'ev\'s full vehicle inspection is true');
    });

    it('EV model has pco license', () => {
        assert.strictEqual(ev.pco_license, true, 'ev\'s pco license is true');
    });

    it('EV model has url', () => {
        assert.strictEqual(ev.url, `/content/ev/${ev._id}`, `ev\'s url is /content/ev/${ev._id}`);
    });

    it('EV model doesn\'t have test property', () => {
        assert.notExists(ev.test, 'ev\'s test property is null or undefined');
    });
});

describe('Make model', () => {
    it('Make model exists', () => {
        assert.instanceOf(tesla, Make, 'tesla is instance of Make');
    });

    it('Make model has 5 properties', () => {
        assert.strictEqual(Object.keys(tesla.schema.tree).length, 5, 'tesla has 5 properties');
    });

    it('Make model has name', () => {
        assert.strictEqual(tesla.name, 'Tesla', 'tesla\'s make is Tesla');
    });

    it('Make model has url', () => {
        assert.strictEqual(tesla.url, `/content/make/${tesla._id}`, 
                `tesla\'s url is /content/make/${tesla._id}`);
    });

    it('Make model doesn\'t have test property', () => {
        assert.notExists(tesla.test, 'tesla\'s test property is null or undefined');
    });
});

describe('Model model', () => {
    it('Model model exists', () => {
        assert.instanceOf(s70, Model, 's70 is instance of Model');
    });

    it('Model model has 10 properties', () => {
        assert.strictEqual(Object.keys(s70.schema.tree).length, 10, 's70 has 10 properties');
    });

    it('Model model has make', () => {
        assert.instanceOf(s70.make, Make, 's70\'s make is instance of Make');
    });

    it('Model model has name', () => {
        assert.strictEqual(s70.name, 'S', 's70\'s name is S');
    });

    it('Model model has secondary name', () => {
        assert.strictEqual(s70.secondary_name, '70', 's70\'s secondary name is 70');
    });
    
    it('has performance object', () => {
        assert.instanceOf(s70.performance, Object, 's70\'s performance is an object');
    });

    it('has performance object with 4 children', () => {
        assert.strictEqual(Object.keys(s70.performance).length, 4, 's70\'s performance has 4 children');
        assert.strictEqual(s70.performance.horsepower, 500, 's70\'s horsepower is 500');
        assert.strictEqual(s70.performance.miles_per_kwh, 3.5, 's70\'s miles per kwh is 3.5');
        assert.strictEqual(s70.performance.top_speed_mph, 155, 's70\'s top speed mph is 155');
        assert.strictEqual(s70.performance.zero_to_sixty_mph, 2.3, 's70\'s 0-60mph is 2.3');
    
    });

    it('has charging object', () => {
        assert.instanceOf(s70.charging, Object, 's70\'s charging is an object');
    });

    it('has charging object with 4 children', () => {
        assert.strictEqual(Object.keys(s70.charging).length, 4, 's70\'s charging has 4 children');
        assert.strictEqual(s70.charging.range_miles, 250, 's70\'s range is 250');
        assert.strictEqual(s70.charging.battery_size_kwh, 65, 's70\'s battery size is 65');
        assert.strictEqual(s70.charging.charge_cost, 5, 's70\'s charge cost is 5');
        assert.strictEqual(s70.charging.hours_to_charge, 7, 's70\'s hours to charge is 7');
    
    });

    it('Model model has rating', () => {
        assert.strictEqual(s70.rating, 4.75, 's70\'s rating is 4.75');
    });

    it('Model model has url', () => {
        assert.strictEqual(s70.url, `/content/model/${s70._id}`, 
                `s70\'s url is /content/model/${s70._id}`);
    });

    it('Model model doesn\'t have test property', () => {
        assert.notExists(s70.test, 's70\'s test property is null or undefined');
    });
});

describe('Location model', () => {
    it('Location model exists', () => {
        assert.instanceOf(london, Location, 'london is instance of Location');
    });

    it('Location model has 6 properties', () => {
        assert.strictEqual(Object.keys(london.schema.tree).length, 6, 'london has 6 properties');
    });

    it('Location model has name', () => {
        assert.strictEqual(london.name, 'London', 'london\'s name is London');
    });

    it('Location model has city', () => {
        assert.strictEqual(london.city, 'London', 'london\'s city is London');
    });

    it('Location model has country', () => {
        assert.strictEqual(london.country, 'UK', 'london\'s country is UK');
    });

    it('Location model doesn\'t have test property', () => {
        assert.notExists(london.test, 'london\'s test property is null or undefined');
    });
});

describe('Owner model', () => {
    it('Owner model exists', () => {
        assert.instanceOf(missTesla, Owner, 'missTesla is instance of Owner');
    });

    it('Owner model has 7 properties', () => {
        assert.strictEqual(Object.keys(missTesla.schema.tree).length, 7, 'missTesla has 7 properties');
    });

    it('Owner model has name', () => {
        assert.strictEqual(missTesla.name, 'Miss Tesla', 'missTesla\'s name is Miss Tesla');
    });

    it('Owner model has contact', () => {
        assert.strictEqual(missTesla.contact, 'miss.tesla@gmail.com', 
                'missTesla\'s contact is miss.tesla@gmail.com');
    });

    it('Owner model has rating', () => {
        assert.strictEqual(missTesla.rating, 4.2, 'missTesla\'s rating is 4.2');
    });

    it('has password', () => {
        assert.strictEqual(missTesla.password, '12345678', 'missTesla\'s password is 12345678');
    });

    it('Owner model doesn\'t have test property', () => {
        assert.notExists(missTesla.test, 'missTesla\'s test property is null or undefined');
    });
});

// Testing model property validators
const evEmpty = new EV();
const makeEmpty = new Make();
const modelEmpty = new Model();
const locationEmpty = new Location();
const ownerEmpty = new Owner();

const evMinValidation = new EV({
    year: 1899,
    price_per_day: -1,
    deposit: -1,
    mileage: -1,
    interior: {
        seating: 0,
    },
    vehicle_identification_number: 'xxxxxxxxxxxxxxxx',
});

const evMaxValidation = new EV({
    year: date.getFullYear() + 1,
    vehicle_identification_number: 'xxxxxxxxxxxxxxxxxx',
});

const modelMinValidation = new Model({
    performance: {
        horsepower: -1,
        miles_per_kwh: -1,
        top_speed_mph: -1,
        zero_to_sixty_mph: -1,
    },
    charging: {
        range: -1,
        battery_size_kwh: -1,
        charge_cost: -1,
        hours_to_charge: -1,
    },
    rating: -1,
});

const modelMaxValidation = new Model({
    rating: 5.1,
});

const ownerMinValidation = new Owner({
    rating: -1,
    password: '1234567',
});

const ownerMaxValidation = new Owner({
    rating: 5.1,
});

describe('EV model validators are set', () => {
    it('EV model requires make', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors.make, 'ev\'s make is required');
        });
    });

    it('EV model requires model', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors.model, 'ev\'s model is required');
        });
    });

    it('EV model requires year', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors.year, 'ev\'s year is required');
        });
    });

    it('EV model\'s year isn\'t lower than 1900', () => {
        evMinValidation.validate((err) => {
            assert.exists(err.errors.year, 'ev\'s year isn\'t lower than 1900');
        });
    });

    it('EV model\'s year isn\'t greater than current year', () => {
        evMaxValidation.validate((err) => {
            assert.exists(err.errors.year, 'ev\'s year isn\'t greater than current year');
        });
    });

    it('EV model requires price per day', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors.price_per_day, 'ev\'s price per day is required');
        });
    });

    it('EV model\'s price per day isn\'t lower than 0', () => {
        evMinValidation.validate((err) => {
            assert.exists(err.errors.price_per_day, 'ev\'s price per day isn\'t lower than 0');
        });
    });

    it('EV model requires deposit', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors.deposit, 'ev\'s deposit is required');
        });
    });

    it('EV model\'s deposit isn\'t lower than 0', () => {
        evMinValidation.validate((err) => {
            assert.exists(err.errors.deposit, 'ev\'s deposit isn\'t lower than 0');
        });
    });

    it('EV model requires min rental period', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors.min_rental_period, 'ev\'s min rental period is required');
        });
    });

    it('EV model requires included extras', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors.included_extras, 'ev\'s included extras is required');
        });
    });

    it('EV model requires mileage', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors.mileage, 'ev\'s mileage is required');
        });
    });

    it('EV model\'s mileage isn\'t lower than 0', () => {
        evMinValidation.validate((err) => {
            assert.exists(err.errors.mileage, 'ev\'s mileage isn\'t lower than 0');
        });
    });

    it('EV model requires location', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors.location, 'ev\'s location is required');
        });
    });

    it('EV model requires image urls', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors.image_urls, 'ev\'s image urls is required');
        });
    });

    it('EV model requires owner', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors.owner, 'ev\'s owner is required');
        });
    });

    it('EV model requires list date', () => {
        evEmpty.validate((err) => {
            assert.notExists(err.errors.list_date, 'ev\'s list date has default value, so no error occurs');
        });
    });

    it('EV model requires equipment and options', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors.equipment_and_options, 'ev\'s equipment and options is required');
        });
    });

    it('EV model requires exterior\'s colour property', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors['exterior.colour'], 'ev\'s exterior colour is required');
        });
    });

    it('EV model doesn\'t requires exterior\'s body style property', () => {
        evEmpty.validate((err) => {
            assert.notExists(err.errors['exterior.body_style'], 'ev\'s body style isn\'t required');
        });
    });

    it('EV model requires interior\'s properties', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors['interior.seating'], 'ev\'s seating is required');
            assert.exists(err.errors['interior.colour'], 'ev\'s interior colour is required');
        });
    });

    it('EV model\'s seating isn\'t lower than 1', () => {
        evMinValidation.validate((err) => {
            assert.exists(err.errors['interior.seating'], 'ev\'s seating isn\'t lower than 1');
        });
    });

    it('EV model requires vehicle identification number', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors.vehicle_identification_number, 'ev\'s vehicle identification number is required');
        });
    });

    it('EV model\'s vehicle identification number has length of 17', () => {
        evMinValidation.validate((err) => {
            assert.exists(err.errors.vehicle_identification_number, 
                    'ev\'s vehicle identification number has length of 17');
        });
    });

    it('EV model\'s vehicle identification number has length of 17', () => {
        evMaxValidation.validate((err) => {
            assert.exists(err.errors.vehicle_identification_number, 
                    'ev\'s vehicle identification number has length of 17');
        });
    });

    it('EV model requires full vehicle inspection', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors.full_vehicle_inspection, 'ev\'s full vehicle inspection is required');
        });
    });

    it('EV model requires pco license', () => {
        evEmpty.validate((err) => {
            assert.exists(err.errors.pco_license, 'ev\'s pco license is required');
        });
    });
});

describe('Make model require validators are set', () => {
    it('Make model requires name', () => {
        makeEmpty.validate((err) => {
            assert.exists(err.errors.name, 'make model requires name');
        });
    });
});

describe('Model model require validators are set', () => {
    it('Model model requires make', () => {
        modelEmpty.validate((err) => {
            assert.exists(err.errors.make, 'model model requires make');
        });
    });

    it('Model model requires name', () => {
        modelEmpty.validate((err) => {
            assert.exists(err.errors.name, 'model model requires name');
        });
    });

    it('Model model doesn\'t require secondary name', () => {
        modelEmpty.validate((err) => {
            assert.notExists(err.errors.secondary_name, 'model model doesn\'t require secondary name');
        });
    });

    it('Model model requires performance\'s 3 properties', () => {
        modelEmpty.validate((err) => {
            assert.exists(err.errors['performance.horsepower'], 'model model requires horsepower');
            assert.exists(err.errors['performance.top_speed_mph'], 'model model requires top speed mph');
            assert.exists(err.errors['performance.zero_to_sixty_mph'], 'model model requires 0-60mph');
        });
    });

    it('Model model doesn\'t require performance\'s miles per kwh', () => {
        modelEmpty.validate((err) => {
            assert.notExists(err.errors['performance.miles_per_kwh'], 'model model doesn\'t require miles per kwh');
        });
    });

    it('Model model has horsepower with value greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors['performance.horsepower'], 'model model\'s horsepower is greater than 0');
        });
    });

    it('Model model has miles per kwh with value greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors['performance.miles_per_kwh'], 'model model\'s miles per kwh is greater than 0');
        });
    });

    it('Model model has top speed mph with value greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors['performance.top_speed_mph'], 'model model\'s top speed mph is greater than 0');
        });
    });

    it('Model model has 0-60mph with value greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors['performance.zero_to_sixty_mph'], 'model model\'s 0-60mph is greater than 0');
        });
    });

    it('Model model requires charging\'s 4 properties', () => {
        modelEmpty.validate((err) => {
            assert.exists(err.errors['charging.range_miles'], 'model model requires range');
            assert.exists(err.errors['charging.battery_size_kwh'], 'model model requires battery size');
            assert.exists(err.errors['charging.charge_cost'], 'model model requires charge cost');
            assert.exists(err.errors['charging.hours_to_charge'], 'model model requires hours to charge');
        });
    });

    it('Model model has range with value greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors['charging.range_miles'], 'model model\'s range is greater than 0');
        });
    });

    it('Model model has battery size with value greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors['charging.battery_size_kwh'], 'model model\'s battery size is greater than 0');
        });
    });

    it('Model model has charge cost with value greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors['charging.charge_cost'], 'model model\'s charge cost is greater than 0');
        });
    });

    it('Model model has hours to charge with value greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors['charging.hours_to_charge'], 'model model\'s hours to charge is greater than 0');
        });
    });

    it('Model model requires rating', () => {
        modelEmpty.validate((err) => {
            assert.exists(err.errors.rating, 'model model requires rating');
        });
    });

    it('Model model\'s rating is greater than 0', () => {
        modelMinValidation.validate((err) => {
            assert.exists(err.errors.rating, 'model model\'s rating is greater than 0');
        });
    });

    it('Model model\'s rating is less or equal to 5', () => {
        modelMaxValidation.validate((err) => {
            assert.exists(err.errors.rating, 'model model\'s rating is less or equal to 5');
        });
    });
});

describe('Location model require validators are set', () => {
    it('Location model requires name', () => {
        locationEmpty.validate((err) => {
            assert.exists(err.errors.name, 'location model requires name');
        });
    });

    it('Location model requires city', () => {
        locationEmpty.validate((err) => {
            assert.exists(err.errors.city, 'location model requires city');
        });
    });

    it('Location model requires country', () => {
        locationEmpty.validate((err) => {
            assert.exists(err.errors.country, 'location model requires country');
        });
    });
});

describe('Owner model require validators are set', () => {
    it('Owner model requires name', () => {
        ownerEmpty.validate((err) => {
            assert.exists(err.errors.name, 'owner model requires name');
        });
    });

    it('Owner model requires contact', () => {
        ownerEmpty.validate((err) => {
            assert.exists(err.errors.contact, 'owner model requires contact');
        });
    });

    it('Owner model requires rating', () => {
        ownerEmpty.validate((err) => {
            assert.exists(err.errors.rating, 'owner model requires rating');
        });
    });

    it('Owner model\'s rating is greater than 0', () => {
        ownerMinValidation.validate((err) => {
            assert.exists(err.errors.rating, 'owner model\'s rating is greater than 0');
        });
    });

    it('Owner model\'s rating is less or equal to 0', () => {
        ownerMaxValidation.validate((err) => {
            assert.exists(err.errors.rating, 'owner model\'s rating is less or equal to 0');
        });
    });

    it('Owner model requires password', () => {
        ownerEmpty.validate((err) => {
            assert.exists(err.errors.password, 'owner model requires password');
        });
    });

    it('Owner model\'s password has at least 8 characters', () => {
        ownerMinValidation.validate((err) => {
            assert.exists(err.errors.password, 'owner model\'s password has at least 8 characters');
        });
    });
});
