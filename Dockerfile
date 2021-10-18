# DEPENDENCY STAGE
FROM node:slim as dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# BUILD STAGE
FROM node:slim as builder
WORKDIR /usr/src/app
COPY ./ ./
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
RUN npm run build

# RUN STAGE
FROM node:slim as runner
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}
ENTRYPOINT ["node", "/usr/src/app/dist/src/main"]















