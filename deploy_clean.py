import paramiko
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import time

HOST = "31.97.207.239"
USER = "root"
PASS = "Pentacloud@2026"
APP_DIR = "/var/www/pentacloud"
PM2_NAME = "pentacloud"

# Stop PM2, do a clean build, restart on correct port
commands = [
    ("pm2 stop pentacloud", 15),
    ("rm -rf .next", 30),
    ("git fetch origin && git reset --hard origin/main", 60),
    ("npm install 2>&1", 120),
    ("PORT=4000 npm run build 2>&1", 300),
    (f"pm2 restart {PM2_NAME} || pm2 start npm --name {PM2_NAME} -- start", 30),
    ("pm2 save", 10),
    ("pm2 logs pentacloud --lines 5 --nostream", 15),
]

def run_cmd(client, cmd, timeout=60):
    print(f"\n{'='*60}")
    print(f">>> {cmd}")
    print('='*60)
    stdin, stdout, stderr = client.exec_command(
        f"cd {APP_DIR} && {cmd}", timeout=timeout
    )
    for line in iter(lambda: stdout.readline(4096), ""):
        print(line, end="", flush=True)
    err = stderr.read().decode("utf-8", errors="replace")
    if err.strip():
        print(f"[STDERR]: {err}")
    exit_code = stdout.channel.recv_exit_status()
    print(f"\n[Exit code: {exit_code}]")
    return exit_code

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASS, timeout=15)
print("[OK] Connected!")
print(f"Performing CLEAN deployment to {APP_DIR}...\n")

for cmd, timeout in commands:
    rc = run_cmd(client, cmd, timeout)
    if rc != 0 and "pm2" not in cmd:
        print(f"\n⚠ Command failed! Stopping.")
        break

print("\n\n=== [DONE] Clean Deployment Complete! ===")
print("Site should now be live at: https://pentacloud.me/")
client.close()
