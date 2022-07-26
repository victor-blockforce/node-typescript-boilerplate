FROM node:16

RUN apt-get update && apt-get install build-essential
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm@7
RUN pnpm config set store-dir .pnpm-store

RUN mkdir -p /app/node_modules

# app infra repo
WORKDIR /app
COPY package.json ./
RUN pnpm install
COPY . ./
RUN pnpm run build

EXPOSE 8080
CMD PORT=8080 npm start
