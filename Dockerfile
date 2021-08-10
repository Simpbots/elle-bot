FROM node:current-alpine

WORKDIR /usr/src/app
COPY package*.json yarn.lock  ./
RUN yarn install

COPY . .
RUN yarn build
RUN npm i -g pm2

CMD ["pm2-runtime", "dist/index.js", "--name elle-bot"]
