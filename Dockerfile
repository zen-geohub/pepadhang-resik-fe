FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm i

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3009

CMD ["server", "-s", "dist", "-p", "3009"]