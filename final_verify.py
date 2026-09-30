import paramiko
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('31.97.207.239', username='root', password='Pentacloud@2026', timeout=30)

time.sleep(5)  # Let app warm up

# Test blog API
_, o, _ = client.exec_command(
    'curl -s "http://localhost:4002/api/wp-blogs?domain=pentacloudconsulting.com" | python3 -c '
    '"import sys,json; d=json.load(sys.stdin); posts=d.get(\'data\',[]) if isinstance(d,dict) else d; '
    'print(f\'Posts found: {len(posts)}\'); '
    '[print(f\' - {p.get(\"title\",{}).get(\"rendered\",\"???\")[:60]}\') for p in posts[:5]]" 2>&1'
)
print("=== Blog API (pentacloudconsulting.com) ===")
print(o.read().decode('utf-8', errors='replace'))

# Test homepage response
_, o, _ = client.exec_command(
    'curl -sk -o /dev/null -w "Homepage: %{http_code} | Time: %{time_total}s" https://localhost'
)
print(o.read().decode('utf-8', errors='replace'))

# PM2 status - just pentacloud processes
_, o, _ = client.exec_command('pm2 list --no-color 2>&1 | grep -E "id|pentacloud-com|pentacloud-in"')
print("\n" + o.read().decode('utf-8', errors='replace'))

client.close()
