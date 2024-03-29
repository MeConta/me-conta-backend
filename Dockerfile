# DEPENDENCIES STAGE
FROM node:lts-slim as dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# BUILD STAGE
FROM node:lts-slim as builder
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY ./ ./
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
RUN npm run build

# RUN STAGE
FROM node:lts-slim as runner
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}
ENTRYPOINT ["node", "/usr/src/app/dist/main"]















