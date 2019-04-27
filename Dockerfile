FROM node:lts
COPY package*.json ./
WORKDIR /bicibot/backend
RUN npm install --save-prod pm2
RUN npm install --verbose
COPY . .
EXPOSE 3000