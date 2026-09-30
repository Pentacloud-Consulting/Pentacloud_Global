import paramiko
import sys
import json
import time

sys.stdout.reconfigure(encoding='utf-8')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('31.97.207.239', username='root', password='Pentacloud@2026', timeout=30)

time.sleep(3)

# Test blog API - get list
_, o, _ = client.exec_command(
    'curl -s "http://localhost:4002/api/wp-blogs?domain=pentacloudconsulting.com" 2>&1 | head -c 800'
)
raw = o.read().decode('utf-8', errors='replace')
print("=== Blog API Raw Response (first 800 chars) ===")
print(raw)

# Parse it
try:
    data = json.loads(raw)
    if isinstance(data, dict):
        posts = data.get('data', [])
        print(f"\nPosts found: {len(posts)}")
        for p in posts[:5]:
            title = p.get('title', {}).get('rendered', 'N/A')
            print(f"  - {title[:70]}")
    elif isinstance(data, list):
        print(f"\nPosts found: {len(data)}")
        for p in data[:5]:
            title = p.get('title', {}).get('rendered', 'N/A')
            print(f"  - {title[:70]}")
except Exception as e:
    print(f"Parse error: {e}")

print("\n")

# Check pentacloud.in is still working
_, o, _ = client.exec_command(
    'curl -s -o /dev/null -w "pentacloud.in (4001): %{http_code}" http://localhost:4001'
)
print(o.read().decode('utf-8', errors='replace'))

client.close()
