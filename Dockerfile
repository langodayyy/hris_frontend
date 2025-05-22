FROM node:20-alpine

WORKDIR /var/www/html/frontend

# Copy package.json and package-lock.json (or pnpm-lock.yaml/yarn.lock)
COPY package*.json ./

RUN npm install --force

# Copy the rest of the application code
COPY . .

RUN npm run build

EXPOSE 3000

# Set environment variable to production
ENV NODE_ENV=production

# Start the Next.js app
CMD ["npm", "start"]