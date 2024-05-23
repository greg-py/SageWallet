# Step 1: Build the React application
FROM node:16-alpine AS build

# Define build arguments for environment variables
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_API_BASEURL
ARG VITE_AUTH0_API_IDENTIFIER

# Set environment variables during build process
ENV VITE_AUTH0_DOMAIN=$VITE_AUTH0_DOMAIN
ENV VITE_AUTH0_CLIENT_ID=$VITE_AUTH0_CLIENT_ID
ENV VITE_API_BASEURL=$VITE_API_BASEURL
ENV VITE_AUTH0_API_IDENTIFIER=$VITE_AUTH0_API_IDENTIFIER

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the React application using a lightweight web server
FROM nginx:alpine

# Copy built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]