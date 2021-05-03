// Modules to control application life and create native browser window
const {app, BrowserWindow,Tray} = require('electron')
const {PythonShell} = require('python-shell');
const path = require('path')
const electron = require('electron')
ipc = electron.ipcMain;
const SoundTray = require('./soundtray')
let mainWindow;
let tray;
// let pyshell = new PythonShell("DTLN/real_time_dtln_audio.py");
// pyshell.on('message', function(message) {
//   //mainWindow.webContents.print(message)
//   console.log('came',message);})
const spawn=require('child_process').spawn;
const process=spawn('python',['./DTLN/real_time_dtln_audio.py'])
let data = [1,2,3,4,5,6,7,8,9]

process.stdout.on('data',data =>{
  console.log('got',data.toString());
})



ipc.on('noise', (event, messages) => {
  console.log('yoo')
  process.stdin.write(JSON.stringify('yoyop'));
  process.stdin.end()
 })
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 300,
    height:500,
    webPreferences: {
      backgroundThrottling:false,
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
    skipTaskbar: true,
    resizable:true,
    frame: false,
    show:false
  })
  mainWindow.setMenu(null);
  mainWindow.on('blur',()=>{
    mainWindow.hide();
  })
  mainWindow.webContents.openDevTools()
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  const showdoc=process.platform==='darwin'? app.dock.hide():mainWindow.setSkipTaskbar(true);
  const iconName='icon.png';
  const iconPath=path.join(__dirname,`./src/assets/${iconName}`)
  tray= new SoundTray(iconPath,mainWindow);
 


}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
