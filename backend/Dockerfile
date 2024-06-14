# Use the official Node.js image as the base image
FROM node:14

# Create and set the working directory
WORKDIR /routes

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the backend code
COPY . .

# Expose the backend port
EXPOSE 3001

# Start the backend server
CMD ["node", "index.js"]
