FROM node:14-alpine

WORKDIR /app
COPY lib /app/lib
COPY index.js /app/
COPY package.json /app/
COPY package-lock.json /app/

RUN npm install --production

EXPOSE 8877

CMD node index.js