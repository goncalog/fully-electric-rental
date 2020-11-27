import applyFilters from '../../utils/applyFilters';

const state = {
    evs: [
        { _id: '78123', make: { _id: '67890', name: 'Tesla' }, price_per_day: 50, mileage: 70000, model: { charging: { range_miles: 300 }}, equipment_and_options: ['A/C', 'FSD'] },
        { _id: '12345', make: { _id: '67890', name: 'Tesla' }, price_per_day: 30, mileage: 70000, model: { charging: { range_miles: 300 }}, equipment_and_options: ['A/C', 'FSD'] },
        { _id: '23456', make: { _id: '67890', name: 'Tesla' }, price_per_day: 80, mileage: 70000, model: { charging: { range_miles: 300 }}, equipment_and_options: ['A/C', 'FSD'] },
        { _id: '91234', make: { _id: '67890', name: 'Tesla' }, price_per_day: 40, mileage: 20000, model: { charging: { range_miles: 300 }}, equipment_and_options: ['A/C', 'FSD'] },
        { _id: '89123', make: { _id: '67890', name: 'Tesla' }, price_per_day: 40, mileage: 120000, model: { charging: { range_miles: 300 }}, equipment_and_options: ['A/C', 'FSD'] },
        { _id: '78912', make: { _id: '67890', name: 'Tesla' }, price_per_day: 40, mileage: 70000, model: { charging: { range_miles: 100 }}, equipment_and_options: ['A/C', 'FSD'] },
        { _id: '68123', make: { _id: '67890', name: 'Tesla' }, price_per_day: 50, mileage: 70000, model: { charging: { range_miles: 500 }}, equipment_and_options: ['A/C', 'FSD'] },
        { _id: '68912', make: { _id: '67890', name: 'Tesla' }, price_per_day: 40, mileage: 70000, model: { charging: { range_miles: 200 }}, equipment_and_options: ['A/C'] },
        { _id: '34567', make: { _id: '678901', name: 'Renault' }, price_per_day: 40, mileage: 120000, model: { charging: { range_miles: 300 }}, equipment_and_options: ['A/C', 'FSD'] },
        { _id: '45678', make: { _id: '678902', name: 'Nissan' }, price_per_day: 40, mileage: 120000, model: { charging: { range_miles: 300 }}, equipment_and_options: ['A/C', 'FSD'] },
        { _id: '56789', make: { _id: '678903', name: 'Jaguar' }, price_per_day: 45, mileage: 60000, model: { charging: { range_miles: 200 }}, equipment_and_options: ['FSD'] },
    ],
    make: { 
        options: [
            { _id: '67890', name: 'Tesla', checked: true },
            { _id: '678901', name: 'Renault', checked: false },
            { _id: '678902', name: 'Nissan', checked: false },
            { _id: '678903', name: 'Jaguar', checked: true },
        ]
    },
    price: { min: '35', max: '60' },
    mileage: { min: '25000', max: '80000' },
    range: { min: '150', max: '400' },
    extras: { options: [{ name: 'FSD', checked: true }] },
};

const filteredEvs =  [
    { _id: '78123', make: { _id: '67890', name: 'Tesla' }, price_per_day: 50, mileage: 70000, model: { charging: { range_miles: 300 }}, equipment_and_options: ['A/C', 'FSD'] },
    { _id: '56789', make: { _id: '678903', name: 'Jaguar' }, price_per_day: 45, mileage: 60000, model: { charging: { range_miles: 200 }}, equipment_and_options: ['FSD'] },
];

describe('applyFilters', () => {
    it('returns filtered EVs correctly', () => {
        expect(applyFilters(state)).toEqual(filteredEvs);
    });
});
