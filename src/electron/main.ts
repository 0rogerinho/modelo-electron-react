import { app, BrowserWindow } from 'electron';
import { createWindow } from './windows/winMain/index.js';
import { registerShortcuts } from './shortcuts.js';
import { registerIPC } from './windows/winMain/ipc.js';

let mainWindow;

app.on('ready', () => {
  mainWindow = createWindow();
  registerShortcuts(mainWindow);
  registerIPC(mainWindow);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    mainWindow = null;
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
