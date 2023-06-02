const BandList = require("./band-list");

class Sockets {

    constructor(io){
        this.io = io;
        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents(){
        // on connection
        this.io.on('connection', ( socket ) => { 
        
            console.log('Client connected');

            // emitir al cliente conectado todas las bandas actuales

            socket.emit('current-bandList', this.bandList.getBands());

            // escuchar al cliente conectado
            socket.on('vote-band', ( id ) => {
                this.bandList.increaseVotes(id);
                this.io.emit('current-bandList', this.bandList.getBands());
            } )

            socket.on('delete-band', (id) => {
                this.bandList.removeBand(id);
                this.io.emit('current-bandList', this.bandList.getBands());
            })

            socket.on('update-band', ({id, name}) => {
                this.bandList.changeName(id, name);
                this.io.emit('current-bandList', this.bandList.getBands());
            } )

            socket.on('create-band', ({name}) => {
                this.bandList.addBand(name);
                this.io.emit('current-bandList', this.bandList.getBands());
            })
    
        });
    }
}

module.exports = Sockets;