FROM node:lts-alpine as build-stage
WORKDIR /usr/src/app
RUN npm i -g @nestjs/cli
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:18.18.0-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build-stage /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

