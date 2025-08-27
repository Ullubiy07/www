FROM node:current-alpine3.22

WORKDIR /code

COPY package*.json .

RUN npm install

COPY . /code/

CMD ["npm", "start"]