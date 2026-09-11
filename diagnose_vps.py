import paramiko
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

HOST = "31.97.207.239"
USER = "root"
PASS = "Pentacloud@2026"

checks = [
    # Check what's on port 443 for pentacloud.me
    "nginx -T 2>/dev/null | grep -B5 -A30 '443'",
    # Check all SSL certs available
    "ls /etc/letsencrypt/live/ 2>/dev/null",
    # Check if pentacloud has SSL cert
    "ls /etc/letsencrypt/live/pentacloud* 2>/dev/null || echo 'No pentacloud SSL cert found'",
    # Check the curl with host header on port 443
    "curl -sk -H 'Host: pentacloud.me' https://localhost/ | head -5",
    # Check which nginx config handles 443 with pentacloud
    "grep -r 'pentacloud' /etc/nginx/sites-enabled/ 2>/dev/null",
]

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASS, timeout=15)
print("[OK] Connected!\n")

for cmd in checks:
    print(f"\n{'='*60}")
    print(f">>> {cmd}")
    print('='*60)
    stdin, stdout, stderr = client.exec_command(cmd, timeout=20)
    out = stdout.read().decode("utf-8", errors="replace")
    err = stderr.read().decode("utf-8", errors="replace")
    if out.strip(): print(out)
    if err.strip(): print(f"[STDERR]: {err}")

client.close()
