# Use Node.js as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY src ./src
COPY .env ./

# Set entry point for the script
CMD ["node", "src/main.js"]
