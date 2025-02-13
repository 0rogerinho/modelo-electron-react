// src/electron/window.ts
import { BrowserWindow } from 'electron';
import { getPreloadPath, getUIPath } from '../../pathResolver.js';
import { isDev } from '../../utils.js';

export const createWindow = (): BrowserWindow => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    frame: true,
  });

  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123');
  } else {
    mainWindow.loadFile(getUIPath());
  }

  return mainWindow;
};
