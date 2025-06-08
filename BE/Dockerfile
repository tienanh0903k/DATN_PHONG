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
    
    # COPY thêm thư mục prisma và dist
    COPY --from=build /app/dist ./dist
    COPY --from=build /app/prisma ./prisma
    COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma  # Bổ sung cho chắc
    COPY .env .
    
    RUN npx prisma generate
    
    EXPOSE 5000
    
    CMD ["node", "dist/index.js"]
    