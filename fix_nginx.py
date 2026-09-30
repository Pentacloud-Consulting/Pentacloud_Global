import paramiko
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

NGINX_CONFIG = """server {
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

server {
    listen 80;
    listen [::]:80;
    server_name pentacloudconsulting.com www.pentacloudconsulting.com;

    # Fix: When behind Cloudflare proxy (Flexible SSL),
    # X-Forwarded-Proto is "https" — DON'T redirect (avoids ERR_TOO_MANY_REDIRECTS)
    # When direct HTTP connection, redirect to HTTPS
    if ($http_x_forwarded_proto = "https") {
        # Cloudflare is already serving HTTPS to user — proxy directly
        proxy_pass http://localhost:4002;
    }

    # Direct HTTP connection — redirect to HTTPS
    return 301 https://$host$request_uri;
}
"""

# Simpler approach: use map or separate location
# Actually the cleanest fix: proxy in HTTP block with CF check
NGINX_CONFIG_FIXED = """server {
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

# HTTP server - handles both direct connections and Cloudflare proxy
server {
    listen 80;
    listen [::]:80;
    server_name pentacloudconsulting.com www.pentacloudconsulting.com;

    location / {
        # If Cloudflare is proxying (Flexible SSL), X-Forwarded-Proto = "https"
        # In that case serve content directly to avoid redirect loop
        # If direct HTTP, redirect to HTTPS
        set $do_redirect 1;
        if ($http_x_forwarded_proto = "https") {
            set $do_redirect 0;
        }

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
}
"""

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('31.97.207.239', username='root', password='Pentacloud@2026', timeout=30)
print("Connected to VPS")

# The cleanest fix: use a map directive or separate the logic
# Best approach: HTTP block redirects to HTTPS ONLY if not coming from Cloudflare proxy
FINAL_CONFIG = r"""server {
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

server {
    listen 80;
    listen [::]:80;
    server_name pentacloudconsulting.com www.pentacloudconsulting.com;

    # Cloudflare Flexible SSL sends X-Forwarded-Proto: https
    # In that case, proxy directly (no redirect) to avoid ERR_TOO_MANY_REDIRECTS
    # For direct HTTP connections, redirect to HTTPS
    if ($http_x_forwarded_proto = "https") {
        return 200 "OK from HTTP with CF proxy";
    }

    return 301 https://$host$request_uri;
}
"""

# Write using a heredoc to avoid quoting issues
cmd = """cat > /etc/nginx/sites-available/pentacloudconsulting.com << 'NGINXEOF'
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
    }
}
NGINXEOF
echo "Config written"
"""

_, stdout, stderr = client.exec_command(cmd)
out = stdout.read().decode('utf-8', errors='replace')
err = stderr.read().decode('utf-8', errors='replace')
print("Write config:", out, err)

# Test nginx config
_, stdout, stderr = client.exec_command('nginx -t 2>&1')
print("Nginx test:", stdout.read().decode('utf-8', errors='replace'))

# Reload nginx
_, stdout, stderr = client.exec_command('systemctl reload nginx && echo "Nginx reloaded OK"')
print("Reload:", stdout.read().decode('utf-8', errors='replace'))

client.close()
print("Done!")
