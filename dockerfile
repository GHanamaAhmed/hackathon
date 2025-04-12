# Stage 1: Build the Next.js application
FROM node:16-alpine AS builder
WORKDIR /app

# Copy dependency manifests and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application and build it
COPY . .
RUN npm run build

# Stage 2: Prepare the production container
FROM node:16-alpine AS runner
WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production

# Copy only production dependency manifests and install production dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy over the built Next.js output and public assets from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the default port used by Next.js
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
