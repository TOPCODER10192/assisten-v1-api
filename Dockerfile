FROM node:12.16.2-buster-slim

WORKDIR /app

RUN yarn global add pm2

COPY package.json yarn.lock /app/

RUN yarn install

COPY . .

ENV PORT=3333

EXPOSE 3333

CMD ["pm2-runtime", "process.yml"]
