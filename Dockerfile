# ---------------------------------------
# Base stage.
# ---------------------------------------
FROM node:22.1.0-alpine3.19 AS base
ENV HUSKY=0

# Install `pnpm`.
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN mkdir $PNPM_HOME && \
    wget -qO- "https://github.com/pnpm/pnpm/releases/download/v9.12.3/pnpm-linuxstatic-arm64" > "$PNPM_HOME/pnpm" && \
    chmod +x $PNPM_HOME/pnpm && \
    ln -s $PNPM_HOME/pnpm /usr/local/bin/pnpm

WORKDIR /app

# ---------------------------------------
# Build stage.
# ---------------------------------------
FROM base AS build
ENV ASTRO_TELEMETRY_DISABLED=0

# Copy dependencies configurations.
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm fetch

# Install dependencies.
RUN pnpm install --offline --frozen-lockfile

COPY . .
RUN pnpm build

# Remove node_modules and reinstall only production dependencies
RUN rm -rf node_modules && \
    pnpm install --offline --ignore-scripts --prod

# ---------------------------------------
# Production stage.
# ---------------------------------------
FROM base AS production
ENV HOST=0.0.0.0
ENV NODE_ENV=production

# 1. Create a new user named `zero`.
# 2. Change the permission of `app` folder to user `zero`.
# 3. Change the current user from `root` to `zero`.
RUN addgroup -S zero && \
    adduser -S zero -G zero && \
    chown zero:zero /app
USER zero

COPY --from=build --chown=zero:zero /app/package.json /app/pnpm-lock.yaml /app/
COPY --from=build --chown=zero:zero /app/build /app/build
COPY --from=build --chown=zero:zero /app/node_modules /app/node_modules

EXPOSE 4321
CMD ["pnpm", "start"]
