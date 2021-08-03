# BUILD STAGE
FROM node:slim as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY ./ ./

RUN npm run build


# DEPLOY STAGE
FROM node:slim

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

ARG PORT
ENV PORT=${PORT}

RUN npm ci --only=production


EXPOSE ${PORT}

CMD ["node", "/usr/src/app/dist/main"]
