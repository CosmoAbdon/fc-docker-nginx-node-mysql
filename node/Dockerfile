FROM node:14.18-alpine
WORKDIR /app
COPY . .
RUN yarn install
EXPOSE 3082
CMD ["yarn", "start"]