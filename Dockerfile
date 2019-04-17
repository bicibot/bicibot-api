FROM node:lts
COPY package*.json ./
WORKDIR /bicibot/backend
RUN npm install --verbose
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]