FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app ./
RUN npm prune --production
# Railway sets PORT dynamically — Strapi reads it from env
EXPOSE ${PORT:-1337}
HEALTHCHECK --interval=30s --timeout=30s --start-period=120s --retries=3 \
  CMD wget -qO- http://localhost:${PORT:-1337}/_health || exit 1
CMD ["npm", "run", "start"]
