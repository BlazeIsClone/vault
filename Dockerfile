FROM golang:1.26.2-alpine AS build
RUN apk add --no-cache alpine-sdk

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o main cmd/api/main.go

FROM alpine:3.20.1 AS prod
WORKDIR /app
COPY --from=build /app/main /app/main
EXPOSE ${PORT}
CMD ["./main"]


FROM oven/bun:1 AS web_builder
WORKDIR /web

COPY web/package.json web/bun.lock ./
RUN bun install --frozen-lockfile
COPY web/. .
RUN bun run build

FROM oven/bun:1-slim AS web
WORKDIR /app
COPY --from=web_builder /web/.output ./.output
ENV PORT=5173
EXPOSE 5173
CMD ["bun", ".output/server/index.mjs"]