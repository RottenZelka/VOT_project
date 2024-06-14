# Use Node.js as the base image
FROM node:14

# Create app directory
WORKDIR /src

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["npm", "run", "start"]
