# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nitro

# Copy built output from builder stage
COPY --from=builder --chown=nitro:nodejs /app/.output ./.output

USER nitro

# Expose the port Cloud Run expects (defaults to 8080)
ENV PORT=8080
ENV HOST=0.0.0.0
EXPOSE 8080

# Start the Nitro server
CMD ["node", ".output/server/index.mjs"]
