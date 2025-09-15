# Stage de build
FROM node:20.8.0 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Stage Nginx
FROM nginx:1.25.2-alpine
COPY --from=builder /app/dist/your-car-your-way/browser/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 755 /usr/share/nginx/html
EXPOSE 80