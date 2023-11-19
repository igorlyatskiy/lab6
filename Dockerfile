FROM node:16.20.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run db:migrate

CMD [ "node", "index.js" ]
