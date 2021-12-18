# A Docker wrapped Node.js app starter for microservices or monoliths

This starter kit created for Node.js apps. It uses opinionated packages and architecture. It has rest, graphql, socket and more capabilities. Here is used packages and technologies:

- Prisma v2: ORM for communicating with MongoDB
- Pal.js: convert prisma queries to graphql api
- ExpoNotifications: send notifications to expo apps
- Firebase: manage user authorization, user attributes, CloudFirestore, PubSub (sending messages to Kafka)
- Sentry: track errors and performance
- Stripe: manage payments
- Express.js: create a server
- JWT: authentication
- Graphql: API


## Serverless
I have created bunch of ready to use opinionated services for common use. I have inspired by serverless-cloud. Here is the services:
- cache: in-memory cache ; each instance has it owns isolated cache
- data: mongodb backed single collection designed ORM
- kafka: uses Confluent Kafka as service
- events: is coming
- params: copies process.env by parsing also JSON values
- scheduler: support interval and cron jobs
- server: create an express server and exports api and guest routes