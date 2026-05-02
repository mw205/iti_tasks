FROM node:alpine
WORKDIR /app
RUN apk add curl bash git && npm install -g nodemon
CMD ["nodemon" , "/app/server.js"]