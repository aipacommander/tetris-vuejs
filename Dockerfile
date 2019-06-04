FROM node:8.11.3-alpine

WORKDIR /app

RUN apk update && \
    npm install -g npm vue-cli

WORKDIR /app/tetris-vuejs
EXPOSE 9000
ENV PORT 9000

CMD ["npm", "run", "serve"]
