const Port = require('../src/Port.js');

describe('Port', () => {
   let port
    beforeEach(() => {
        port = new Port('Dover');
   });
    it('can be instantiated', () => {
        expect(new Port()).toBeInstanceOf(Object);
    });
    it('has a name property', () => {
        expect(port.name).toBe('Dover');
    });
    it('can add a ship', () => {
        const ship = jest.fn();

        port.addShip(ship);
        expect(port.ships).toContain(ship);
    });
    it('can remove a ship', () => {
        const titanic = jest.fn();
        const queenMary = jest.fn();

        port.addShip(titanic);
        port.addShip(queenMary);
        port.removeShip(queenMary);

        expect(port.ships).toEqual([titanic]);
    })
})