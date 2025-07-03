FROM oven/bun:1-alpine AS base
WORKDIR /app

# install
FROM base AS install
RUN mkdir -p /temp/cache-bun
COPY package.json bun.lock /temp/cache-bun/
RUN cd /temp/cache-bun && bun install --frozen-lockfile

FROM base AS run
COPY --from=install /temp/cache-bun /app/

EXPOSE 1337/tcp
ENTRYPOINT [ "bun", "dev" ]
