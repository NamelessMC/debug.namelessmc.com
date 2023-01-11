FROM node:18 AS builder

RUN mkdir /build
WORKDIR /build

COPY package.json package-lock.json ./
RUN npm ci

# only now add the rest of the application code, so the npm install layer can be cached
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged

RUN rm /etc/nginx/conf.d/*
COPY docker/nginx-prod.conf /etc/nginx/conf.d/nameless.conf
COPY --from=builder /build/build /var/www/html
