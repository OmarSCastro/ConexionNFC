const { app, BrowserWindow } = require('electron')


const smartcard = require('smartcard');

const Devices = smartcard.Devices;
const devices = new Devices(); //devices es un objeto de tipo Devices

devices.on('device-activated', event => {
const currentDevices = event.devices;
let device = event.device;
console.log(`Device '${device}' activated, devices: ${currentDevices}`);
for (let prop in currentDevices) {
    console.log("Devices: " + currentDevices[prop]);
}

device.on('card-inserted', event => {
    let card = event.card;
    console.log(`Card '${card.getAtr()}' inserted into '${event.device}'`);


});
device.on('card-removed', event => {
    console.log(`Card removed from '${event.name}' `);
});

});


devices.on('device-deactivated', event => {
console.log(`Device '${event.device}' deactivated, devices: [${event.devices}]`);
});

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600
    })
  
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})