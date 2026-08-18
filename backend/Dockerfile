FROM node:22-slim

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm install

ENV DATABASE_URL="postgresql://placeholder:placeholder@placeholder/placeholder"

RUN npx prisma generate

COPY . .

EXPOSE 8080

CMD ["npx", "tsx", "src/app.js"]