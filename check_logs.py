import paramiko
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('31.97.207.239', username='root', password='Pentacloud@2026', timeout=30)

# Get PM2 logs for pentacloud-com
_, stdout, _ = client.exec_command('pm2 logs pentacloud-com --lines 50 --nostream 2>&1')
print("=== PM2 LOGS pentacloud-com ===")
print(stdout.read().decode('utf-8', errors='replace'))

client.close()
