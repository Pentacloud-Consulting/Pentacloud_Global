import socket
import urllib.request
import ssl
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

DOMAIN = "pentacloud.me"
EXPECTED_IP = "31.97.207.239"

print("=== Checking DNS propagation ===")
try:
    resolved_ip = socket.gethostbyname(DOMAIN)
    print(f"  {DOMAIN} resolves to: {resolved_ip}")
    if resolved_ip == EXPECTED_IP:
        print(f"  ✅ DNS is pointing to your VPS ({EXPECTED_IP})")
    else:
        print(f"  ⏳ DNS not yet propagated. Still pointing to: {resolved_ip}")
        print(f"     Expected: {EXPECTED_IP}")
        print("     Wait a few more minutes and try again.")
except Exception as e:
    print(f"  ❌ DNS lookup failed: {e}")

print("\n=== Checking HTTPS response ===")
try:
    ctx = ssl.create_default_context()
    req = urllib.request.Request(
        f"https://{DOMAIN}/",
        headers={"User-Agent": "Mozilla/5.0"}
    )
    with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
        html = resp.read().decode("utf-8", errors="replace")
        # Extract title
        start = html.find("<title>")
        end = html.find("</title>")
        if start != -1 and end != -1:
            title = html[start+7:end]
            print(f"  Page title: {title}")
            if "Pentacloud" in title and "Trusted" in title:
                print("  ✅ NEW site is live! Correct page is showing.")
            elif "Pentacloud" in title:
                print("  ✅ Pentacloud site is live.")
            else:
                print(f"  ⚠️  Unexpected title - might be old site: {title}")
        print(f"  HTTP Status: {resp.status}")
except Exception as e:
    print(f"  ❌ HTTPS check failed: {e}")
    print("     This could mean DNS hasn't propagated yet.")

print("\n=== Summary ===")
print(f"  Domain:   https://{DOMAIN}/")
print(f"  VPS IP:   {EXPECTED_IP}")
print("  If DNS shows correct IP but site still looks old,")
print("  try clearing browser cache (Ctrl+Shift+R).")
