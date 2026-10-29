# --- Build: compila TypeScript con las dependencias de desarrollo ---
FROM node:24-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build && npm prune --omit=dev

# --- Runtime: solo dist/ y dependencias de producción ---
FROM node:24-slim
# Sin TZ: la app corre en UTC, igual que las columnas TIMESTAMP de Postgres.
# El cron mensual define su propia zona (America/Santiago).
ENV NODE_ENV=production
# curl lo usa el health check de Coolify (GET /ping)
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl ca-certificates \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/main"]
