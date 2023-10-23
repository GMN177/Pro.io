FROM node:14.14.0-alpine as builder
WORKDIR /app
COPY ../../frontend/ ./
RUN npm install
RUN npm run build

FROM nginx
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html