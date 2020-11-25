import getFullEvTitle from '../../utils/getFullEvTitle';

describe('getFullEvTitle', () => {
    it('returns right EV title when there is a secondary Model name', () => {
        expect(getFullEvTitle({ make: { name: 'Audi' }, 
                model: { name: 'e-Tron', secondary_name: '55' } })).toEqual('Audi e-Tron 55');

        expect(getFullEvTitle({ make: { name: 'Renault' }, 
                model: { name: 'Zoe', secondary_name: '100KW i Iconic R135 50KWh 5dr' } }))
            .toEqual('Renault Zoe 100KW i Iconic R135 50KWh 5dr');

        expect(getFullEvTitle({ make: { name: 'Renault' }, 
                model: { name: 'Zoe', secondary_name: '80KW i Iconic R110 50KWh Rapid Charge 5dr' } }))
            .toEqual('Renault Zoe 80KW i Iconic R110 50KWh Rapid Charge 5dr');
    });

    it('returns right EV title when there isn\'t a secondary Model name', () => {
        expect(getFullEvTitle({ make: { name: 'Nissan' }, model: { name: 'Leaf' } }))
            .toEqual('Nissan Leaf');

        expect(getFullEvTitle({ make: { name: 'Tesla' }, model: { name: 'Model 3' } }))
            .toEqual('Tesla Model 3');

        expect(getFullEvTitle({ make: { name: 'Jaguar' }, model: { name: 'I-Pace' } }))
            .toEqual('Jaguar I-Pace');        
    }); 
});
