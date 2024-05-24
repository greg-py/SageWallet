# Step 1: Build the React application
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./

# Copy source files
COPY . .

# Build the application
RUN npm install; npm run build

# Step 2: Serve the React application using a lightweight web server
FROM nginx:alpine

# Copy built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]