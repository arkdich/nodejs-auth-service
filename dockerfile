FROM node:20-alpine as build
WORKDIR /app

COPY ./package*json .
RUN npm install

COPY . .

RUN npm run build
RUN npm prune --omit=dev

FROM node:20-alpine
WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.env ./.env
COPY --from=build /app/dist ./dist
COPY --from=build /app/doc ./doc
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src/shared/templates/html ./src/shared/templates/html

CMD npm run start:prod

EXPOSE 4000
