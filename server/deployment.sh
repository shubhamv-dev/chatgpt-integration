#! /bin/bash

echo "------------------Git checkout-----------------"
git stash
git pull origin main
echo "----------------npm installation-------------------"             
npm install
