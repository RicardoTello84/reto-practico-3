FROM node:alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Corre los tests durante el build
RUN npm test

CMD ["npm", "start"]