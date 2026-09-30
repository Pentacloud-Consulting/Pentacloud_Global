import paramiko
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('31.97.207.239', username='root', password='Pentacloud@2026', timeout=30)

# Test Tier 1: Direct IP
print("=== Tier 1: Direct IP test ===")
_, o, _ = client.exec_command(
    'curl -s -o /dev/null -w "%{http_code}" '
    '--connect-timeout 10 '
    '-H "Host: pentacloudconsulting.com" '
    '"http://82.180.142.220/wp-json/wp/v2/posts?per_page=1" 2>&1'
)
print("Direct IP response:", o.read().decode('utf-8', errors='replace'))

# Test with verbose to see what happens
print("\n=== Tier 1 verbose ===")
_, o, _ = client.exec_command(
    'curl -v --connect-timeout 10 '
    '-H "Host: pentacloudconsulting.com" '
    '"http://82.180.142.220/wp-json/wp/v2/posts?per_page=1" 2>&1 | head -30'
)
print(o.read().decode('utf-8', errors='replace'))

# Test Tier 2: wp subdomain
print("\n=== Tier 2: wp.pentacloudconsulting.com ===")
_, o, _ = client.exec_command(
    'curl -s -o /dev/null -w "%{http_code}" '
    '--connect-timeout 10 '
    '"https://wp.pentacloudconsulting.com/wp-json/wp/v2/posts?per_page=1" 2>&1'
)
print("wp subdomain response:", o.read().decode('utf-8', errors='replace'))

# Test DNS resolution for wp subdomain
print("\n=== DNS for wp.pentacloudconsulting.com ===")
_, o, _ = client.exec_command('dig +short wp.pentacloudconsulting.com 2>&1')
print(o.read().decode('utf-8', errors='replace'))

# Test if port 80 on Hostinger IP is open
print("\n=== Port connectivity to Hostinger ===")
_, o, _ = client.exec_command('nc -zv -w5 82.180.142.220 80 2>&1')
print(o.read().decode('utf-8', errors='replace'))

client.close()
