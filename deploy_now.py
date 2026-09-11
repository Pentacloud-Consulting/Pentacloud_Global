import paramiko
import io, sys, time
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

HOST = "31.97.207.239"
USER = "root"
PASS = "Pentacloud@2026"
APP_DIR = "/var/www/pentacloud"

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASS, timeout=15)
print("[OK] Connected!\n")

def run(cmd, timeout=300):
    print(f"\n{'='*60}\n>>> {cmd}\n{'='*60}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = stdout.read().decode("utf-8", errors="replace")
    err = stderr.read().decode("utf-8", errors="replace")
    if out.strip(): print(out)
    if err.strip(): print(f"[STDERR]: {err}")
    return out

print("=== STEP 1: Pull latest code from git ===")
result = run(f"cd {APP_DIR} && git pull origin main 2>&1")
if "Already up to date" in result:
    print("[INFO] Code is already up to date on server")
elif "error" in result.lower() or "fatal" in result.lower():
    print("[WARNING] Git pull had issues, continuing...")

print("\n=== STEP 2: Install dependencies ===")
run(f"cd {APP_DIR} && npm install --legacy-peer-deps 2>&1")

print("\n=== STEP 3: Build Next.js app (this takes a few minutes) ===")
build_out = run(f"cd {APP_DIR} && npm run build 2>&1", timeout=480)
if "error" in build_out.lower() and "failed" in build_out.lower():
    print("\n[BUILD FAILED] Checking for errors...")
    run(f"cd {APP_DIR} && cat .next/build-manifest.json 2>/dev/null | head -5 || echo 'No build manifest'")
    sys.exit(1)

print("\n=== STEP 4: Restart PM2 process ===")
run("pm2 restart pentacloud")
time.sleep(3)

print("\n=== STEP 5: Save PM2 state ===")
run("pm2 save")

print("\n=== STEP 6: Verify app is running ===")
run("pm2 show pentacloud | grep -E 'status|restarts|uptime|pid'")

print("\n=== STEP 7: Test app responding ===")
time.sleep(2)
run("curl -s http://localhost:4000/ 2>/dev/null | grep -o '<title>.*</title>' | head -3 || echo 'App not responding yet'")

print("\n=== STEP 8: Check recent PM2 error log ===")
run("pm2 logs pentacloud --lines 10 --nostream 2>/dev/null")

client.close()
print("""
================================================================
[DONE] Deployment complete!

IMPORTANT - DNS ACTION REQUIRED:
The domain pentacloud.me is still pointing to Hostinger's old
shared hosting. To fix it, you must:

1. Go to Hostinger DNS panel for pentacloud.me
2. DELETE the ALIAS record (@  ->  pentacloud.me.cdn.hstgr.net)
3. DELETE the CNAME record (www  ->  www.pentacloud.me.cdn.hstgr.net)
4. ADD a new A record:  @  ->  31.97.207.239
5. ADD a new A record:  www  ->  31.97.207.239

After DNS propagates (5-60 min), https://pentacloud.me will show
your new Next.js site!
================================================================
""")
