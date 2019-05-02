#!/bin/sh

ssh -i deploy_rsa build_travis@$DEPLOY_HOST
cd ../plpbs/bicibot-api
sudo git checkout master
sudo git pull
sudo docker-compose -f docker-compose.yml -f docker_production.yml up --force-recreate -d
