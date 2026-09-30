import paramiko
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('31.97.207.239', username='root', password='Pentacloud@2026', timeout=30)

# Wait a moment for app to settle
time.sleep(3)

# Check HTTP response on port 4002
_, stdout, _ = client.exec_command('curl -s -o /dev/null -w "%{http_code}" http://localhost:4002')
code4002 = stdout.read().decode('utf-8', errors='replace')
print(f"Port 4002 (pentacloud-com): {code4002}")

# Check HTTPS
_, stdout, _ = client.exec_command('curl -sk -o /dev/null -w "%{http_code}" https://localhost')
codeHttps = stdout.read().decode('utf-8', errors='replace')
print(f"HTTPS localhost: {codeHttps}")

# Check port 4001 (pentacloud-in)
_, stdout, _ = client.exec_command('curl -s -o /dev/null -w "%{http_code}" http://localhost:4001')
code4001 = stdout.read().decode('utf-8', errors='replace')
print(f"Port 4001 (pentacloud-in): {code4001}")

# Check blog API
_, stdout, _ = client.exec_command('curl -s "http://localhost:4002/api/wp-blogs?domain=pentacloudconsulting.com" | head -c 200')
blog_resp = stdout.read().decode('utf-8', errors='replace')
print(f"\nBlog API response preview:\n{blog_resp}")

# Quick PM2 status
_, stdout, _ = client.exec_command('pm2 list --no-color 2>&1 | grep -E "pentacloud|id"')
print("\nPM2 pentacloud processes:")
print(stdout.read().decode('utf-8', errors='replace'))

client.close()
print("Done!")
