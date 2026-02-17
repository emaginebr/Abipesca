# Stage 1: Build local npm packages and admin frontend
FROM node:22-alpine AS build

WORKDIR /app

# ── Build nauth-react ──
COPY nauth-react/package.json nauth-react/package-lock.json* ./nauth-react/
WORKDIR /app/nauth-react
RUN npm install
WORKDIR /app
COPY nauth-react/ ./nauth-react/
WORKDIR /app/nauth-react
RUN npm run build

# ── Build nnews-react (depends on nauth-react) ──
WORKDIR /app
COPY nnews-react/package.json nnews-react/package-lock.json* ./nnews-react/
WORKDIR /app/nnews-react
RUN npm install
WORKDIR /app
COPY nnews-react/ ./nnews-react/
WORKDIR /app/nnews-react
RUN npm run build

# ── Build bazzuca-react ──
WORKDIR /app
COPY BazzucaMedia/bazzuca-react/package.json BazzucaMedia/bazzuca-react/package-lock.json* ./BazzucaMedia/bazzuca-react/
WORKDIR /app/BazzucaMedia/bazzuca-react
RUN npm install
WORKDIR /app
COPY BazzucaMedia/bazzuca-react/ ./BazzucaMedia/bazzuca-react/
WORKDIR /app/BazzucaMedia/bazzuca-react
RUN npm run build

# ── Build admin frontend ──
WORKDIR /app
COPY admin/package.json admin/package-lock.json* ./admin/
WORKDIR /app/admin
RUN npm install
WORKDIR /app
COPY admin/ ./admin/
WORKDIR /app/admin
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built admin files
COPY --from=build /app/admin/dist /usr/share/nginx/html/admin

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
