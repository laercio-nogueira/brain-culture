# 🚀 Processo de Deploy - Projeto Fullstack (NestJS + React + Vite)

Este guia descreve o processo completo de deploy da aplicação em um ambiente de produção utilizando Docker e Docker Compose.

---

## 🛠️ Pré-requisitos

- Docker e Docker Compose instalados.
- Domínio configurado (opcional).

---

## 🧱 Execucão do Docker Compose

1. Na raiz do projeto, execute o comando:
```
docker-compose -f ./docker-compose.prod.yml up -d
```
2. Aguarde enquanto sobe a aplicação em produção.
3. Acesse o frontend: http://localhost:4173
4. Acesse o backend: http://localhost:3000