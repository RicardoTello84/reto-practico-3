# Imagen base
FROM node:alpine

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Corre los tests durante el build
RUN npm test

# Comando por defecto
CMD ["npm", "start"]