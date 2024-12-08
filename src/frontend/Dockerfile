# Frontend Dockerfile
FROM node:18

# Set work directory
WORKDIR /frontend

# Copy project files
COPY . .

# Copy dependencies and install
COPY package*.json ./
RUN npm install

# Expose frontend port
EXPOSE 3000

# Start frontend
CMD ["npm", "run", "dev"]