FROM node:16 as builder
WORKDIR /app
COPY . .

RUN npm ci
ARG COMMIT
ENV VITE_COMMIT=${COMMIT}
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /app

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/. .

CMD ["nginx", "-g", "daemon off;"]
