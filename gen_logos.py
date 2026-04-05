import os
devs = {
    "emaar": "Emaar Properties",
    "damac": "DAMAC Properties",
    "nakheel": "Nakheel",
    "sobha": "Sobha Realty",
    "meraas": "Meraas",
    "binghatti": "Binghatti",
    "dlf": "DLF Limited",
    "godrej": "Godrej Properties",
    "tata": "Tata Housing",
    "prestige": "Prestige Group",
    "lodha": "LODHA Group"
}

svg_template = """<svg width="200" height="80" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="80" fill="transparent"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">{name}</text>
</svg>"""

for key, name in devs.items():
    with open(f"developer_images/{key}.svg", "w") as f:
        f.write(svg_template.format(name=name))
print("Generated SVGs successfully.")
