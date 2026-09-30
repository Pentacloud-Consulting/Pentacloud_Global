import paramiko
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('31.97.207.239', username='root', password='Pentacloud@2026', timeout=30)
print("Connected")

# Git pull
_, o, _ = client.exec_command('cd /var/www/pentacloud-india && git pull origin main 2>&1')
time.sleep(8)
print("Git pull:", o.read().decode('utf-8', errors='replace'))

# Clean .next and rebuild (no TS check, fast)
_, o, _ = client.exec_command('rm -rf /var/www/pentacloud-india/.next && echo "Cleaned"')
print(o.read().decode('utf-8', errors='replace'))

print("--- Building ---")
transport = client.get_transport()
ch = transport.open_session()
ch.get_pty()
ch.exec_command('cd /var/www/pentacloud-india && export NODE_OPTIONS="--max-old-space-size=2048" && npm run build 2>&1')

output = ''
start = time.time()
while True:
    if ch.recv_ready():
        chunk = ch.recv(8192).decode('utf-8', errors='replace')
        output += chunk
        for line in chunk.split('\n'):
            l = line.strip()
            if any(x in l for x in ['✓', 'error', 'Error', 'FATAL', 'compiled', 'Failed', 'Route', 'done']):
                print(l)
    if ch.exit_status_ready():
        while ch.recv_ready():
            output += ch.recv(8192).decode('utf-8', errors='replace')
        break
    if time.time() - start > 420:
        print("TIMEOUT!")
        break
    time.sleep(2)

code = ch.recv_exit_status()
print(f"Build exit code: {code}")

if code == 0:
    _, o, _ = client.exec_command('cat /var/www/pentacloud-india/.next/BUILD_ID 2>&1')
    print("BUILD_ID:", o.read().decode('utf-8', errors='replace').strip())

    # Restart PM2
    _, o, _ = client.exec_command('pm2 restart pentacloud-com && pm2 restart pentacloud-in 2>&1 && echo "RESTARTED"')
    time.sleep(8)
    print(o.read().decode('utf-8', errors='replace'))

    # Wait for startup
    time.sleep(8)

    # Verify
    _, o, _ = client.exec_command('curl -s -o /dev/null -w "4002=%{http_code}" http://localhost:4002')
    print("Port 4002:", o.read().decode('utf-8', errors='replace'))

    # Test blog API
    _, o, _ = client.exec_command('curl -s "http://localhost:4002/api/wp-blogs?domain=pentacloudconsulting.com" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); posts=d.get(chr(100)+chr(97)+chr(116)+chr(97),[]); print(chr(80)+chr(111)+chr(115)+chr(116)+chr(115)+chr(58),len(posts))" 2>&1')
    print("Blog API:", o.read().decode('utf-8', errors='replace'))
else:
    print("BUILD FAILED! Last output:")
    print(output[-2000:])

client.close()
print("Done!")
