FROM oven/bun:1-alpine AS base

# install
FROM base AS install
RUN mkdir -p /temp/cache-bun
COPY package.json bun.lock /temp/cache-bun/
WORKDIR /temp/cache-bun
RUN bun install --frozen-lockfile

FROM base AS run
WORKDIR /app
COPY --from=install /temp/cache-bun /app/

EXPOSE 1337/tcp
ENTRYPOINT [ "bun", "dev" ]
