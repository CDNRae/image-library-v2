import { app, BrowserWindow } from 'electron';
import path from 'path';
import electronReload from 'electron-reload';
import fs from "fs";

electronReload(path.join(__dirname, '..'), {});

// Set up database path before starting Prisma
const userDataPath = app.getPath("userData");
const folderPath = path.join(userDataPath, "Image Library");

// Make sure folder exists in user data before trying to access it
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

const dbPath = path.join(folderPath, "image-library.sqlite");
process.env.DATABASE_URL = `file:${dbPath}`;

// Import Prisma client only after database location has been set
import { prisma } from './prisma';

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
