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

def run(cmd, timeout=300):
    print(f"\n{'='*60}\n>>> {cmd}\n{'='*60}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = stdout.read().decode("utf-8", errors="replace")
    err = stderr.read().decode("utf-8", errors="replace")
    if out.strip(): print(out)
    if err.strip(): print(f"[STDERR]: {err}")
    return out

PROJECT_DIR = "/var/www/pentacloud"

print(f"\n[1] Pulling latest code from git in {PROJECT_DIR}...")
run(f"cd {PROJECT_DIR} && git pull origin main")

print("\n[2] Installing any new dependencies...")
run(f"cd {PROJECT_DIR} && npm install --legacy-peer-deps")

print("\n[3] Building the Next.js app...")
run(f"cd {PROJECT_DIR} && npm run build")

print("\n[4] Restarting PM2 process 'pentacloud'...")
run("pm2 restart pentacloud")

print("\n[5] Saving PM2 state...")
run("pm2 save")

print("\n[6] Checking status...")
run("pm2 show pentacloud | grep -E 'status|restarts|path'")

client.close()
print("\n[DONE] Deployment complete! Site should be live at https://pentacloud.me/")
