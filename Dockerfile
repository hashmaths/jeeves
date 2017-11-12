FROM node:8-alpine
WORKDIR /jeeves
COPY package* ./
RUN npm install
COPY . ./
CMD npm start
