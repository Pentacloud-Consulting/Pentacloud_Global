# 🚀 Pentacloud India (pentacloud.in) — Future Deployment & Maintenance Guide

This document contains exact, step-by-step instructions to safely deploy new features and updates to **`pentacloud.in`** without disturbing any other domain (`pentacloud.me` or `pentacloudconsulting.com`).

---

## 🏗️ Architecture Overview

| Domain | Port | Server Directory | PM2 Process Name | Status |
| :--- | :--- | :--- | :--- | :--- |
| **`pentacloud.in`** | `4001` | `/var/www/pentacloud-india` | `pentacloud-in` | 🟢 Active (India Site) |
| **`pentacloud.me`** | `4000` | `/var/www/pentacloud` | `pentacloud` | 🟢 Active (Dubai/Global Site) |
| **`pentacloudconsulting.com`** | `4002` | `/var/www/pentacloud-com` | `pentacloud-com` | 🟡 Ready for Setup |
| **`cms.pentacloudconsulting.com`** | Hostinger | Shared Hosting (`82.180.142.220`) | WordPress Engine | 🟢 Headless WP for Blogs |

> 🔒 **Isolation Guarantee:** All projects (`pentacloud.in`, `pentacloud.me`, and `pentacloudconsulting.com`) run in separate isolated server directories with unique PM2 ports. Updating one site will **NEVER** break another. Headless WordPress for blogs runs safely on `cms.pentacloudconsulting.com`.

---

## 💻 Step-by-Step Deployment Workflow

Follow these steps whenever you add new features or update code for **`pentacloud.in`**:

### Step 1: Push Changes from Local VS Code

Run these commands in your VS Code Terminal:

```powershell
# 1. Check modified files
git status

# 2. Stage all changes
git add -A

# 3. Commit your changes with a clear message
git commit -m "Feature: your update description"

# 4. Push code to GitHub
git push origin main
```

---

### Step 2: Deploy to VPS Server

Open your terminal (PowerShell / CMD) and SSH into your VPS:

```bash
# 1. Connect to VPS
ssh root@31.97.207.239
```
*(Password: `Pentacloud@2026`)*

Once connected, run these commands **one by one**:

```bash
# 2. Navigate to India project directory
cd /var/www/pentacloud-india

# 3. Pull latest code from GitHub
git pull origin main

# 4. Install dependencies (if new npm packages were added)
npm install --legacy-peer-deps

# 5. Build production bundle with increased Node memory limit
NODE_OPTIONS="--max-old-space-size=3072" npm run build

# 6. Restart the pentacloud-in process under PM2
pm2 restart pentacloud-in
```

---

## 🔍 Verification Commands

After restarting PM2, verify that everything is running smoothly:

```bash
# Check status of all PM2 apps
pm2 status

# View live logs for pentacloud.in to confirm zero errors
pm2 logs pentacloud-in --lines 30

# Test Nginx status
nginx -t
```

---

## 🛡️ Emergency Rollback (If anything goes wrong)

If a build fails or you want to immediately revert to the previous working version on the server:

```bash
# 1. Navigate to India directory
cd /var/www/pentacloud-india

# 2. Revert to previous git commit
git reset --hard HEAD~1

# 3. Rebuild previous version
NODE_OPTIONS="--max-old-space-size=3072" npm run build

# 4. Restart PM2 process
pm2 restart pentacloud-in
```

---

## 📌 Summary Checklist for Future Updates

- [ ] Tested code locally (`npm run dev` / `npm run build`)
- [ ] Pushed to GitHub (`git push origin main`)
- [ ] SSH into VPS (`ssh root@31.97.207.239`)
- [ ] Pulled latest code in `/var/www/pentacloud-india`
- [ ] Rebuilt with memory flag `NODE_OPTIONS="--max-old-space-size=3072"`
- [ ] Restarted PM2 (`pm2 restart pentacloud-in`)
- [ ] Verified live site at [https://pentacloud.in](https://pentacloud.in)
