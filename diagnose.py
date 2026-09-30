import paramiko
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('31.97.207.239', username='root', password='Pentacloud@2026', timeout=30)

# Stop the crash loop first
_, stdout, _ = client.exec_command('pm2 stop pentacloud-com pentacloud-in 2>&1')
time.sleep(3)
print("Stopped:", stdout.read().decode('utf-8', errors='replace'))

# Check what command PM2 uses to start pentacloud-com
_, stdout, _ = client.exec_command('pm2 show pentacloud-com 2>&1 | head -40')
print("=== pentacloud-com config ===")
print(stdout.read().decode('utf-8', errors='replace'))

# Check what command PM2 uses to start pentacloud-in
_, stdout, _ = client.exec_command('pm2 show pentacloud-in 2>&1 | head -40')
print("=== pentacloud-in config ===")
print(stdout.read().decode('utf-8', errors='replace'))

# Check package.json start script
_, stdout, _ = client.exec_command('cat /var/www/pentacloud-india/package.json | grep -A5 "scripts"')
print("=== package.json scripts ===")
print(stdout.read().decode('utf-8', errors='replace'))

# Check ports in use
_, stdout, _ = client.exec_command('ss -tlnp | grep -E "4001|4002|3000"')
print("=== Ports in use ===")
print(stdout.read().decode('utf-8', errors='replace'))

# Check .env.local on VPS
_, stdout, _ = client.exec_command('ls -la /var/www/pentacloud-india/.env* 2>&1')
print("=== .env files on VPS ===")
print(stdout.read().decode('utf-8', errors='replace'))

client.close()
