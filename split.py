import re
import os

cwd = r"c:\Users\vishnu\Documents\Betterealestate"
filename = os.path.join(cwd, "index.html")

with open(filename, 'r', encoding='utf-8') as f:
    content = f.read()

# Define output pages
pages = {
    'about': 'about.html',
    'services': 'services.html',
    'india': 'india.html',
    'dubai': 'dubai.html',
    'why': 'why.html',
    'process': 'process.html',
    'testimonials': 'reviews.html',
    'contact': 'contact.html',
    'hero': 'index.html'
}

# The sections have standard formats: <section id="something">...</section>
section_pattern = re.compile(r'<!-- ═══════════════════════════════════════════\s*SECTION.*?════════════════════════════════════════════ -->\s*<section id="([^"]+)">.*?</section>', re.DOTALL)

sections = {}
for match in section_pattern.finditer(content):
    sec_id = match.group(1)
    sections[sec_id] = match.group(0)

# We also need to extract everything before the first section (header) and everything after the last section (footer+scripts)
# The first section is hero
hero_start = content.find('<!-- ═══════════════════════════════════════════\n     SECTION 1 – HERO')
header = content[:hero_start]

last_section_end = 0
for match in section_pattern.finditer(content):
    last_section_end = match.end()

footer = content[last_section_end:]

def replace_links(html):
    for sec_id, filename in pages.items():
        html = html.replace(f'href="#{sec_id}"', f'href="{filename}"')
    return html

# Generate index.html (only hero)
index_html = header + sections['hero'] + footer
index_html = replace_links(index_html)
with open(os.path.join(cwd, "index.html"), "w", encoding="utf-8") as f:
    f.write(index_html)

print("Generated index.html")

# Generate other pages
for sec_id, page_filename in pages.items():
    if sec_id == 'hero':
        continue
    
    if sec_id not in sections:
        print(f"WARNING: Section {sec_id} not found!")
        continue
        
    page_html = header + sections[sec_id] + footer
    page_html = replace_links(page_html)
    
    with open(os.path.join(cwd, page_filename), "w", encoding="utf-8") as f:
        f.write(page_html)
    print(f"Generated {page_filename}")
