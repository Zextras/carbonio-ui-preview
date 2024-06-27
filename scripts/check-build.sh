#!/bin/sh

if [ ! -f ./lib/index.js ]; then
    echo "Error: build folders are not well structured"
    echo "index.js is not directly contained inside build package";
    exit 1;
fi

if [ ! -f ./lib/index.d.ts ]; then
    echo "Error: build folder is not well structured"
    echo "index.d.ts is not directly contained inside build package";
    exit 1;
fi
