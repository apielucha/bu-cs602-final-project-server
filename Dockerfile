FROM node:carbon-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i

CMD ["npm", "start"]
