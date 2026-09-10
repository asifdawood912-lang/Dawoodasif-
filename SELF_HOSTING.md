# Self-Hosting Guide for GAZU

This guide provides instructions on how to self-host the **GAZU** application on your own server, VPS, or cloud container platform.

---

## Method 1: Docker & Docker Compose (Recommended)

### Prerequisites
- Docker Engine installed (`docker --version`)
- Docker Compose installed (`docker compose version`)

### Quick Start
1. Place the project files on your server.
2. Run:
   ```bash
   docker compose up -d --build
   ```
3. Your application will be live at `http://<your-server-ip>` on port 80.

To change the external port (for example, to port `3000` or `8080`), edit `docker-compose.yml`:
```yaml
ports:
  - "3000:80"
```

To stop the container:
```bash
docker compose down
```

---

## Method 2: Standalone Docker Command

If you do not want to use Docker Compose:

1. **Build the image**:
   ```bash
   docker build -t gazu-fashion-app .
   ```

2. **Run the container**:
   ```bash
   docker run -d --name gazu-app -p 80:80 --restart unless-stopped gazu-fashion-app
   ```

---

## Method 3: Direct Host (Node.js & PM2)

If you have Node.js 18+ installed on your VPS/server:

1. **Install dependencies and build**:
   ```bash
   npm install
   npm run build
   ```
   This generates the optimized static files in the `/dist` directory.

2. **Serve with a lightweight production server (`serve`)**:
   ```bash
   npm install -g serve pm2
   pm2 start --name "gazu-app" serve -- -s dist -l 3000
   ```

3. **Save PM2 process to start on system boot**:
   ```bash
   pm2 save
   pm2 startup
   ```

---

## Method 4: Existing Nginx Web Server

If your server already runs Nginx:

1. Build the production files:
   ```bash
   npm run build
   ```
2. Copy the contents of the `dist/` directory to your web root (e.g. `/var/www/gazu`):
   ```bash
   sudo cp -r dist/* /var/www/gazu/
   ```
3. In your Nginx site configuration (e.g., `/etc/nginx/sites-available/gazu`), configure the block:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       root /var/www/gazu;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```
4. Test and reload Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## Method 5: Cloud & Free Static Hosts

Because this app compiles to static HTML/JS/CSS, you can deploy it directly:
- **Vercel / Netlify / Cloudflare Pages**: Connect your Git repository, set build command to `npm run build` and output directory to `dist`.
- **Coolify / Portainer**: Select "Dockerfile" deployment and point to the repository.
