FROM node:lts
WORKDIR /bicibot/backend
COPY package*.json ./
RUN npm install --save-prod pm2
RUN npm install --verbose
COPY . .
EXPOSE 3000