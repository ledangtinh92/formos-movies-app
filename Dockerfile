# Sử dụng một image cơ sở có sẵn (có thể là Node.js hoặc Nginx, tùy bạn cần)
FROM nginx:alpine

# Sao chép tệp tĩnh từ thư mục dist vào thư mục mặc định của Nginx
COPY dist/my-app /usr/share/nginx/html

# Cổng mà Nginx sẽ lắng nghe (mặc định là cổng 80)
EXPOSE 80

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]
