import { app, BrowserWindow } from 'electron';
import path from 'path';
import electronReload from 'electron-reload';

electronReload(path.join(__dirname, '..'), {});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.loadURL('http://localhost:5173');
}

app.whenReady().then(createWindow);
