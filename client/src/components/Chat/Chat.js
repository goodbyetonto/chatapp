// 'useEffect' allows you to perform side effects in function components
import React, { useState, useEffect } from 'react'; 

// This module will be used for retrieving data from the URL
import queryString from 'query-string'; 
import io from 'socket.io-client'; 

let socket; 

const Chat = ({ location }) => {
    const [device, setDevice] = useState(''); 
    const [table, setTable] = useState(''); 
    console.log(device, table); 
    const ENDPOINT = 'localhost:5000'; 
    useEffect(() => {
        const { device, table } = queryString.parse(location.search); 

        socket = io(ENDPOINT); 

        setDevice(device); 
        setTable(table); 

        socket.emit('join', { device, table }, () => {

        });

        return () => {
            socket.emit('disconnect'); 

            socket.off(); 
        }
    }, [ENDPOINT, location.search]); 
    return (
        <h1>Chat</h1>
    )
}; 

export default Chat; 