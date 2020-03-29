const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        
        const { latitude, longitude, techs } = socket.handshake.query;
        //console.log(techs);
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            techs: parseStringAsArray(techs)
        });

    });
}

exports.findConnections = (coordinates, techs) => {
    let x =  connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
            && connection.techs.some(item => techs.includes(item))
    });

    console.log(' xxxxxxxxxxxxxx ', x);
    return x;
}

exports.sendMessage = (to, message, data) => {
   // const k = to.array;
   // console.log(' KASDASDAS ', typeof to, '       l ', k, ' k ', to, ' cinections ', connections);
   // connections.forEach(connection => {
  //      io.to(connection.id).emit(message, data);
    //});
}