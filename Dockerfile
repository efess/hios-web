FROM nginx

# Set the working directory to /app
WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist /usr/share/nginx/html

# Make port 80 available to the world outside this container
EXPOSE 8080