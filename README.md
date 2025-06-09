# Teste Brain Agriculture
## Frontend (Vite + React + Styled Components) | Backend (NestJS + TypeORM + Clean Architecture)

### Pré-requisitos
- Node.js 20+
- Docker (para banco de dados)

```text
microservices-app/
├── backend/               # NestJS + TypeORM (Clean Architecture)
├── frontend/              # Vite + React + Styled Components
└── docker-compose.yml     # Configuração do Docker (PostgreSQL)
```

### 🔧 Configuração Inicial
## Backend (NestJS + TypeORM)
Instalação

```shell
cd backend
yarn install  # ou npm install
```

### Rodar com Docker (Recomendado)
```shell
cd backend
docker-compose up -d  # Inicia PostgreSQL
yarn start:dev       # Inicia o NestJS em modo desenvolvimento
```

### Comandos Úteis
- yarn start	/ Inicia produção
- yarn start:dev	/ Modo desenvolvimento
- yarn test	Roda / testes


## Frontend (Vite + React + Styled Components)
```shell
cd frontend
yarn install  # ou npm install
```
