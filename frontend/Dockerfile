FROM node:20-slim as base

FROM base AS deps
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci


FROM base as builder
WORKDIR /app


COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


FROM base as production
WORKDIR /app

ENV NODE_ENV=production


COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

CMD ["npm", "start"]
