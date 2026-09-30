import paramiko
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('31.97.207.239', username='root', password='Pentacloud@2026', timeout=30)
print("Connected to VPS")

# Step 1: Write the fixed nginx config using python sftp
sftp = client.open_sftp()

nginx_config = """\
server {
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
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/pentacloudconsulting.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pentacloudconsulting.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

# HTTP server block — serves app directly (no redirect)
# This prevents ERR_TOO_MANY_REDIRECTS when Cloudflare AAAA is proxied (Flexible SSL)
# Direct HTTP clients are still served — Next.js handles any app-level redirects
server {
    listen 80;
    listen [::]:80;
    server_name pentacloudconsulting.com www.pentacloudconsulting.com;

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location / {
        proxy_pass http://localhost:4002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
    }
}
"""

with sftp.open('/etc/nginx/sites-available/pentacloudconsulting.com', 'w') as f:
    f.write(nginx_config)
sftp.close()
print("Nginx config written via SFTP")

# Step 2: Test nginx config
_, stdout, stderr = client.exec_command('nginx -t 2>&1')
result = stdout.read().decode('utf-8', errors='replace')
print("Nginx test:", result)

if 'successful' not in result and 'ok' not in result.lower():
    print("ERROR: Nginx test failed!")
    client.close()
    sys.exit(1)

# Step 3: Reload nginx
_, stdout, stderr = client.exec_command('systemctl reload nginx && echo "NGINX_RELOADED_OK"')
result = stdout.read().decode('utf-8', errors='replace')
print("Reload:", result)

# Step 4: Pull latest code and restart PM2
print("\n--- Pulling latest code ---")
_, stdout, stderr = client.exec_command(
    'cd /var/www/pentacloud-india && git pull origin main 2>&1'
)
time.sleep(15)
print(stdout.read().decode('utf-8', errors='replace'))

# Step 5: Install deps and rebuild
print("\n--- Building ---")
_, stdout, stderr = client.exec_command(
    'cd /var/www/pentacloud-india && npm ci --production=false 2>&1 && npm run build 2>&1 | tail -20'
)
time.sleep(120)
out = stdout.read().decode('utf-8', errors='replace')
print(out[-3000:] if len(out) > 3000 else out)

# Step 6: Restart PM2
print("\n--- Restarting PM2 ---")
_, stdout, stderr = client.exec_command('pm2 restart pentacloud-com && pm2 restart pentacloud-in && echo "PM2_RESTARTED"')
time.sleep(10)
print(stdout.read().decode('utf-8', errors='replace'))

# Step 7: Verify
_, stdout, stderr = client.exec_command('curl -sk -o /dev/null -w "HTTPS:%{http_code}" https://localhost && echo "" && curl -sk -o /dev/null -w "HTTP:%{http_code}" http://localhost:4002')
print("Status check:", stdout.read().decode('utf-8', errors='replace'))

client.close()
print("\nDone!")
