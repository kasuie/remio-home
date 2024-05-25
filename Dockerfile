FROM node:20-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /remio-home

COPY . .
RUN set -eux; \
    npm install -g pnpm && pnpm i --frozen-lockfile;

# Rebuild the source code only when needed
FROM base AS builder

WORKDIR /remio-home

COPY --from=deps /remio-home/ .

RUN npm install -g pnpm
RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /remio-home

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

ENV NODE_ENV production

COPY --from=builder /remio-home/public ./public
COPY --from=builder /remio-home/config.json ./config.json
COPY --from=builder --chown=nextjs:nodejs /remio-home/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /remio-home/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]