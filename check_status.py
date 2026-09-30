import paramiko
import sys

sys.stdout.reconfigure(encoding='utf-8')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('31.97.207.239', username='root', password='Pentacloud@2026', timeout=30)

_, stdout, _ = client.exec_command('pm2 list --no-color')
print(stdout.read().decode('utf-8', errors='replace'))

_, stdout, _ = client.exec_command('curl -sk -o /dev/null -w "HTTP_%{http_code}" https://localhost')
print("HTTPS localhost:", stdout.read().decode('utf-8', errors='replace'))

_, stdout, _ = client.exec_command('curl -sk -o /dev/null -w "HTTP_%{http_code}" http://localhost:4002')
print("HTTP 4002:", stdout.read().decode('utf-8', errors='replace'))

client.close()
print("Done!")
