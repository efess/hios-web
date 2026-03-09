FROM nginx:alpine

ENV API_BACKEND=hios-backend-service:3000
ENV DNS_RESOLVER=10.43.0.10
ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx
ENV NGINX_ENVSUBST_FILTER=API_BACKEND|DNS_RESOLVER

COPY dist /usr/src/app
COPY nginx.conf /etc/nginx/templates/nginx.conf.template

EXPOSE 8080
