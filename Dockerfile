FROM node:22-alpine AS base
ARG VERSION

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /remio-home

COPY . .
RUN set -eux; \
    npm install -g pnpm && pnpm i --frozen-lockfile;

FROM base AS builder

WORKDIR /remio-home

COPY --from=deps /remio-home/ .

RUN npm install -g pnpm && pnpm run build

FROM base AS runner
WORKDIR /remio-home

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

ENV CONFIG_DIR=/remio-home/config NODE_ENV=production IS_DOCKER=1 VERSION=${VERSION}

COPY --from=builder /remio-home/public ./public
COPY --from=builder --chown=nextjs:nodejs /remio-home/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /remio-home/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]