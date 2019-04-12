FROM node:lts
RUN mkdir -p /backend/node_modules && chown -R node:node /backend
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .
COPY --chown=node:node . .
USER node
EXPOSE 3000
CMD [ "npm", "start" ]