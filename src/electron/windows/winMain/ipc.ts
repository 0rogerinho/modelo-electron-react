// src/electron/ipc.ts
import { ipcMain, BrowserWindow } from 'electron';

export type configData = {
  channel: string;
};

let configWin: BrowserWindow | null = null;

export const registerIPC = (win: BrowserWindow) => {
  ipcMain.on('setFullScreen', (_event, showFullscreen: boolean) => {
    showFullscreen ? win.maximize() : win.unmaximize();
  });

  ipcMain.on('alwaysOnTop', (_event, boolean: boolean) => {
    win?.setAlwaysOnTop(boolean);
  });

  ipcMain.on('closeFilePreview', () => {
    win?.minimize();
  });

  ipcMain.on('close', () => {
    win?.close();
  });

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });
};
