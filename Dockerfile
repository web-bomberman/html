FROM node:16.15-alpine
WORKDIR /usr/frontend
COPY . .
RUN npm install
RUN npm run build
RUN mv dist/* /var/www/html