FROM node:16 as builder
WORKDIR /app
ARG COMMIT

COPY . .

RUN npm ci
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /app

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/. .
ARG COMMIT
ENV VITE_COMMIT=${COMMIT}

CMD ["nginx", "-g", "daemon off;"]
