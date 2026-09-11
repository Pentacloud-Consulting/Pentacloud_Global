import paramiko
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

HOST = "31.97.207.239"
USER = "root"
PASS = "Pentacloud@2026"

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASS, timeout=15)
print("[OK] Connected!\n")

def run(cmd, timeout=20):
    print(f"\n{'='*60}\n>>> {cmd}\n{'='*60}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode("utf-8", errors="replace")
    err = stderr.read().decode("utf-8", errors="replace")
    if out.strip(): print(out)
    if err.strip(): print(f"[STDERR]: {err}")
    return out

# Step 1: First confirm what port pentacloud is actually on
print("=== Confirming Pentacloud port ===")
run("cat /root/.pm2/logs/pentacloud-out.log | grep -i 'port\\|listen\\|ready\\|started' | tail -20")
run("cat /root/.pm2/logs/pentacloud-error.log | tail -20")
run("curl -s http://localhost:4000 2>/dev/null | grep -o '<title>.*</title>' | head -3 || echo 'port 4000 empty'")

# Step 2: Write correct nginx config pointing to port 4000
nginx_config = """server {
    listen 80;
    listen [::]:80;
    server_name pentacloud.me www.pentacloud.me;
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
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
}
"""

print("\n=== Writing corrected nginx config (port 4000) ===")
# Write to temp file
write_cmd = "cat > /tmp/pentacloud_fix.conf << 'NGINX_EOF'\n" + nginx_config + "\nNGINX_EOF"
run(write_cmd)

# Apply to the correct config file
run("""
CONF_FILE=$(ls /etc/nginx/sites-enabled/pentacloud 2>/dev/null || ls /etc/nginx/sites-enabled/pentacloud.conf 2>/dev/null | head -1)
if [ -z "$CONF_FILE" ]; then
    CONF_FILE="/etc/nginx/sites-enabled/pentacloud"
fi
echo "Applying to: $CONF_FILE"
cp /tmp/pentacloud_fix.conf $CONF_FILE
cat $CONF_FILE
""")

# Test and reload
out, err = run("nginx -t 2>&1")
if 'successful' in out or 'successful' in err:
    print("\n[OK] Config valid! Reloading nginx...")
    run("systemctl reload nginx")
    print("\n=== Verifying fix ===")
    run("curl -sk https://localhost/ -H 'Host: pentacloud.me' | grep -o '<title>.*</title>' | head -3")
    print("\n[DONE] Fixed! Pentacloud should now be live at https://pentacloud.me")
else:
    print("\n[ERROR] nginx config test failed!")

client.close()
