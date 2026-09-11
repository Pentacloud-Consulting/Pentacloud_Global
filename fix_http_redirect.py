import paramiko
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

HOST = "31.97.207.239"
USER = "root"
PASS = "Pentacloud@2026"

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASS, timeout=15)
print("[OK] Connected!\n")

def run(cmd, timeout=20):
    print(f"\n{'='*60}")
    print(f">>> {cmd}")
    print('='*60)
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode("utf-8", errors="replace")
    err = stderr.read().decode("utf-8", errors="replace")
    if out.strip(): print(out)
    if err.strip(): print(f"[STDERR]: {err}")
    return out, err

# === DIAGNOSE ===
print("\n\n====== DIAGNOSIS ======")
run("ls /etc/nginx/sites-enabled/")
run("cat /etc/nginx/sites-enabled/pentacloud* 2>/dev/null || cat /etc/nginx/sites-enabled/default 2>/dev/null | head -80")
run("curl -sv http://pentacloud.me/ 2>&1 | head -30")
run("netstat -tlnp | grep -E '80|443|3000'")

# === WHAT IS SERVING OLD SITE ON PORT 80? ===
run("nginx -T 2>/dev/null | grep -B5 -A20 'server_name.*pentacloud'")

# === WRITE CORRECT NGINX CONFIG ===
print("\n\n====== FIXING NGINX CONFIG ======")

nginx_config = r"""
server {
    listen 80;
    listen [::]:80;
    server_name pentacloud.me www.pentacloud.me;

    # Redirect all HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name pentacloud.me www.pentacloud.me;

    ssl_certificate /etc/letsencrypt/live/pentacloud.me/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pentacloud.me/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
"""

# Write to a temp file first
write_cmd = f"cat > /tmp/pentacloud_nginx.conf << 'NGINX_EOF'\n{nginx_config}\nNGINX_EOF"
run(write_cmd)

# Check if cert exists
out, _ = run("ls /etc/letsencrypt/live/pentacloud.me/ 2>/dev/null || echo 'NO_CERT'")

if 'NO_CERT' in out or 'No such file' in out:
    print("\n[!] SSL cert not found at /etc/letsencrypt/live/pentacloud.me/")
    print("[!] Checking for alternative cert paths...")
    run("ls /etc/letsencrypt/live/ 2>/dev/null")
    run("find /etc/nginx/sites-enabled/ -name '*pentacloud*' -exec cat {} \\;")
else:
    print("\n[OK] SSL cert found. Applying nginx config...")
    
    # Backup existing config
    run("cp /etc/nginx/sites-enabled/pentacloud* /tmp/pentacloud_nginx_backup.conf 2>/dev/null || true")
    
    # Find and overwrite the existing config file
    run("""
CONF_FILE=$(ls /etc/nginx/sites-enabled/pentacloud* 2>/dev/null | head -1)
if [ -z "$CONF_FILE" ]; then
    CONF_FILE="/etc/nginx/sites-enabled/pentacloud"
fi
echo "Writing to: $CONF_FILE"
cp /tmp/pentacloud_nginx.conf $CONF_FILE
""")
    
    # Test nginx config
    out2, err2 = run("nginx -t 2>&1")
    
    if 'successful' in out2 or 'successful' in err2:
        print("\n[OK] Nginx config test passed! Reloading nginx...")
        run("systemctl reload nginx")
        run("systemctl status nginx --no-pager | head -10")
        print("\n[DONE] HTTP -> HTTPS redirect is now configured!")
        print("All visitors to http://pentacloud.me will be redirected to https://pentacloud.me")
    else:
        print("\n[ERROR] Nginx config test failed. Reverting...")
        run("cp /tmp/pentacloud_nginx_backup.conf /etc/nginx/sites-enabled/pentacloud 2>/dev/null || true")

client.close()
print("\n=== Script Complete ===")
