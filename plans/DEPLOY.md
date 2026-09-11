# 🚀 Pentacloud — Deployment Guide

> Share this file to trigger a full Git → Server deployment to **https://pentacloud.me**

---

## 📦 Project Info

| Key | Value |
|-----|-------|
| **Project** | Pentacloud Consulting Website |
| **Framework** | Next.js 16.2.4 (Turbopack) |
| **Repo** | `https://github.com/Pentacloud-Consulting/Pentacloud_Revamp.git` |
| **Branch** | `main` |
| **Local Path** | `c:\Users\zuhaib\OneDrive\Desktop\Office Websites\Pentacloud Consulting` |

---

## 🖥️ Server Info

| Key | Value |
|-----|-------|
| **Host** | `31.97.207.239` |
| **User** | `root` |
| **Password** | `Pentacloud@2026` |
| **App Directory** | `/var/www/pentacloud` |
| **Port** | `4000` |
| **Process Manager** | PM2 (`pentacloud`) |
| **Domain** | `https://pentacloud.me` |

---

## ⚡ Deploy Instructions (for AI)

When the user says **"deploy"** or **"push to domain"**, follow these exact steps:

### Step 1 — Check Git Status
```powershell
git status
```

### Step 2 — Stage & Commit All Changes
```powershell
git add src/; git commit -m "feat: <describe changes here>"
```

### Step 3 — Push to GitHub
```powershell
git push origin main
```

### Step 4 — Run Deploy Script
```powershell
python deploy_now.py
```
> The script is located at the project root: `deploy_now.py`  
> It handles: `git pull` → `npm install` → `npm run build` → `pm2 restart`

### Step 5 — Verify
Check that the output contains:
- ✅ `✓ Compiled successfully`
- ✅ `✓ Ready in Xms`
- ✅ `<title>Pentacloud Consulting...</title>` in the curl test

---

## 🗂️ Deploy Script Location

```
c:\Users\zuhaib\OneDrive\Desktop\Office Websites\Pentacloud Consulting\deploy_now.py
```

The script uses **paramiko** (SSH) to connect to the server and run all build steps remotely.

---

## 🌐 DNS Records (Hostinger)

| Type | Name | Value |
|------|------|-------|
| A | `@` | `31.97.207.239` |
| A | `www` | `31.97.207.239` |

> If the domain isn't showing the new site, check that the above A records are set in the Hostinger DNS panel and the old ALIAS/CNAME records pointing to `*.cdn.hstgr.net` are removed.

---

## 📋 Pages / Routes

| Route | Type |
|-------|------|
| `/` | Static |
| `/about` | Static |
| `/blogs` | Static |
| `/contact` | Static |
| `/services/salesforce` | Static |
| `/services/cloud` | Static |
| `/services/web` | Static |
| `/services/app` | Static |
| `/services/consulting` | Static |
| `/services/data-migration` | Static |
| `/services/digital-marketing` | Static |
| `/services/zoho` | Static |
| `/api/contact` | Dynamic (server-rendered) |

---

## 🔧 Troubleshooting

| Issue | Fix |
|-------|-----|
| `Failed to find Server Action` in PM2 logs | Normal after deploy — old browser tabs, clears itself |
| Build fails | Check `npm run build` output for TypeScript errors |
| App not responding | Run `pm2 restart pentacloud` manually via SSH |
| Domain still showing old site | DNS hasn't propagated yet, wait 5–60 min |
