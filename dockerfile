FROM node:alpine
WORKDIR /app
COPY . .

ENV NODE_ENV=development

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]
