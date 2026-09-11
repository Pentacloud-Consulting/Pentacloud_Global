import openpyxl
wb = openpyxl.load_workbook(r'c:\Users\zuhaib\OneDrive\Desktop\Office Websites\Pentacloud Consulting SEO\plans\Pentacloud_Keyword_Master_List.xlsx')
ws = wb['Keyword Master List']
headers = None
pillars = []
for row in ws.iter_rows(values_only=True):
    if not headers:
        headers = row
        continue
    if row[6] == 'Pillar':
        pillars.append(row)
print('PILLAR KEYWORDS:')
for p in pillars:
    print(f'  Cat={p[0]}, Loc={p[1]}, Keyword="{p[2]}", Vol={p[3]}, Diff={p[4]}')
print(f'\nTotal Pillars: {len(pillars)}')
