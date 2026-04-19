/* ─── PROPERTY CARD ─── */
function pc(p) {
  return `<div class="prop-card"><div class="iw"><img src="${p.img}" alt="${p.t}" loading="lazy"><span class="badge-tag">${p.tg}</span></div><div class="bd"><h4>${p.t}</h4><div class="loc">${pin} ${p.l}</div><div class="meta"><span>🛏 ${p.b} Beds</span><span>📐 ${p.a}</span></div><div class="rw"><span class="price">${p.p}</span><button class="vb" data-openm-t="${p.t}" data-openm-s="${p.l} — ${p.p}">Enquire</button></div></div></div>`;
}

/* ─── PROPERTY SLIDER ─── */
function sl(props, id) {
  return `<div class="slider-wrap"><button class="sb l" data-ss="${id}" data-ss-dir="-1">←</button><div class="slider-track" id="${id}">${props.map(pc).join("")}</div><button class="sb r" data-ss="${id}" data-ss-dir="1">→</button></div>`;
}

/* ─── DEVELOPER SLIDER ─── */
function devSl(devs, id) {
  return `<div class="slider-wrap" style="padding:40px 0;"><button class="sb l" data-ss="${id}" data-ss-dir="-1">←</button><div class="slider-track" id="${id}">${devs.concat(devs).map((d) => `<div class="dev-card" data-openm-t="${d.n}" data-openm-s="Are you looking for properties related to ${d.n}? Our experts can help you find the perfect match."><img src="${d.l}" alt="${d.n}"><p>${d.n}</p></div>`).join("")}</div><button class="sb r" data-ss="${id}" data-ss-dir="1">→</button></div>`;
}
