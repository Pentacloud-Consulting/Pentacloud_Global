import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('31.97.207.239', username='root', password='Pentacloud@2026', timeout=30)

_, stdout, _ = client.exec_command('cat /etc/nginx/sites-available/pentacloudconsulting.com')
print("=== CURRENT NGINX CONFIG ===")
print(stdout.read().decode('utf-8', errors='replace'))

client.close()
