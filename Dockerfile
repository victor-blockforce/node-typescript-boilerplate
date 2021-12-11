FROM node:16

# RUN apk update && apk add --update git openssh python g++ make
RUN apt-get update && apt-get install build-essential

RUN mkdir -p /app/node_modules

# app infra repo
WORKDIR /app
COPY package.json ./
RUN npm install --no-optional
COPY . ./
RUN npm run build

EXPOSE 8080
CMD PORT=8080 npm start
