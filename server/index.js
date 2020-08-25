const express = require('express'); 
const socketio = require('socket.io'); 
const http = require('http'); 

const { addDevice, removeDevice, getDevice, getDevicesAtTable } = require('./devices');

const PORT = process.env.PORT || 5000; 

const router = require('./router'); 

const app = express(); 
const server = http.createServer(app); 
const io = socketio(server); 

// Will execute whenever we have a client connection on 'io'
io.on('connection', (socket) => {
    //console.log("New connection at table _____!"); 
    socket.on('join', ({ device, table }, callback) => {
        const { error, device } = addDevice({ id: socket.id, device, table }); 

        if(error) return callback(error); 

        socket.emit('message', { device: 'admin', text: `${device.name}, Thank you for dinging with us and welcome to table ${device.table}`});
        socket.broadcast.to(device.table).emit('message', { user: 'admin', text: `${device.name}, has joined!`}); 

        socket.join(device.table); 
        //console.log(`Device id ${device} has joined table id ${table}`); 

        callback(); 
    })
    // Will execute whenever a client disconnects from session
    socket.on('disconnect', () => {
        console.log("User has disconnected!"); 
    })
})

app.use(router); 

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`)); 