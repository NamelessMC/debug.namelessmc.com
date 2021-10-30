FROM node:16 AS builder

RUN mkdir /build
WORKDIR /build

COPY package.json package-lock.json ./
RUN npm install

# only now add the rest of the application code, so the npm install layer can be cached
COPY . .
RUN npm run build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/*
COPY docker/nginx-prod.conf /etc/nginx/conf.d/nameless.conf
COPY --from=builder /build/dist /var/www/html
