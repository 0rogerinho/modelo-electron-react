import { ipcMain, WebContents, WebFrameMain } from 'electron';
import { getUIPath } from './pathResolver.js';
import { pathToFileURL } from 'url';

// Verifica se o aplicativo está rodando em modo de desenvolvimento.
export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

// Registra um manipulador para chamadas IPC que retornam uma resposta. (O handler só é executado se a origem do evento for validada.)
export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => EventPayloadMapping[Key],
) {
  ipcMain.handle(key, (event) => {
    if (event.senderFrame) {
      validateEventFrame(event.senderFrame); // Valida a origem do evento
      return handler();
    }
  });
}

// Registra um listener seguro para eventos IPC sem retorno. (Valida a origem do evento antes de executar o handler.)
function secureIpcOn<Key extends keyof EventPayloadMapping>(
  channel: Key,
  handler: (payload: EventPayloadMapping[Key]) => void,
) {
  ipcMain.on(channel, (event, payload) => {
    try {
      if (event.senderFrame) {
        validateEventFrame(event.senderFrame);
        handler(payload);
      }
    } catch (error) {
      console.error(`Blocked unauthorized IPC call on ${channel}:`, error);
    }
  });
}

// Registra um manipulador seguro para chamadas IPC que retornam resposta. (Valida a origem do evento antes de executar o handler.)
function secureIpcHandle<Key extends keyof EventPayloadMapping>(
  channel: Key,
  handler: () => EventPayloadMapping[Key],
) {
  ipcMain.handle(channel, (event) => {
    try {
      if (event.senderFrame) {
        validateEventFrame(event.senderFrame);
        return handler();
      }
    } catch (error) {
      console.error(`Blocked unauthorized IPC call on ${channel}:`, error);
      return null;
    }
  });
}

// Registra um listener para eventos IPC sem retorno. (Valida a origem do evento antes de executar o handler.)
export function ipcMainOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: (payload: EventPayloadMapping[Key]) => void,
) {
  ipcMain.on(key, (event, payload) => {
    if (event.senderFrame) {
      validateEventFrame(event.senderFrame); // Proteção contra IPCs não autorizados
      return handler(payload);
    }
  });
}

// Envia um evento para um WebContents específico.
export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key],
) {
  webContents.send(key, payload);
}

// Valida se o evento IPC veio de uma origem confiável. (Se a origem for suspeita, lança um erro e bloqueia a execução.)
export function validateEventFrame(frame: WebFrameMain) {
  if (isDev() && new URL(frame.url).host === 'localhost:5123') {
    return;
  }
  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error('Malicious event');
  }
}
