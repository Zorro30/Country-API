FROM node:12.18-alpine as builder
RUN apk update && apk add python2-dev make alpine-sdk gcc g++ git build-base openssh openssl bash
RUN mkdir /kaplantask
WORKDIR /kaplantask
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
FROM node:12.18-alpine
RUN mkdir /kaplantask
WORKDIR /kaplantask
COPY --from=builder /kaplantask .
ENTRYPOINT ["node","src/server.js"]




# FROM node:12.18-alpine
# RUN mkdir -p /kaplantask
# WORKDIR /kaplantask
# # RUN adduser -S app
# COPY . .
# RUN npm install
# # RUN chown -R app /opt/app
# # USER app
# EXPOSE 3000
# CMD [ "node", "src/server.js" ]