FROM node:16.15-alpine
WORKDIR /usr/frontend
COPY . .
RUN mkdir -p /var/www/html
RUN npm install
RUN npm run build