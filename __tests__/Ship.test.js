const Ship = require('../src/Ship.js');

describe('Ship', () => {
    let dover;
    let rotterdam;
    let itinerary;
    let ship;
    beforeEach(() => {
        const port = {
            removeShip: jest.fn(),
            addShip: jest.fn(),
        };
        dover = {
            ...port,
            name:'Dover',
            ships: []
        };
        rotterdam = {
            ...port,
            name: rotterdam,
            ships: []
        };
       itinerary = {ports: [dover, rotterdam]};
       
        ship = new Ship(itinerary);
    });

    it('can be instantiated', () => {
        expect(ship).toBeInstanceOf(Object);
    });
    
    it('sets the a starting port property', () => {
        expect(ship.currentPort).toBe(dover);
    });

    it('can set sail', () => {
        ship.setSail();

        expect(ship.currentPort).toBeFalsy();
        expect(ship.previousPort).toBe(dover);
        expect(dover.removeShip).toHaveBeenCalledWith(ship);
    });
   
    it('can dock at different ports', () =>{
        
        ship.setSail();
        ship.dock();

            expect(ship.currentPort).toBe(rotterdam);
            expect(rotterdam.addShip).toHaveBeenCalledWith(ship);
        });
   
    it('can\'t sail further than its itinerary', () => {
        ship.setSail();
        ship.dock();
      
        expect(() => ship.setSail()).toThrowError('End of itinerary reached');
      });

      it('gets added to port on instantiation', () => {
        expect(dover.addShip).toHaveBeenCalledWith(ship);
      })
});

