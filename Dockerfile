# ---------------------------------------
# Base stage.
# ---------------------------------------
FROM node:22.1.0-alpine3.19 as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV HUSKY=0

# Enable `corepack` to automatically download the detected package manager.
RUN corepack enable

WORKDIR /app

# ---------------------------------------
# Build stage.
# ---------------------------------------
FROM base as build

# Copy dependencies configurations.
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies.
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# ---------------------------------------
# Production stage.
# ---------------------------------------
FROM base as production
ENV HOST=0.0.0.0

# 1. Create a new user named `zero`.
# 2. Change the permission of `app` folder to user `zero`.
# 3. Change the current user from `root` to `zero`.
RUN addgroup -S zero && \
    adduser -S zero -G zero && \
    chown zero:zero /app
USER zero

COPY --from=build --chown=zero:zero /app/package.json /app/pnpm-lock.yaml /app/
COPY --from=build --chown=zero:zero /app/build /app/build

EXPOSE 4321
CMD ["pnpm", "start"]