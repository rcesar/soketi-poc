FROM quay.io/soketi/soketi:1.6.1-16-distroless AS soketi

WORKDIR /app
COPY . .

EXPOSE 9601
EXPOSE 6001

CMD ["/app/bin/server.js", "start", "--config=/app/config.json"]