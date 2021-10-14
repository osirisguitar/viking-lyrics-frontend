#!/bin/bash
git tag -a v$1 -m "Version $1"
docker build -t osirisguitar/viking-lyrics-web:$1 .
docker push osirisguitar/viking-lyrics-web:$1
