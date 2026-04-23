# syntax=docker/dockerfile:1.7
ARG NODE_IMAGE=node:20-alpine
FROM ${NODE_IMAGE}

# Install OpenJDK for openapi-generator-cli
RUN apk add --no-cache openjdk17-jre python3

WORKDIR /app

# 1) Install deps with best caching:
#    - copy only manifests
#    - npm ci for lockfile reproducibility
#    - cache npm downloads between builds
COPY ng/sampleapp/package*.json ./
RUN --mount=type=cache,target=/home/node/.npm \
    npm ci

# 2) Bring in the rest of the app (doesn't invalidate the layer above unless manifests change)
COPY ng/sampleapp/ ./sampleapp

# Helpful envs for containerized file watching
ENV CHOKIDAR_USEPOLLING=true \
    CHOKIDAR_INTERVAL=2000 \
    HOST=0.0.0.0

# Expose Angular dev server port
EXPOSE 4200

# Same command you use today (kept explicit flags)
CMD ["npm","run","watch","--","--host","0.0.0.0","--poll","2000","--serve-path","/sampleapp/"]