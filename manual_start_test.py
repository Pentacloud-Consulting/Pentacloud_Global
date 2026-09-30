import paramiko
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('31.97.207.239', username='root', password='Pentacloud@2026', timeout=30)

# Check if .next build exists
_, stdout, _ = client.exec_command('ls -la /var/www/pentacloud-india/.next/ 2>&1 | head -10')
print("=== .next directory ===")
print(stdout.read().decode('utf-8', errors='replace'))

# Check if BUILD_ID exists (confirms build completed)
_, stdout, _ = client.exec_command('cat /var/www/pentacloud-india/.next/BUILD_ID 2>&1')
print("Build ID:", stdout.read().decode('utf-8', errors='replace'))

# Check node versions
_, stdout, _ = client.exec_command('node --version && npm --version 2>&1')
print("System node/npm:", stdout.read().decode('utf-8', errors='replace'))

# Try starting pentacloud-com manually to see the error
_, stdout, _ = client.exec_command(
    'cd /var/www/pentacloud-india && timeout 8 npm start -- -p 4002 2>&1 || true'
)
time.sleep(10)
out = stdout.read().decode('utf-8', errors='replace')
print("=== Manual start test (port 4002) ===")
print(out)

client.close()
