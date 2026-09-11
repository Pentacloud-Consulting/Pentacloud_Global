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

print("=== 1. PM2 processes ===")
run("pm2 list")

print("\n=== 2. What ports are listening ===")
run("ss -tlnp | grep -E '3000|4000|8080|80|443'")

print("\n=== 3. Nginx sites-enabled ===")
run("ls -la /etc/nginx/sites-enabled/")

print("\n=== 4. Nginx config for pentacloud ===")
run("cat /etc/nginx/sites-enabled/pentacloud 2>/dev/null || cat /etc/nginx/sites-enabled/default 2>/dev/null | head -60")

print("\n=== 5. Project directory exists? ===")
run("ls /var/www/pentacloud/ 2>/dev/null | head -20 || echo 'DIRECTORY NOT FOUND'")

print("\n=== 6. Git status in project ===")
run("cd /var/www/pentacloud && git log --oneline -5 2>/dev/null || echo 'NO GIT REPO'")

print("\n=== 7. Is Next.js running on port 3000? ===")
run("curl -s http://localhost:3000/ 2>/dev/null | grep -o '<title>.*</title>' | head -3 || echo 'Nothing on port 3000'")

print("\n=== 8. Is anything running on port 4000? ===")
run("curl -s http://localhost:4000/ 2>/dev/null | grep -o '<title>.*</title>' | head -3 || echo 'Nothing on port 4000'")

print("\n=== 9. PM2 logs (last 20 lines) ===")
run("pm2 logs pentacloud --lines 20 --nostream 2>/dev/null || echo 'No PM2 process named pentacloud'")

print("\n=== 10. SSL cert status ===")
run("certbot certificates 2>/dev/null | grep -E 'Domains|Expiry|Certificate Path' || echo 'Certbot not found or no certs'")

client.close()
print("\n[DONE] Diagnostics complete!")
