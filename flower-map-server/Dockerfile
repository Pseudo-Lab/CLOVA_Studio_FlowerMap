FROM node:20-alpine AS build
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm run build
CMD [ "node", "dist/main.js" ]