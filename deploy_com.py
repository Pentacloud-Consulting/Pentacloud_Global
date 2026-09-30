import paramiko
import io, sys, time
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

HOST = "31.97.207.239"
USER = "root"
PASS = "Pentacloud@2026"
APP_DIR = "/var/www/pentacloud-india"

NGINX_CONF = """server {
    listen 80;
    server_name pentacloudconsulting.com www.pentacloudconsulting.com;
    location / {
        proxy_pass http://localhost:4002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}"""

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASS, timeout=20)
print("[OK] Connected to VPS!\n")

def run(cmd, timeout=600, label=None):
    tag = label or cmd[:70]
    print(f"\n{'='*65}")
    print(f">>> {tag}")
    print('='*65)
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = stdout.read().decode("utf-8", errors="replace")
    err = stderr.read().decode("utf-8", errors="replace")
    code = stdout.channel.recv_exit_status()
    if out.strip(): print(out.strip())
    if err.strip() and code != 0: print(f"[STDERR]: {err.strip()}")
    print(f"[Exit: {code}]")
    return out, code

# ── STEP 1: Pull latest code ─────────────────────────────────────────────────
print("\n\n╔══════════════════════════════════════════╗")
print("║  STEP 1: Pull latest code from GitHub   ║")
print("╚══════════════════════════════════════════╝")
run(f"cd {APP_DIR} && git pull origin main 2>&1", label="git pull origin main")

# ── STEP 2: Install dependencies ─────────────────────────────────────────────
print("\n\n╔══════════════════════════════════════════╗")
print("║  STEP 2: npm install                    ║")
print("╚══════════════════════════════════════════╝")
run(f"cd {APP_DIR} && npm install --legacy-peer-deps 2>&1", timeout=180, label="npm install --legacy-peer-deps")

# ── STEP 3: Build ────────────────────────────────────────────────────────────
print("\n\n╔══════════════════════════════════════════╗")
print("║  STEP 3: Build Next.js (~3-5 min)       ║")
print("╚══════════════════════════════════════════╝")
build_out, build_code = run(
    f"cd {APP_DIR} && NODE_OPTIONS='--max-old-space-size=3072' npm run build 2>&1",
    timeout=600, label="npm run build"
)
if build_code != 0:
    print("\n[BUILD FAILED] Aborting deployment.")
    client.close()
    sys.exit(1)

# ── STEP 4: Restart pentacloud-in ────────────────────────────────────────────
print("\n\n╔══════════════════════════════════════════╗")
print("║  STEP 4: Restart pentacloud-in (4001)   ║")
print("╚══════════════════════════════════════════╝")
run("pm2 restart pentacloud-in 2>&1 || echo 'pentacloud-in not found, skipping'", label="pm2 restart pentacloud-in")

# ── STEP 5: Setup pentacloud-com (4002) ──────────────────────────────────────
print("\n\n╔══════════════════════════════════════════╗")
print("║  STEP 5: Setup pentacloud-com (4002)    ║")
print("╚══════════════════════════════════════════╝")

# Check if already running
check_out, _ = run("pm2 list 2>&1 | grep pentacloud-com", label="Check if pentacloud-com exists")

if "pentacloud-com" in check_out:
    print("[INFO] pentacloud-com already exists — restarting...")
    run("pm2 restart pentacloud-com 2>&1", label="pm2 restart pentacloud-com")
else:
    print("[INFO] Starting pentacloud-com for the first time on port 4002...")
    run(
        f"cd {APP_DIR} && pm2 start npm --name pentacloud-com -- start -- -p 4002 2>&1",
        label="pm2 start pentacloud-com on port 4002"
    )

# ── STEP 6: Save PM2 state ───────────────────────────────────────────────────
run("pm2 save 2>&1", label="pm2 save")

# ── STEP 7: Nginx config for pentacloudconsulting.com ────────────────────────
print("\n\n╔══════════════════════════════════════════╗")
print("║  STEP 6: Configure Nginx                ║")
print("╚══════════════════════════════════════════╝")

# Write Nginx config
nginx_cmd = f"cat > /etc/nginx/sites-available/pentacloudconsulting.com << 'NGINXEOF'\n{NGINX_CONF}\nNGINXEOF"
run(nginx_cmd, label="Write Nginx config")

# Enable site (ignore if symlink already exists)
run(
    "ln -sf /etc/nginx/sites-available/pentacloudconsulting.com /etc/nginx/sites-enabled/pentacloudconsulting.com",
    label="Enable Nginx site"
)

# Test and reload
nginx_out, nginx_code = run("nginx -t 2>&1 && systemctl reload nginx", label="nginx -t && reload")
if nginx_code != 0:
    print("[WARNING] Nginx test failed — check config manually")

# ── STEP 8: SSL via Certbot ──────────────────────────────────────────────────
print("\n\n╔══════════════════════════════════════════╗")
print("║  STEP 7: SSL Certificate (Certbot)      ║")
print("╚══════════════════════════════════════════╝")
ssl_out, ssl_code = run(
    "certbot --nginx -d pentacloudconsulting.com -d www.pentacloudconsulting.com --non-interactive --agree-tos -m contactus@pentacloudconsulting.com 2>&1",
    timeout=120, label="certbot SSL for pentacloudconsulting.com"
)

# ── STEP 9: Final verification ───────────────────────────────────────────────
print("\n\n╔══════════════════════════════════════════╗")
print("║  STEP 8: Verification                   ║")
print("╚══════════════════════════════════════════╝")
run("pm2 status 2>&1", label="pm2 status")
time.sleep(3)
run("curl -sI http://localhost:4002 2>&1 | head -5", label="curl localhost:4002")
run("curl -sI https://pentacloudconsulting.com 2>&1 | head -5", label="curl pentacloudconsulting.com")

client.close()

print("""
╔═══════════════════════════════════════════════════════════════╗
║              DEPLOYMENT COMPLETE!                             ║
║                                                               ║
║  pentacloud.in         → port 4001  (PM2: pentacloud-in)     ║
║  pentacloudconsulting.com → port 4002 (PM2: pentacloud-com)  ║
║                                                               ║
║  Visit: https://pentacloudconsulting.com                     ║
╚═══════════════════════════════════════════════════════════════╝
""")
