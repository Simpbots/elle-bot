FROM node:16-alpine

WORKDIR /app
COPY package*.json yarn.lock  ./
RUN yarn install

COPY . .
RUN npm i -g pm2 typescript
RUN tsc

CMD ["pm2-runtime", "dist/index.js", "--name $BOT_NAME"]
