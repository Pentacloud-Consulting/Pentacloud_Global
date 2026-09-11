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

# Step 1: Find what port each PM2 app is actually on
print("\n===== FINDING CORRECT PORTS =====")
run("pm2 list")
run("netstat -tlnp | grep node")
run("ss -tlnp | grep node")

# Step 2: Check what's on each port
run("curl -s http://localhost:3000 2>/dev/null | head -3 || echo 'port 3000 not responding'")
run("curl -s http://localhost:4000 2>/dev/null | head -3 || echo 'port 4000 not responding'")
run("curl -s http://localhost:3001 2>/dev/null | head -3 || echo 'port 3001 not responding'")

# Step 3: Find pentacloud app directory and check its port config
run("cat /var/www/pentacloud/package.json | grep -E 'start|port|PORT' | head -10")
run("pm2 show pentacloud 2>/dev/null | grep -E 'port|exec|script|cwd'")
run("pm2 show pentacloud 2>/dev/null | head -30")

client.close()
