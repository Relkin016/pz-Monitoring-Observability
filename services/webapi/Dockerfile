FROM node:20-alpine AS builder
WORKDIR /app

# Копіюємо файли залежностей
COPY package*.json ./
RUN npm install --production

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]