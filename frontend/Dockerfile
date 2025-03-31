# Use official Node.js image
FROM node:23.6.1

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Expose backend port
EXPOSE 5173

# Start the backend
CMD ["npm", "run", "dev"]
