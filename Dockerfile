# DEV DEPENDENCY STAGE
FROM node:slim as dev-dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci -D

# BUILD STAGE
FROM node:slim as builder
WORKDIR /usr/src/app
COPY ./ ./
COPY --from=dev-dependencies /usr/src/app/node_modules ./node_modules
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
RUN npm run build

# PROD DEPENDENCY STAGE
FROM node:slim as prod-dependencies
WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci

# RUN STAGE
FROM node:slim as runner
WORKDIR /usr/src/app
COPY --from=prod-dependencies /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}
ENTRYPOINT ["node", "/usr/src/app/dist/src/main"]















