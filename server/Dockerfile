#  Dockerfile for Node Express Backend

FROM node:16-alpine

WORKDIR /usr/src/server

COPY package*.json .

RUN npm install

# Copy local file to container directory. LHS is the system path where .Dockerfile is present and RHS is docker container's working directory mentioned in the above
COPY . .

# Exports
EXPOSE 3500

CMD ["npm", "run", "dev"]