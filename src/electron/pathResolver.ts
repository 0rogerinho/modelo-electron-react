import path from 'path';
import { app } from 'electron';
import { isDev } from './utils.js';

// Retorna o caminho do script de preload.
// Em modo de desenvolvimento, o caminho é relativo à raiz do projeto.
// Em produção, ele fica na pasta acima (../) devido ao empacotamento.
export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? '.' : '..',
    '/dist-electron/preload.cjs',
  );
}

// Retorna o caminho do arquivo HTML da interface do usuário.
// Esse arquivo é carregado na janela principal do Electron.
export function getUIPath() {
  return path.join(app.getAppPath(), '/dist-react/index.html');
}

//Retorna o caminho dos arquivos de assets (imagens, ícones, etc.).
// Em desenvolvimento, os assets estão no diretório raiz.
// Em produção, podem estar em uma pasta superior devido ao empacotamento.
export function getAssetPath() {
  return path.join(app.getAppPath(), isDev() ? '.' : '..', '/src/assets');
}
