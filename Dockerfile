FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
COPY ./bff/package*.json ./bff/
COPY ./client/package*.json ./client/
RUN npm install && \
  cd bff && npm install && \
  cd ../client && npm install
COPY . .

FROM node:20-alpine AS runner

WORKDIR /app
RUN npm install -g npm-run-all
COPY --from=builder /app ./

EXPOSE 3000 4173

CMD ["npm", "run", "prod"]
