# Build stage
FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 go build -o portfolio .

# Run stage
FROM alpine:latest
WORKDIR /app

# Install openssh-client if you need key generation tools,
# though the Go app generates its own keys usually.
# Ca-certificates are good to have.
RUN apk add --no-cache ca-certificates

COPY --from=builder /app/portfolio .

# Create directory for host keys
RUN mkdir .ssh

# Expose the port defined in main.go
EXPOSE 23234

# Run the binary
CMD ["./portfolio"]
