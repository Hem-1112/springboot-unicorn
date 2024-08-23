# Stage 1: Build the React app
FROM node:22.5.1-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app with an NGINX server
FROM nginx:alpine

# Copy the custom nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run the app
CMD ["nginx", "-g", "daemon off;"]
