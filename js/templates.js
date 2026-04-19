/* ─── PROPERTY CARD ─── */
function pc(p) {
  return `<div class="prop-card"><div class="iw"><img src="${p.img}" alt="${p.t}" loading="lazy"><span class="badge-tag">${p.tg}</span></div><div class="bd"><h4>${p.t}</h4><div class="loc">${pin} ${p.l}</div><div class="meta"><span>🛏 ${p.b} Beds</span><span>📐 ${p.a}</span></div><div class="rw"><span class="price">${p.p}</span><button class="vb" data-openm-t="${p.t}" data-openm-s="${p.l} — ${p.p}">Enquire</button></div></div></div>`;
}

/* ─── PROPERTY SLIDER ─── */
function sl(props, id) {
  const arrowL = `<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`;
  const arrowR = `<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
  return `<div class="slider-wrap"><button class="sb l" data-ss="${id}" data-ss-dir="-1">${arrowL}</button><div class="slider-track" id="${id}">${props.map(pc).join("")}</div><button class="sb r" data-ss="${id}" data-ss-dir="1">${arrowR}</button></div>`;
}

/* ─── DEVELOPER SLIDER ─── */
function devSl(devs, id) {
  const arrowL = `<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`;
  const arrowR = `<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
  return `<div class="slider-wrap" style="padding:40px 0;"><button class="sb l" data-ss="${id}" data-ss-dir="-1">${arrowL}</button><div class="slider-track" id="${id}">${devs.concat(devs).map((d) => `<div class="dev-card" data-openm-t="${d.n}" data-openm-s="Are you looking for properties related to ${d.n}? Our experts can help you find the perfect match."><img src="${d.l}" alt="${d.n}"><p><strong>${d.n}</strong>Explore more properties related to this developer</p></div>`).join("")}</div><button class="sb r" data-ss="${id}" data-ss-dir="1">${arrowR}</button></div>`;
}
