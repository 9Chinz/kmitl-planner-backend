#use node alphine image
FROM node:alpine

#make a directory to store the app
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#copy package.json to the app directory
COPY ./package.json ./

#install dependencies
RUN npm install

#copy the rest of the files to the app directory
COPY ./ ./

#expose port 8080
EXPOSE 8080

#default command
CMD ["npm", "start"]

