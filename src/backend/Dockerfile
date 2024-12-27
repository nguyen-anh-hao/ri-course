# Use official Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Copy the entrypoint script
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Expose the port the backend runs on
EXPOSE 3123

# Command to run the app in development mode
ENTRYPOINT ["/app/docker-entrypoint.sh"]