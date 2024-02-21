FROM node:21-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

#copy .sh file
COPY start.sh /app/
RUN chmod +x /app/start.sh

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock  ./
RUN yarn --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables must be present at build time
ENV NODE_ENV production
ENV ENVIRONMENT_NAME production

RUN yarn build

RUN rm -rf node_modules && yarn install --production --frozen-lockfile && yarn cache clean

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs
ENV NODE_ENV production
ENV NODE_OPTIONS=--max-old-space-size=1700
# For migration and seeding
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/src ./src
# Copy env multiline file from Github Action Secret
COPY --from=builder /app/.env ./.env
# Copy code output and node_modules prod from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Start shell script
COPY --from=builder /app/start.sh ./dist/start.sh

EXPOSE 3005
CMD ["./dist/start.sh"]
