# 1 Этап: build node_modules (размер node_modules около 170 МБ + ./dist app)
FROM node:20.10.0-alpine3.18 AS development
WORKDIR /var/www/api
COPY *.json ./
COPY ./src ./src
COPY ./dist ./dist
RUN npm install && npm run build

# 2 Этап: build application (`--omit=dev` размер node_modules около 30МБ + ./dist app)
FROM node:20.10.0-alpine3.18 AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /var/www/api
COPY --from=development /var/www/api/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev
EXPOSE 8080
ENTRYPOINT ["node", "dist/index"]