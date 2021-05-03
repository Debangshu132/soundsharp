// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// import {PythonShell} from 'python-shell'
const ipc = require('electron').ipcRenderer;
console.log('starting')


// let pyshell = new PythonShell("DTLN/real_time_dtln_audio.py");
// pyshell.on('message', function(message) {
//   //mainWindow.webContents.print(message)
//   console.log('came',message);})
setTimeout(function(){ 
    
    console.log('delay')
    var http = new XMLHttpRequest();
    var url = 'http://localhost:5005/noise';
    var params = 'orem=ipsum&name=binny';
    http.open('GET', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        console.log('back init',http.responseText);
    }
}
http.send(params);


}, 3000);

function toggleNoise(){
    //ipc.send('noise','off');
    console.log('sending')
    var http = new XMLHttpRequest();
    var url = 'http://localhost:5005/toggle';
    var params = 'orem=ipsum&name=binny';
    http.open('GET', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        console.log('back',http.responseText);
    }
}
http.send(params);
}


document.getElementById('customSwitch4').onchange=toggleNoise



