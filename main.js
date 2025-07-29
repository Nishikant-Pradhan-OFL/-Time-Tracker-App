const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() 
{
  const win = new BrowserWindow({
    width: 600,
    height: 700,
    webPreferences: 
    {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'favicon.png')
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
