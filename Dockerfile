## Multi stage
# Build stage
FROM node:20.18.3-alpine3.20 AS builder

WORKDIR /app

ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL

# Install dependencies
COPY package*.json ./
RUN npm install


COPY . .

RUN npm run build

# Production stage
FROM nginxinc/nginx-unprivileged:stable-alpine

# Copy build files from builder stage
COPY --from=builder /app/build  /usr/share/nginx/html

EXPOSE 8080

# serve is used to serve the static files
#CMD ["serve", "-s", "build", "-l", "3000"]
CMD ["nginx", "-g", "daemon off;"]
