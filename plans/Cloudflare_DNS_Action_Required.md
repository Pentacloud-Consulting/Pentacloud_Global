# 🚨 Action Required — Cloudflare DNS Update for pentacloudconsulting.com

**Date:** September 30, 2026
**Priority:** 🔴 High
**Raised by:** Development Team
**Requires Action from:** Cloudflare Account Owner

---

## ✅ What Has Been Done (Development Side — Complete)

| Task | Status |
| :--- | :--- |
| Next.js website fully built and tested | ✅ Done |
| All blog pages working (WordPress integration) | ✅ Done |
| App deployed on VPS server (`31.97.207.239`) | ✅ Done |
| Nginx reverse proxy configured for `pentacloudconsulting.com` | ✅ Done |
| SSL certificate (`certbot`) attempted | ❌ Blocked by DNS |

**The website is 100% ready on the server.** The only remaining step is a DNS change on Cloudflare.

---

## 🔍 The Problem — Cloudflare is Blocking the Domain

`pentacloudconsulting.com` uses **Cloudflare as its nameserver**:

```
mia.ns.cloudflare.com
vern.ns.cloudflare.com
```

Currently Cloudflare is routing the domain to the **old Hostinger shared hosting** (WordPress/PHP server).
Our **new Next.js website on the VPS is ready** but cannot go live until Cloudflare points the domain to the correct server IP.

Additionally, the **SSL certificate cannot be issued** until DNS correctly points to the VPS — causing the site to remain on the old server.

---

## 🛠️ Exact Action Required on Cloudflare

**Person required:** Whoever has login access to the Cloudflare account for `pentacloudconsulting.com`
**Time needed:** Less than 5 minutes
**Risk:** Zero — the WordPress blog will continue working via the `wp` subdomain

---

### Step 1 — Log in to Cloudflare

Go to: **https://cloudflare.com** → Login → Select `pentacloudconsulting.com`

---

### Step 2 — Go to DNS → Records

Navigate to: **DNS → Records** in the left sidebar

---

### Step 3 — Delete Old A Records

Find and **delete** any existing `A` records for `@` (root) and `www` that point to old IPs:

> Look for IPs like `104.21.x.x` or `172.67.x.x` — these are Cloudflare proxy IPs pointing to the old Hostinger server. Delete them.

---

### Step 4 — Add These 2 New Records

| Type | Name | IPv4 Address | Proxy Status | TTL |
| :--- | :--- | :--- | :--- | :--- |
| `A` | `@` | `31.97.207.239` | 🔘 **DNS only (Grey Cloud)** | Auto |
| `A` | `www` | `31.97.207.239` | 🔘 **DNS only (Grey Cloud)** | Auto |

> ⚠️ **CRITICAL:** The proxy toggle MUST be **"DNS only" (grey cloud icon)**, NOT "Proxied" (orange cloud icon).
> This is required so the SSL certificate can be issued. After SSL is issued, the orange cloud can be re-enabled.

---

### Step 5 — Keep This Record Unchanged (Do NOT delete)

| Type | Name | IPv4 Address | Purpose |
| :--- | :--- | :--- | :--- |
| `A` | `wp` | `82.180.142.220` | WordPress blog backend on Hostinger — must NOT be changed |

---

### Step 6 — Notify the Development Team

Once the 2 DNS records are added, inform the development team immediately.
We will then run (takes ~5 minutes):

1. SSL certificate issuance via `certbot`
2. Live site verification at `https://pentacloudconsulting.com`
3. Re-enable Cloudflare proxy (orange cloud) if desired after SSL

**Total time after DNS update → Site goes live: ~5 minutes**

---

## 📊 Architecture After This Change

```
User visits pentacloudconsulting.com
        │
        ▼
  Cloudflare DNS  (A @ → 31.97.207.239)
        │
        ▼
  VPS Server (31.97.207.239)
  Nginx → Port 4002  →  PM2: pentacloud-com
        │
        ▼
  Next.js Website ✅ LIVE


User visits pentacloudconsulting.com/blogs
        │
        ▼  (server-side API call, invisible to user)
  wp.pentacloudconsulting.com  (A wp → 82.180.142.220)
        │
        ▼
  Hostinger Shared Hosting → WordPress REST API ✅
```

---

## 🔒 Is This Safe for WordPress?

**Yes — 100% safe.** The WordPress installation on Hostinger is NOT being touched or moved.

- The `wp` subdomain (`wp.pentacloudconsulting.com → 82.180.142.220`) stays on Hostinger permanently
- WordPress admin (`/wp-admin`) continues to work as before
- All existing blog posts, media, and data remain intact on Hostinger
- Only the **main website frontend** moves to the faster VPS

---

## 📞 Summary for Boss

| What | Details |
| :--- | :--- |
| **What we need** | 2 DNS records added in Cloudflare (5 minutes of work) |
| **Who needs to do it** | Cloudflare account owner for pentacloudconsulting.com |
| **VPS IP to point to** | `31.97.207.239` |
| **Risk to WordPress** | Zero — WordPress stays on Hostinger via `wp` subdomain |
| **After DNS change** | Dev team issues SSL and site goes live within 5 minutes |
