FROM node:lts
WORKDIR /bicibot/backend
COPY package*.json ./
RUN npm install --verbose
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]