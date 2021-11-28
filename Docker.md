docker build . -t turgaysaba/node-app

docker run -p 8080:8080 -d turgaysaba/node-app

docker logs <id>

docker kill <id>
