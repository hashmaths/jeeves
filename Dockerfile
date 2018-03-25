FROM node:8-alpine

RUN apk add --update \
  python build-base icu-dev && \
  rm -rf /var/cache/apk/*

WORKDIR /jeeves

COPY package* ./
RUN npm install && npm cache clean --force

COPY . ./

CMD npm start
