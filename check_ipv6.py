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

def run(cmd, timeout=15):
    print(f"\n{'='*60}\n>>> {cmd}\n{'='*60}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout)
    out = stdout.read().decode("utf-8", errors="replace")
    err = stderr.read().decode("utf-8", errors="replace")
    if out.strip(): print(out)
    if err.strip(): print(f"[STDERR]: {err}")
    return out

# Check VPS IPv6 address
run("ip -6 addr show scope global | grep inet6")
run("curl -6 -s https://ifconfig.me 2>/dev/null || echo 'No IPv6 internet access'")
run("ip addr | grep -E 'inet6.*global'")

client.close()
