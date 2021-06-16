#!/bin/sh

rm -rf lib
mkdir lib
npx tsc --build tsconfig.json
cp package.json ./lib/package.json
cp -r dist ./lib/dist
echo "Done"
