import paramiko
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

HOST = "31.97.207.239"
USER = "root"
PASS = "Pentacloud@2026"

NGINX_CONFIG = """server {
    listen 80;
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

commands = [
    # Backup old config
    ("cp /etc/nginx/sites-enabled/pentacloud /etc/nginx/sites-enabled/pentacloud.bak", 10),
    # Write new config
    (f"cat > /etc/nginx/sites-enabled/pentacloud << 'NGINXEOF'\n{NGINX_CONFIG}\nNGINXEOF", 10),
    # Test nginx config
    ("nginx -t", 10),
    # Reload nginx
    ("systemctl reload nginx", 10),
    # Verify it works
    ("curl -sk https://pentacloud.me/ | grep -o '<title>[^<]*</title>'", 15),
]

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASS, timeout=15)
print("[OK] Connected! Fixing HTTPS config for pentacloud.me...\n")

for cmd, timeout in commands:
    print(f"\n{'='*60}")
    print(f">>> {cmd[:80]}...")
    print('='*60)
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode("utf-8", errors="replace")
    err = stderr.read().decode("utf-8", errors="replace")
    if out.strip(): print(out)
    if err.strip(): print(f"[STDERR]: {err}")

print("\n=== HTTPS Fix Complete! ===")
print("Try https://pentacloud.me/ now!")
client.close()
