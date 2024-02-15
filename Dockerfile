FROM node:lts-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
COPY example.env .env
RUN pnpm build
EXPOSE 3000
CMD ["node", "build"]