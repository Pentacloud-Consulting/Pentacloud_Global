# 🚀 Pentacloud Deployment & Maintenance Guide

This document covers deployment for both **`pentacloud.in`** and **`pentacloudconsulting.com`** — both share the same codebase and VPS.

---

## 🏗️ Architecture Overview

| Domain | Port | Server Directory | PM2 Process | DNS | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`pentacloud.in`** | `4001` | `/var/www/pentacloud-india` | `pentacloud-in` | Hostinger NS | 🟢 Live |
| **`pentacloudconsulting.com`** | `4002` | `/var/www/pentacloud-india` | `pentacloud-com` | Cloudflare NS | 🟢 Live |
| **`wp.pentacloudconsulting.com`** | — | Hostinger Shared (`82.180.142.220`) | WordPress | Cloudflare NS | 🟢 Blog Backend |
| **`pentacloud.me`** | `4000` | `/var/www/pentacloud` | `pentacloud` | — | 🟢 Dubai/Global |

> ⚠️ **SAME CODEBASE:** `pentacloud.in` and `pentacloudconsulting.com` both run from `/var/www/pentacloud-india`. The app auto-detects which domain is serving via `getDomainConfig()` in `src/Web-Page/Blogs/Dynamic Change Blog.tsx`.

> 🔒 **Blog isolation:** WordPress stays on Hostinger forever — never move it to the VPS.

---

## 🌐 pentacloudconsulting.com — Full Setup Reference

### Infrastructure

```
VPS IP:         31.97.207.239
VPS Password:   Pentacloud@2026
SSH:            ssh root@31.97.207.239

Hostinger IP:   82.180.142.220     ← WordPress blog backend
GitHub Repo:    https://github.com/Pentacloud-Consulting/Pentacloud_Global.git
```

### DNS (Cloudflare controls this domain)

| Record | Type | Value | Proxy |
|--------|------|-------|-------|
| `@` | A | `31.97.207.239` | ⚪ DNS only |
| `www` | A | `31.97.207.239` | ⚪ DNS only |
| `wp` | A | `82.180.142.220` | ⚪ DNS only |
| `@` | AAAA | VPS IPv6 | Keep as-is |

> ⚠️ **Critical:** The AAAA record must also be grey cloud (DNS only). If Cloudflare proxy is ON + Hostinger SSL mode is "Flexible" → `ERR_TOO_MANY_REDIRECTS`.

### SSL Certificate

```bash
# Auto-renews via cron. Expires: 2026-12-29
# Manual renew if needed:
certbot renew --nginx
```

### Nginx Config

File: `/etc/nginx/sites-available/pentacloudconsulting.com`

```nginx
server {
    server_name pentacloudconsulting.com www.pentacloudconsulting.com;
    location / {
        proxy_pass http://localhost:4002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/pentacloudconsulting.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pentacloudconsulting.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
server {
    listen 80; listen [::]:80;
    server_name pentacloudconsulting.com www.pentacloudconsulting.com;
    location / {
        proxy_pass http://localhost:4002;  # No redirect — avoids CF loop
        proxy_set_header Host $host;
    }
}
```

### PM2 Process Config

```bash
# pentacloud-com is registered as:
#   script: /usr/bin/npm
#   args:   start -- -p 4002
#   cwd:    /var/www/pentacloud-india

pm2 show pentacloud-com   # inspect config
```

---

## 📝 How Blog Fetching Works (WordPress on Hostinger)

The blog pages fetch from WordPress using a **2-tier HTTPS strategy** in `route.ts` and `Dynamic Change Blog.tsx`:

```
Tier 1 → HTTPS directly to 82.180.142.220:443
         Host: pentacloudconsulting.com
         rejectUnauthorized: false   ← SSL cert is for domain, not IP
         (Bypasses DNS + avoids 301 redirect loop)

Tier 2 → https://wp.pentacloudconsulting.com
         (Works when Cloudflare DNS has wp → 82.180.142.220)
```

> ⚠️ **Why `rejectUnauthorized: false`?**
> Hostinger forces HTTP → HTTPS redirect. The redirect destination is `pentacloudconsulting.com`, which now points to our VPS (not Hostinger). So we skip HTTP entirely and hit HTTPS on the IP directly with cert validation disabled.

---

## 💻 Deploying Updates to pentacloudconsulting.com

### Option A — Quick (via `rebuild.py` script, from local machine)

```powershell
# From project root:
git add -A
git commit -m "your update"
git push origin main

python rebuild.py   # SSH → git pull → build → pm2 restart
```

### Option B — Manual (SSH into VPS)

```bash
ssh root@31.97.207.239
cd /var/www/pentacloud-india

git pull origin main

# IMPORTANT: Build with 2GB memory limit (VPS has limited RAM)
# TypeScript check is DISABLED in next.config.ts (ignoreBuildErrors: true)
# — prevents OOM during build
export NODE_OPTIONS="--max-old-space-size=2048"
npm run build

pm2 restart pentacloud-com
pm2 restart pentacloud-in   # Restart both — they share .next dir
pm2 save

# Verify
curl -s -o /dev/null -w "%{http_code}" http://localhost:4002
```

### ⚠️ Build Rules — MUST FOLLOW

```
✅ Always use: NODE_OPTIONS="--max-old-space-size=2048" npm run build
✅ next.config.ts has typescript.ignoreBuildErrors: true  — DO NOT REMOVE
✅ Restart BOTH pentacloud-com AND pentacloud-in after rebuild (shared .next dir)
❌ Never run plain `npm run build` without NODE_OPTIONS — will OOM crash
❌ Never do `npm ci` on VPS — use `npm install` only if packages changed
```

---

## 🔍 Verification Commands (pentacloudconsulting.com)

```bash
# App running?
pm2 status
curl -s -o /dev/null -w "%{http_code}" http://localhost:4002   # expect 200

# HTTPS working?
curl -sk -o /dev/null -w "%{http_code}" https://localhost   # expect 200

# Blog API working? (expect: {"data":[...100 posts...]})
curl -s "http://localhost:4002/api/wp-blogs?domain=pentacloudconsulting.com" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print('Posts:', len(d.get('data',[])))"

# Nginx OK?
nginx -t && systemctl status nginx

# SSL cert valid?
echo | openssl s_client -connect pentacloudconsulting.com:443 2>/dev/null | openssl x509 -noout -dates
```

---

## 🛡️ Emergency Rollback

```bash
ssh root@31.97.207.239
cd /var/www/pentacloud-india

git log --oneline -5          # see recent commits
git reset --hard HEAD~1       # revert 1 commit

export NODE_OPTIONS="--max-old-space-size=2048"
npm run build

pm2 restart pentacloud-com
pm2 restart pentacloud-in
pm2 save
```

---

## 📌 Checklist — pentacloudconsulting.com Update

- [ ] Changes committed & pushed to GitHub (`git push origin main`)
- [ ] SSH into VPS (`ssh root@31.97.207.239`)
- [ ] `git pull origin main` in `/var/www/pentacloud-india`
- [ ] Build: `NODE_OPTIONS="--max-old-space-size=2048" npm run build`
- [ ] Verify `BUILD_ID` exists: `cat .next/BUILD_ID`
- [ ] `pm2 restart pentacloud-com && pm2 restart pentacloud-in`
- [ ] `pm2 save`
- [ ] Verify: `curl -s -o /dev/null -w "%{http_code}" http://localhost:4002` → `200`
- [ ] Blog API: 100 posts returned
- [ ] Live site: [https://pentacloudconsulting.com](https://pentacloudconsulting.com) ✅

---

## 📌 Checklist — pentacloud.in Update

- [ ] Tested code build locally (`npm run build`)
- [ ] Pushed code to GitHub (`git push origin main`)
- [ ] SSH into VPS (`ssh root@31.97.207.239`)
- [ ] Pulled latest code in `/var/www/pentacloud-india`
- [ ] Verified `.env.local` configuration on server (if env variables changed)
- [ ] Rebuilt: `NODE_OPTIONS="--max-old-space-size=2048" npm run build`
- [ ] Restarted: `pm2 restart pentacloud-in && pm2 restart pentacloud-com && pm2 save`
- [ ] Verified live site at [https://pentacloud.in](https://pentacloud.in) ✅
