FROM node:21-alpine

WORKDIR /app

COPY ./package.json ./

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]