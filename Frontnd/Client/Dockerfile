# Stage 1: Build the Next.js application
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Create the final production image
FROM node:18-alpine
WORKDIR /app

# Copy the standalone output
COPY --from=build /app/.next/standalone ./
# Copy the static assets
COPY --from=build /app/.next/static ./.next/static
# Copy public assets
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
