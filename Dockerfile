# Stage 1: Build React frontend
FROM node:14-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the frontend source code
COPY . .

# Build the React frontend
RUN npm run build


# Stage 2: Serve Laravel application
FROM php:8.0-apache

WORKDIR /var/www/html

# Install required PHP extensions and dependencies
RUN docker-php-ext-install pdo_mysql \
    && apt-get update \
    && apt-get install -y libpng-dev libonig-dev libxml2-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache rewrite module
RUN a2enmod rewrite

# Copy the built React frontend from the previous stage
COPY --from=build /app/public ./public

# Copy the rest of the Laravel application
COPY . .

# Set permissions for Laravel storage and bootstrap/cache directories
RUN chown -R www-data:www-data storage bootstrap/cache

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev

# Generate application key
RUN php artisan key:generate --force

# Expose port 80
EXPOSE 80

# Start Apache web server
CMD ["apache2-foreground"]
