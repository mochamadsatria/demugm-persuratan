#!/bin/zsh

export NODE_ENV=production

cd buildtools
curl -O https://nodejs.org/dist/v18.16.0/node-v18.16.0-darwin-x64.tar.gz
tar -xvf node-v18.16.0-darwin-x64.tar.gz
cd ..

npm=./buildtools/node-v18.16.0-darwin-x64/bin/npm

$npm install

$npm run build

$npm run start
