import applySort from '../../utils/applySort';

const filteredEvs = [
    { _id: '78123', make: { _id: '67890', name: 'Tesla' }, price: 60000, mileage: 72000, model: { charging: { range_miles: 200 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '12345', make: { _id: '67890', name: 'Tesla' }, price: 30000, mileage: 70000, model: { charging: { range_miles: 300 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '23456', make: { _id: '67890', name: 'Tesla' }, price: 80000, mileage: 76000, model: { charging: { range_miles: 400 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '91234', make: { _id: '67890', name: 'Tesla' }, price: 42000, mileage: 20000, model: { charging: { range_miles: 350 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '89123', make: { _id: '67890', name: 'Tesla' }, price: 41000, mileage: 121000, model: { charging: { range_miles: 320 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '78912', make: { _id: '67890', name: 'Tesla' }, price: 44000, mileage: 77000, model: { charging: { range_miles: 100 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '68123', make: { _id: '67890', name: 'Tesla' }, price: 50000, mileage: 71000, model: { charging: { range_miles: 500 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '68912', make: { _id: '67890', name: 'Tesla' }, price: 43000, mileage: 75000, model: { charging: { range_miles: 250 }}, equipment_and_options: ['A/C'] },
    { _id: '34567', make: { _id: '678901', name: 'Renault' }, price: 49000, mileage: 120000, model: { charging: { range_miles: 600 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '45678', make: { _id: '678902', name: 'Nissan' }, price: 48000, mileage: 125000, model: { charging: { range_miles: 340 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '56789', make: { _id: '678903', name: 'Jaguar' }, price: 46000, mileage: 60000, model: { charging: { range_miles: 210 }}, equipment_and_options: ['FSD'] },
];

const lowestPrice = {
    options: [
        { name: 'Lowest Price', checked: true },
        { name: 'Highest Price', checked: false }, 
        { name: 'Lowest Mileage', checked: false }, 
        { name: 'Highest Range', checked: false }, 
    ]
};

const lowestPriceSorted = [
    { _id: '12345', make: { _id: '67890', name: 'Tesla' }, price: 30000, mileage: 70000, model: { charging: { range_miles: 300 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '89123', make: { _id: '67890', name: 'Tesla' }, price: 41000, mileage: 121000, model: { charging: { range_miles: 320 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '91234', make: { _id: '67890', name: 'Tesla' }, price: 42000, mileage: 20000, model: { charging: { range_miles: 350 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '68912', make: { _id: '67890', name: 'Tesla' }, price: 43000, mileage: 75000, model: { charging: { range_miles: 250 }}, equipment_and_options: ['A/C'] },
    { _id: '78912', make: { _id: '67890', name: 'Tesla' }, price: 44000, mileage: 77000, model: { charging: { range_miles: 100 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '56789', make: { _id: '678903', name: 'Jaguar' }, price: 46000, mileage: 60000, model: { charging: { range_miles: 210 }}, equipment_and_options: ['FSD'] },
    { _id: '45678', make: { _id: '678902', name: 'Nissan' }, price: 48000, mileage: 125000, model: { charging: { range_miles: 340 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '34567', make: { _id: '678901', name: 'Renault' }, price: 49000, mileage: 120000, model: { charging: { range_miles: 600 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '68123', make: { _id: '67890', name: 'Tesla' }, price: 50000, mileage: 71000, model: { charging: { range_miles: 500 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '78123', make: { _id: '67890', name: 'Tesla' }, price: 60000, mileage: 72000, model: { charging: { range_miles: 200 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '23456', make: { _id: '67890', name: 'Tesla' }, price: 80000, mileage: 76000, model: { charging: { range_miles: 400 }}, equipment_and_options: ['A/C', 'FSD'] },
];

const highestPrice = {
    options: [
        { name: 'Lowest Price', checked: false },
        { name: 'Highest Price', checked: true }, 
        { name: 'Lowest Mileage', checked: false }, 
        { name: 'Highest Range', checked: false }, 
    ]
};

const highestPriceSorted = [
    { _id: '23456', make: { _id: '67890', name: 'Tesla' }, price: 80000, mileage: 76000, model: { charging: { range_miles: 400 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '78123', make: { _id: '67890', name: 'Tesla' }, price: 60000, mileage: 72000, model: { charging: { range_miles: 200 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '68123', make: { _id: '67890', name: 'Tesla' }, price: 50000, mileage: 71000, model: { charging: { range_miles: 500 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '34567', make: { _id: '678901', name: 'Renault' }, price: 49000, mileage: 120000, model: { charging: { range_miles: 600 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '45678', make: { _id: '678902', name: 'Nissan' }, price: 48000, mileage: 125000, model: { charging: { range_miles: 340 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '56789', make: { _id: '678903', name: 'Jaguar' }, price: 46000, mileage: 60000, model: { charging: { range_miles: 210 }}, equipment_and_options: ['FSD'] },
    { _id: '78912', make: { _id: '67890', name: 'Tesla' }, price: 44000, mileage: 77000, model: { charging: { range_miles: 100 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '68912', make: { _id: '67890', name: 'Tesla' }, price: 43000, mileage: 75000, model: { charging: { range_miles: 250 }}, equipment_and_options: ['A/C'] },
    { _id: '91234', make: { _id: '67890', name: 'Tesla' }, price: 42000, mileage: 20000, model: { charging: { range_miles: 350 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '89123', make: { _id: '67890', name: 'Tesla' }, price: 41000, mileage: 121000, model: { charging: { range_miles: 320 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '12345', make: { _id: '67890', name: 'Tesla' }, price: 30000, mileage: 70000, model: { charging: { range_miles: 300 }}, equipment_and_options: ['A/C', 'FSD'] },
];

const lowestMileage = {
    options: [
        { name: 'Lowest Price', checked: false },
        { name: 'Highest Price', checked: false  }, 
        { name: 'Lowest Mileage', checked: true  }, 
        { name: 'Highest Range', checked: false  }, 
    ]
};

const lowestMileageSorted = [
    { _id: '91234', make: { _id: '67890', name: 'Tesla' }, price: 42000, mileage: 20000, model: { charging: { range_miles: 350 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '56789', make: { _id: '678903', name: 'Jaguar' }, price: 46000, mileage: 60000, model: { charging: { range_miles: 210 }}, equipment_and_options: ['FSD'] },
    { _id: '12345', make: { _id: '67890', name: 'Tesla' }, price: 30000, mileage: 70000, model: { charging: { range_miles: 300 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '68123', make: { _id: '67890', name: 'Tesla' }, price: 50000, mileage: 71000, model: { charging: { range_miles: 500 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '78123', make: { _id: '67890', name: 'Tesla' }, price: 60000, mileage: 72000, model: { charging: { range_miles: 200 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '68912', make: { _id: '67890', name: 'Tesla' }, price: 43000, mileage: 75000, model: { charging: { range_miles: 250 }}, equipment_and_options: ['A/C'] },
    { _id: '23456', make: { _id: '67890', name: 'Tesla' }, price: 80000, mileage: 76000, model: { charging: { range_miles: 400 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '78912', make: { _id: '67890', name: 'Tesla' }, price: 44000, mileage: 77000, model: { charging: { range_miles: 100 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '34567', make: { _id: '678901', name: 'Renault' }, price: 49000, mileage: 120000, model: { charging: { range_miles: 600 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '89123', make: { _id: '67890', name: 'Tesla' }, price: 41000, mileage: 121000, model: { charging: { range_miles: 320 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '45678', make: { _id: '678902', name: 'Nissan' }, price: 48000, mileage: 125000, model: { charging: { range_miles: 340 }}, equipment_and_options: ['A/C', 'FSD'] },
];

const highestRange = {
    options: [
        { name: 'Lowest Price', checked: false },
        { name: 'Highest Price', checked: false  }, 
        { name: 'Lowest Mileage', checked: false  }, 
        { name: 'Highest Range', checked: true  }, 
    ]
};

const highestRangeSorted = [
    { _id: '34567', make: { _id: '678901', name: 'Renault' }, price: 49000, mileage: 120000, model: { charging: { range_miles: 600 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '68123', make: { _id: '67890', name: 'Tesla' }, price: 50000, mileage: 71000, model: { charging: { range_miles: 500 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '23456', make: { _id: '67890', name: 'Tesla' }, price: 80000, mileage: 76000, model: { charging: { range_miles: 400 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '91234', make: { _id: '67890', name: 'Tesla' }, price: 42000, mileage: 20000, model: { charging: { range_miles: 350 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '45678', make: { _id: '678902', name: 'Nissan' }, price: 48000, mileage: 125000, model: { charging: { range_miles: 340 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '89123', make: { _id: '67890', name: 'Tesla' }, price: 41000, mileage: 121000, model: { charging: { range_miles: 320 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '12345', make: { _id: '67890', name: 'Tesla' }, price: 30000, mileage: 70000, model: { charging: { range_miles: 300 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '68912', make: { _id: '67890', name: 'Tesla' }, price: 43000, mileage: 75000, model: { charging: { range_miles: 250 }}, equipment_and_options: ['A/C'] },
    { _id: '56789', make: { _id: '678903', name: 'Jaguar' }, price: 46000, mileage: 60000, model: { charging: { range_miles: 210 }}, equipment_and_options: ['FSD'] },
    { _id: '78123', make: { _id: '67890', name: 'Tesla' }, price: 60000, mileage: 72000, model: { charging: { range_miles: 200 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '78912', make: { _id: '67890', name: 'Tesla' }, price: 44000, mileage: 77000, model: { charging: { range_miles: 100 }}, equipment_and_options: ['A/C', 'FSD'] },
];

describe('applySort', () => {
    it('returns EVs correctly sorted', () => {
        expect(applySort(filteredEvs, lowestPrice)).toEqual(lowestPriceSorted);
        expect(applySort(filteredEvs, highestPrice)).toEqual(highestPriceSorted);
        expect(applySort(filteredEvs, lowestMileage)).toEqual(lowestMileageSorted);
        expect(applySort(filteredEvs, highestRange)).toEqual(highestRangeSorted);
    });
});
