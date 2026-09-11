import paramiko
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import time
import sys

HOST = "31.97.207.239"
USER = "root"
PASS = "Pentacloud@2026"
APP_DIR = "/var/www/pentacloud"
PM2_NAME = "pentacloud"

commands = [
    ("git pull origin main", 60),
    ("npm install 2>&1", 120),
    ("npm run build 2>&1", 300),
    (f"pm2 restart {PM2_NAME} || pm2 start npm --name {PM2_NAME} -- start", 30),
    (f"pm2 save", 10),
]

def run_command(shell, cmd, timeout=60):
    print(f"\n{'='*60}")
    print(f">>> {cmd}")
    print('='*60)
    shell.send(f"cd {APP_DIR} && {cmd}\n")
    time.sleep(2)
    output = ""
    start = time.time()
    while True:
        if shell.recv_ready():
            chunk = shell.recv(4096).decode("utf-8", errors="replace")
            output += chunk
            print(chunk, end="", flush=True)
        if time.time() - start > timeout:
            print("\n[TIMEOUT - moving on]")
            break
        # Check for prompt ($ or #)
        if output.strip().endswith("$") or output.strip().endswith("#"):
            # Wait a bit more for any trailing output
            time.sleep(2)
            if shell.recv_ready():
                chunk = shell.recv(4096).decode("utf-8", errors="replace")
                output += chunk
                print(chunk, end="", flush=True)
            break
        time.sleep(0.5)
    return output

print("=== Pentacloud VPS Deployment ===")
print(f"Connecting to {USER}@{HOST}...")

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    client.connect(HOST, username=USER, password=PASS, timeout=15)
    print("[OK] Connected!")

    for cmd, timeout in commands:
        stdin, stdout, stderr = client.exec_command(f"cd {APP_DIR} && {cmd}", timeout=timeout)
        
        print(f"\n{'='*60}")
        print(f">>> {cmd}")
        print('='*60)
        
        # Stream stdout
        for line in iter(lambda: stdout.readline(2048), ""):
            print(line, end="", flush=True)
        
        # Print stderr
        err = stderr.read().decode("utf-8", errors="replace")
        if err.strip():
            print(f"[STDERR]: {err}")
        
        exit_code = stdout.channel.recv_exit_status()
        print(f"\n[Exit code: {exit_code}]")
        
        if exit_code != 0 and "pm2 restart" not in cmd and "pm2 save" not in cmd:
            print(f"⚠ Command failed with exit code {exit_code}")

    print("\n=== [DONE] Deployment Complete! ===")
    print("Site should be live at: https://pentacloud.me/")

except Exception as e:
    print(f"\n[ERROR]: {e}")
    sys.exit(1)
finally:
    client.close()
