# 📌 Boilerplate de electron com react

  Uma estrutura pronta para desenvolver aplicativos desktop com React e Electron. Já vem configurada com as melhores práticas de segurança, garantindo uma comunicação segura entre o back-end (processo principal do Electron) e o front-end (React).

## 🚀 Tecnologias Utilizadas

- Electron

- React

- PNPM (estou usando pnpm mas sinta-se a vontade para utilizar o gerenciador de pacotes que prefere)

- TypeScript

## 📂 Estrutura do Projeto

Após a compilação, o projeto gera as seguintes pastas:

 - `src` - Contém o código-fonte do projeto.
    - `assets` - Contém arquivos estáticos e recursos.
    - `electron` - Contém a lógica do Electron.
    - `ui` - Contém a interface do usuário em React.

## ⚡ Como Rodar o Projeto

### 1️⃣ Instalar Dependências

Antes de rodar o projeto, certifique-se de instalar todas as dependências necessárias:

```
pnpm install
```

### 2️⃣ Construir o Projeto

Após instalar as dependências, é necessário construir o projeto para gerar os arquivos necessários:

```
pnpm run build
```

Isso criará as pastas dist-react/ e dist-electron/.

### 3️⃣ Rodar o Projeto

Agora, basta iniciar o projeto em modo de desenvolvimento:

```
pnpm run dev
```

## 🛠️ Requisitos

- Node.js instalado
- PNPM instalado
