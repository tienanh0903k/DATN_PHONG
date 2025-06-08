# --- BUILD STAGE ---
    FROM node:18-alpine AS build

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    RUN npm run build
    
    # --- PRODUCTION STAGE ---
    FROM node:18-alpine

    WORKDIR /app

    COPY package*.json ./
    RUN npm install --production

    COPY --from=build /app/dist ./dist
    COPY .env .

    # Thêm dòng này
    RUN npx prisma generate

    EXPOSE 5000

    CMD ["node", "dist/index.js"]

    