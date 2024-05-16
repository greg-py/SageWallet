# Step 1: Build the application
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy TypeScript configuration and source files
COPY tsconfig.json ./
COPY server.ts ./
COPY src ./src

# Build the TypeScript code
RUN npm run build

# Step 2: Run the application
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy built files and node_modules from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json ./

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD ["node", "dist/server.js"]