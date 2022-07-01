FROM node:latest as node
WORKDIR /app
COPY . .
RUN apt-get update
RUN npm install
RUN npm install bcrypt@latest --save
EXPOSE 3000
CMD npm start