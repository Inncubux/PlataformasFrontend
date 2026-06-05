# Etapa 1: Compilación (Build)
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar archivos de dependencias e instalar (usando npm según tu terminal)
COPY package.json package-lock.json ./
RUN npm ci

# Copiar el resto del código y construir para producción
COPY . .
# Nota: "plataforma-front" es el nombre de tu proyecto según los logs de tu terminal
RUN npm run build --configuration production

# Etapa 2: Servidor Web (Nginx)
FROM nginx:alpine
# Copiar los archivos compilados de Angular al servidor Nginx
COPY --from=builder /app/dist/plataforma-front/browser /usr/share/nginx/html

# Exponer el puerto web por defecto
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]