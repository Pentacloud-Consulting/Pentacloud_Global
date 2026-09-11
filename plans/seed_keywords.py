import requests
import uuid
from datetime import datetime, timezone
import sys
import json

SUPABASE_URL = "https://vvnzgnaqbyoylkxhnwja.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2bnpnbmFxYnlveWxreGhud2phIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzMwODA3NCwiZXhwIjoyMTAyODg0MDc0fQ.PIiOXqeWRWQ5zCnJp2_jpLCe4mEauJ09iqyWFR0EVtU"

PILLAR_KEYWORDS = [
    {"keyword": "salesforce partner dubai",           "vol": 70,   "diff": 10, "location": "Dubai, UAE",        "category": "Salesforce Consulting"},
    {"keyword": "salesforce consulting",              "vol": 10,   "diff": 18, "location": "Qatar",              "category": "Salesforce Consulting"},
    {"keyword": "salesforce partner in uae",          "vol": 30,   "diff": 16, "location": "UAE (All Emirates)", "category": "Salesforce Consulting"},
    {"keyword": "zoho partnership",                   "vol": 110,  "diff": 32, "location": "Dubai, UAE",        "category": "Zoho Service"},
    {"keyword": "zoho crm",                           "vol": 260,  "diff": 25, "location": "Qatar",              "category": "Zoho Service"},
    {"keyword": "zoho partner uae",                   "vol": 10,   "diff": 31, "location": "UAE (All Emirates)", "category": "Zoho Service"},
    {"keyword": "cloud consulting",                   "vol": 10,   "diff": 29, "location": "Dubai, UAE",        "category": "Cloud Solution"},
    {"keyword": "cloud solution",                     "vol": 10,   "diff": 27, "location": "Global / Worldwide", "category": "Cloud Solution"},
    {"keyword": "cloud solutions qatar",              "vol": 10,   "diff": 27, "location": "Qatar",              "category": "Cloud Solution"},
    {"keyword": "web development",                    "vol": 880,  "diff": 30, "location": "Dubai, UAE",        "category": "Web Development"},
    {"keyword": "web development design",             "vol": 70,   "diff": 15, "location": "Qatar",              "category": "Web Development"},
    {"keyword": "app development company in dubai",   "vol": 1000, "diff": 14, "location": "Dubai, UAE",        "category": "App Development"},
    {"keyword": "app development mobile",             "vol": 210,  "diff": 21, "location": "Qatar",              "category": "App Development"},
    {"keyword": "digital marketing agency",           "vol": 1300, "diff": 55, "location": "Dubai, UAE",        "category": "Digital Marketing"},
    {"keyword": "digital marketing",                  "vol": 590,  "diff": 33, "location": "Qatar",              "category": "Digital Marketing"},
    {"keyword": "data migration framework",           "vol": 110,  "diff": 18, "location": "Dubai, UAE",        "category": "Data Migration"},
    {"keyword": "data migration framework qatar",     "vol": 20,   "diff": 13, "location": "Qatar",              "category": "Data Migration"},
    {"keyword": "consulting and training",            "vol": 10,   "diff": 13, "location": "Dubai, UAE",        "category": "Consulting And Training"},
]

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

# Clear existing
print("Clearing existing keywords...")
resp = requests.delete(
    f"{SUPABASE_URL}/rest/v1/tracked_keywords?id=neq.00000000-0000-0000-0000-000000000000",
    headers=headers
)
print(f"Clear status: {resp.status_code}")

# Build payload
now = datetime.now(timezone.utc).isoformat()
payload = []
for kw in PILLAR_KEYWORDS:
    payload.append({
        "id": str(uuid.uuid4()),
        "keyword": kw["keyword"],
        "vol": kw["vol"],
        "diff": kw["diff"],
        "location": kw["location"],
        "created_at": now
    })

print(f"\nSeeding {len(payload)} pillar keywords...")
resp = requests.post(
    f"{SUPABASE_URL}/rest/v1/tracked_keywords",
    headers=headers,
    json=payload
)
print(f"Insert status: {resp.status_code}")
if resp.status_code in (200, 201):
    print(f"SUCCESS: Seeded {len(payload)} keywords!")
    for kw in PILLAR_KEYWORDS:
        print(f"  OK | {kw['keyword']} | Vol={kw['vol']} | Diff={kw['diff']} | {kw['location']}")
else:
    err = resp.json()
    print(f"ERROR: {json.dumps(err, indent=2)}")
