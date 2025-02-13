// preload.js (Processo de Preload)
const electron = require('electron');

// Expondo funções seguras para o frontend, evitando acesso direto ao processo principal.
electron.contextBridge.exposeInMainWorld('electron', {
  // Inscreve-se em eventos do processo principal, recebendo atualizações dinâmicas.
  subscribeEvent: (
    event: keyof EventPayloadMapping,
    callback: (data: any) => void,
  ) => ipcSubscribe(event, callback),

  // Solicita dados ao processo principal de forma assíncrona.
  requestData: (event: keyof EventPayloadMapping) => ipcInvoke(event),

  // Envia comandos para o processo principal sem esperar resposta.
  sendAction: (event: keyof EventPayloadMapping, payload: any) =>
    ipcSend(event, payload),
});

// Executa uma chamada assíncrona ao processo principal e retorna uma resposta (Captura possíveis erros para evitar que o app trave caso algo) falhe.
async function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key,
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key).catch((err: any) => {
    console.error(`IPC Invoke Error (${key}):`, err);
    return null;
  });
}

// Inscreve-se em eventos do processo principal e retorna uma função para cancelar a inscrição (Impede que eventos fiquem ouvindo indefinidamente.)
function ipcSubscribe<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void,
) {
  const listener = (_: Electron.IpcRendererEvent, payload: any) =>
    callback(payload);
  electron.ipcRenderer.on(key, listener);
  return () => electron.ipcRenderer.removeListener(key, listener);
}

// Envia dados para o processo principal sem esperar uma resposta.
function ipcSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  payload: EventPayloadMapping[Key],
) {
  electron.ipcRenderer.send(key, payload);
}

/*
Exemplo de uso no frontEnd

Inscrever-se em qualquer evento:
window.electron.subscribeEvent('systemInfo', (data) => console.log(data));

Pedir informações ao processo principal:
window.electron.requestData('getConfig').then((config) => console.log(config));

Enviar ações para o processo principal:
window.electron.sendAction('toggleFullscreen', true);
*/
