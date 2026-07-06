# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install all dependencies (including devDependencies required for building)
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build Vite static assets and bundle server.ts with esbuild
RUN npm run build

# Run Stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy manifests
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built files and compiled server from builder stage
COPY --from=builder /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Start server
CMD ["npm", "run", "start"]
