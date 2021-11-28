FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

CMD [ "ls" ]

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
RUN npm run build

RUN npm run start

EXPOSE 8080
CMD [ "node", "server.js" ]