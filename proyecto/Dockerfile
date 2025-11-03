# imagen base
FROM node:18-alpine

# directorio de la app
WORKDIR /usr/src/app

# copiar package.json y lock
COPY app/package*.json ./

# instalar dependencias
RUN npm ci --only=production

# copiar el resto de la app
COPY app/ ./

# puerto
EXPOSE 3000

# comando
CMD ["node", "index.js"]
