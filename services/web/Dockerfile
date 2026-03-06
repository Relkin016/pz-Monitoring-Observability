FROM nginx:alpine

# Копіюємо конфігурацію
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копіюємо статичні файли
COPY index.html /usr/share/nginx/html/

EXPOSE 80