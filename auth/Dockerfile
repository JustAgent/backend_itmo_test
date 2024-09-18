FROM node:21-alpine

WORKDIR /app

COPY ./package.json ./yarn.lock ./
RUN yarn --frozen-lockfile

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY . .
CMD ["yarn", "start"]