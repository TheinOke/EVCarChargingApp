FROM node:22-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    libcurl4 \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
