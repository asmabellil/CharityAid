#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
#RUN apt-get update
#RUN npm install
RUN yarn install 
RUN yarn run build 
#RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/front /usr/share/nginx/html
EXPOSE 80