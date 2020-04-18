(function exportController() {
    function Controller(ship) {
    this.ship = ship
    
    this.initialiseSea();
    this.HUD();

    document.querySelector('#sailbutton').addEventListener('click', () => {
        this.setSail();
    });
}

Controller.prototype = { 
    initialiseSea() {
    const backgrounds = [
        './images/water0.png',
        './images/water1.png',
    ];
    let backgroundIndex = 0;
    window.setInterval(() => {
        document.querySelector("#viewport").style.backgroundImage = `url('${backgrounds[backgroundIndex % backgrounds.length]}')`;
        backgroundIndex += 1;
    }, 1000);
},
   
    renderPorts(ports) {
        const portsElement = document.querySelector('#ports');
        portsElement.style.width = '0px';

        ports.forEach((port, index) => {
            const newPortElement = document.createElement('div');
                
//next 2 lines give each new port a portName and portIndex attribute
                newPortElement.dataset.portName = port.name;
                newPortElement.dataset.portIndex = index
                newPortElement.className = 'port';

                portsElement.appendChild(newPortElement); 
//adds 256px to div when each new port element is appended
            const portsElementWidth = parseInt(portsElement.style.width, 10);
                portsElement.style.width = `${portsElementWidth + 256}px`;
          });
        },
    renderShip() {
        const ship = this.ship;

        const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const portElement = document.querySelector(`[data-port-index='${shipPortIndex}']`);

        const shipElement = document.querySelector('#ship');
        shipElement.style.top = `${portElement.offsetTop + 32}px`;
        shipElement.style.left = `${portElement.offsetLeft -32}px`;
    },
    setSail() {
        const ship = this.ship

        const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const nextPortIndex = currentPortIndex + 1;
        const nextPortElement = document.querySelector(`[data-port-index='${nextPortIndex}']`);
            if (!nextPortElement) {
                return this.renderMessage('You have reached the end of the line!')
            }
            this.renderMessage(`Now departing ${ship.currentPort.name}`);
            ship.setSail();

        const shipElement = document.querySelector('#ship');
        const sailInterval = setInterval(() => {
            const shipLeft = parseInt(shipElement.style.left, 10);
            if (shipLeft === (nextPortElement.offsetLeft - 32)) {
                ship.dock();
                this.renderMessage(`Now arriving at ${ship.currentPort.name}`);
                this.HUD();
                clearInterval(sailInterval);
            };

                shipElement.style.left = `${shipLeft + 1}px`;
        }, 20);

    },
    renderMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.id = 'message';
        messageElement.innerHTML = message;

        const viewport = document.querySelector('#viewport');
        viewport.appendChild(messageElement);

        setTimeout(() => {
            viewport.removeChild(messageElement);
        }, 2000);
    },
    HUD() {
        const ship = this.ship;
        const currentPortElement = document.getElementById("currentPort");
        if (ship.currentPort !== undefined) {
            currentPortElement.textContent = `Current Port: ${ship.currentPort.name}`;
        }
        const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const nextPortIndex = currentPortIndex + 1
        const nextPortElement = document.getElementById("nextPort");
        const nextPort = ship.itinerary.ports[nextPortIndex];
        if(nextPort !== undefined) {
            nextPortElement.textContent = `Next Port: ${nextPort.name}`; 
        } else { nextPortElement.textContent = `This is the final Port`}
        
    }

};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Controller;
} else {
    window.Controller = Controller;
}
}());