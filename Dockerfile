FROM node:lts-alpine

RUN mkdir -p /app/public

COPY package.json /app/
COPY public/data.json /app/public/data.json

WORKDIR /app

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "run", "dev"]
