// Creating empty array to hold new device joins
const devices = []; 

const addDevice = ({ id, device, table }) => {
    device = device.trim().toLowerCase(); 
    table = device.trim().toLowerCase(); 
    // Checking to see if an existing device id has already joined at another table
    const existingDevice = devices.find((device) => device.table === table && device.device === device);
    // If device has already joined a table, return an error
    if(existingDevice) {
        return { error: 'Device is already in use at another table' }; 
    }
    // If device has not already joined a table, create new device
    const device = { id, device, table }; 
    // Push device to 'devices' array
    devices.push(device); 
    // Return newly added device
    return { device }; 
}

const removeDevice = (id) => {
    //
    const index = devices.findIndex((device) => device.id === id); 

    if(index !== -1) {
        return devices.splice(index, 1)[0]; 
    }
}

const getDevice = (id) => devices.find((device) => device.id === id); 

const getDevicesAtTable = (table) => devices.filter((device) => device.table === table); 

module.exports = { addDevice, removeDevice, getDevice, getDevicesAtTable };