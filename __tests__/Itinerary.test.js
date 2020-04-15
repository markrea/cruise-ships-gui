const Itinerary = require('../src/Itinerary.js');

describe('Itinerary', () => {
    it('can be instantiated', () => {
        expect(new Itinerary()).toBeInstanceOf(Object);
    });
    it('can have ports', () => {
       const dover = jest.fn('Dover');
       const rotterdam = jest.fn('Rotterdam')
       
        const itinerary = new Itinerary([dover, rotterdam])

        expect(itinerary.ports).toEqual([dover, rotterdam]);
    })
    
})