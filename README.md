# Teste Brain Agriculture

API RESTful para gerenciar o cadastro de produtores rurais.

## **Topicos**
1. Tecnologias e Libs.
2. Instalação
3. Estrutura do Projeto.

---

## **1. Tecnologias Utilizadas**
- **Node.js**
- **NestJS**
- **React.js**

---

## **2. Instalação**

### **Pré-requisitos**
- Node.js versão 20+.
- npm (gerenciador de pacotes).

### **Modo Produção**

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/laercio-nogueira/brain-culture.git
   cd ./brain-culture
   ```

2. Instale as dependencias (Execute na raiz do projeto)
   ```bash
   npm install
   ```

3. Instale as dependencias do Frontend (Execute na raiz do projeto)
   ```bash
   cd ./client && npm install
    ```

4. Instale as dependencias do Backend (Execute na raiz do projeto)
    ```bash
    cd ./bff && npm install
    ```

5. Inicie a aplicação em modo de Produção (Execute na raiz do projeto)
    ```bash
      npm run prod
    ```

6. A aplicação estará disponível em:
  - http://localhost:4173

---

### **Modo Desenvolvimento**

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/laercio-nogueira/brain-culture.git
   cd ./brain-culture
   ```

2. Instale as dependencias (Execute na raiz do projeto)
   ```bash
   npm install
   ```

3. Instale as dependencias do Frontend (Execute na raiz do projeto)
   ```bash
   cd ./client && npm install
    ```

4. Instale as dependencias do Backend (Execute na raiz do projeto)
    ```bash
    cd ./bff && npm install
    ```

5. Start do Projeto
- (Modo Junto) - Inicie a aplicação em modo de Desenvolvimento (Execute na raiz do projeto)
    ```bash
      npm run dev
    ```

- (Modo Separado) 
  - Frontend - Inicie a aplicação em modo de Desenvol (Execute na client projeto)
    ```bash
      npm run dev
    ```
  - Backend - Inicie a aplicação em modo de Desenvol (Execute na bff projeto)
    ```bash
      npm run start:dev
    ```


6. A aplicação estará disponível em:
  - http://localhost:5173

---

## **3. Estrutura do Projeto**
```ruby
brain-culture/
├── bff/                         # Backend For Frontend (Node.js)
│   ├── dist/                    # Arquivos compilados do Frontend
│   ├── node_modules/            
│   ├── src/                     
│   │   ├── controllers/         # Lógica dos controladores (entrada das requisições)
│   │   ├── middleware/          # Middlewares de autenticação, logs, etc.
│   │   ├── usecases/            # Casos de uso (regras de negócio)
│   │   │   └── registerUseCase.js
│   │   ├── views/               # Views (templates HTML) renderização de views
│   │   ├── router.js            # Definições de rotas do BFF
│   │   └── index.js             # Ponto de entrada do BFF
│   ├── package.json             # Dependências e scripts do BFF
│   └── package-lock.json
│
├── client/                     # Aplicação Frontend      
│   ├── node_modules/           
│   ├── src/                    
│   │   ├── assets/             # SASS
│   │   ├── components/         # Componentes reutilizáveis do React
│   │   ├── pages/              # Páginas do aplicativo
│   │   ├── templates/          # Templates              
│   │   ├── App.tsx             # Componente raiz
│   │   └── main.ts             # Ponto de entrada do app Vue
│   ├── index.html              # HTML principal
│   ├── jsconfig.json           # Configuração de paths para o TS
│   ├── package.json            # Dependências e scripts do Frontend
│   ├── package-lock.json
│   ├── vite.config.ts          # Configuração do bundler Vite
│   ├── .editorconfig
│   ├── .gitattributes
│   ├── .prettierrc.json
│   └── eslint.config.js
│
├── node_modules/               
├── .gitignore
├── instructions.md             # Instruções para o desenvolvimento
├── package.json                # Dependências e scripts do projeto
├── README.md                   # Instructions do projeto
├── .gitignore
```

---
## **4. Validações**
