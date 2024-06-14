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

# Use nginx to serve the app
FROM nginx:1.19

# Copy built files to nginx's html directory
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
