import os
import re

cwd = r"c:\Users\vishnu\Documents\Betterealestate"

with open(os.path.join(cwd, "about.html"), "r", encoding="utf-8") as f:
    about_html = f.read()

# Extract header
header_match = re.search(r'(.*?)(?=<!-- ═══════════════════════════════════════════\n\s*SECTION)', about_html, re.DOTALL)
header = header_match.group(1) if header_match else ""

# Extract footer
footer_match = re.search(r'(<!-- FOOTER -->.*)', about_html, re.DOTALL)
footer = footer_match.group(1) if footer_match else ""

# Wait, `footer` in `about.html` contains the inline `<script>` for `INDIA_PROPS`. We want to strip it.
# We will STRIP the inline script out of the extracted footer for ALL pages.
inline_script_pattern = re.compile(r'<!-- Property Data.*?</script>\s*', re.DOTALL)
footer = inline_script_pattern.sub('', footer)

def create_page(filename, section_html):
    page_content = header + section_html + footer
    with open(os.path.join(cwd, filename), "w", encoding="utf-8") as f:
        f.write(page_content)
    print(f"Generated {filename}")

# Generate India
india_section = """<!-- ═══════════════════════════════════════════
     SECTION 4 – INDIA
════════════════════════════════════════════ -->
<section id="india" style="padding: 100px 0;">
  <div class="container">
    <div class="section-header reveal">
      <span class="eyebrow">India Collection</span>
      <h2>Exclusive Indian Properties</h2>
      <div class="swiper-nav" style="display:flex; gap:12px; margin-top:20px;">
        <button class="swiper-btn india-prev btn" aria-label="Previous" style="padding:8px 16px;">&larr;</button>
        <button class="swiper-btn india-next btn" aria-label="Next" style="padding:8px 16px;">&rarr;</button>
      </div>
    </div>
  </div>
  <div class="swiper swiper-india swiper-fullbleed reveal" style="padding-top:40px;">
    <div class="swiper-wrapper" id="india-cards"></div>
  </div>
</section>
"""
create_page("india.html", india_section)

# Generate Dubai
dubai_section = """<!-- ═══════════════════════════════════════════
     SECTION 5 – DUBAI
════════════════════════════════════════════ -->
<section id="dubai" style="padding: 100px 0;">
  <div class="container">
    <div class="section-header reveal">
      <span class="eyebrow">Dubai Collection</span>
      <h2>Premium Dubai Residences</h2>
      <div class="swiper-nav" style="display:flex; gap:12px; margin-top:20px;">
        <button class="swiper-btn dubai-prev btn" aria-label="Previous" style="padding:8px 16px;">&larr;</button>
        <button class="swiper-btn dubai-next btn" aria-label="Next" style="padding:8px 16px;">&rarr;</button>
      </div>
    </div>
  </div>
  <div class="swiper swiper-dubai swiper-fullbleed reveal" style="padding-top:40px;">
    <div class="swiper-wrapper" id="dubai-cards"></div>
  </div>
</section>
"""
create_page("dubai.html", dubai_section)

# Clean ALL existing HTML files to remove the script
html_files = [f for f in os.listdir(cwd) if f.endswith('.html')]
for file in html_files:
    filepath = os.path.join(cwd, file)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    new_content = inline_script_pattern.sub('', content)
    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Cleaned {file}")
