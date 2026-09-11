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
    return out + err

# Reload nginx
run("systemctl reload nginx && echo 'NGINX RELOADED OK'")

# Verify - curl the site
result = run("curl -sk https://localhost/ -H 'Host: pentacloud.me' | grep -o '<title>.*</title>' | head -3")

if 'Pentacloud' in result:
    print("\n✅ SUCCESS! Pentacloud Consulting is now correctly served at https://pentacloud.me")
else:
    print(f"\n[DEBUG] Got: {result}")
    # Check what's on port 4000 just to confirm
    run("curl -s http://localhost:4000 | grep -o '<title>.*</title>'")

client.close()
print("\n=== Done ===")
