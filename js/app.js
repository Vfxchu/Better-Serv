/* ═══ HERO SLIDER STATE (Removed in favor of Video Background) ═══ */

/* ═══ SLIDER SCROLL ═══ */
function ss(id, dir) {
  const el = document.getElementById(id);
  if (el) el.scrollBy({ left: dir * 340, behavior: "smooth" });
}

/* ═══ AUTO SCROLL ═══ */
function initAutoScroll() {
  const tracks = document.querySelectorAll(".slider-track");
  tracks.forEach((track) => {
    let interval = null;
    let isHovered = false;

    const start = () => {
      if (interval) return;
      interval = setInterval(() => {
        if (isHovered) return;
        const max = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= max - 1) {
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          track.scrollBy({ left: 1, behavior: "auto" });
        }
      }, 30); // Smooth slow crawl
    };

    const stop = () => {
      clearInterval(interval);
      interval = null;
    };

    track.addEventListener("mouseenter", () => { isHovered = true; });
    track.addEventListener("mouseleave", () => { isHovered = false; });
    
    // Also pause on touch
    track.addEventListener("touchstart", () => { isHovered = true; }, { passive: true });
    track.addEventListener("touchend", () => { isHovered = false; }, { passive: true });

    start();
  });
}

/* ═══ PAGE INIT (scroll reveal & counters) ═══ */
function initPg() {
  const obs = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("vis"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

  const bar = document.getElementById("statsBar");
  if (bar) {
    let done = false;
    const so = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done) {
        done = true;
        bar.querySelectorAll(".stat-num").forEach((el) => {
          const tgt = +el.dataset.target, sfx = el.dataset.suffix, step = Math.ceil(tgt / 125);
          let c = 0;
          const id = setInterval(() => {
            c += step;
            if (c >= tgt) { el.textContent = tgt + sfx; clearInterval(id); }
            else el.textContent = c + sfx;
          }, 16);
        });
        so.unobserve(bar);
      }
    }, { threshold: 0.3 });
    so.observe(bar);
  }

  const tl = document.getElementById("timeline");
  if (tl) {
    const to = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        tl.querySelectorAll("[data-line]").forEach((l, i) => setTimeout(() => l.classList.add("vis"), 300 + i * 200));
        to.unobserve(tl);
      }
    }, { threshold: 0.3 });
    to.observe(tl);
  }
}

/* ═══ ENQUIRY MODAL ═══ */
function openM(t, s) {
  const modal = document.getElementById("eqModal");
  if (!modal) return;
  document.getElementById("mT").textContent = "Enquire: " + t;
  document.getElementById("mS").textContent = s;
  document.getElementById("mF").style.display = "block";
  document.getElementById("mOk").style.display = "none";
  modal.classList.add("open");
}
function closeM() {
  const modal = document.getElementById("eqModal");
  if (modal) modal.classList.remove("open");
}
function subM() {
  document.getElementById("mF").style.display = "none";
  document.getElementById("mOk").style.display = "block";
}

/* ═══ CONTACT FORM ═══ */
function subC() {
  document.getElementById("cFB").innerHTML =
    '<div class="form-ok"><div class="ck">✓</div><h3>Message Sent!</h3><p>We\'ll get back to you within 24 hours.</p></div>';
}

/* ═══ RENDER: HOME ═══ */
function renderHome() {
  const svcEl = document.getElementById("svc-grid");
  if (svcEl) svcEl.innerHTML = SV.map((s, i) => `<div class="fc reveal d${i+2}"><div class="ib">${s.i}</div><h3>${s.t}</h3><p>${s.d}</p></div>`).join("");

  const dubaiSlEl = document.getElementById("dubai-sl-wrap");
  if (dubaiSlEl) dubaiSlEl.innerHTML = sl(DP.filter(p => p.m === "buy"), "hs1");
  const indiaSlEl = document.getElementById("india-sl-wrap");
  if (indiaSlEl) indiaSlEl.innerHTML = sl(IP.filter(p => p.m === "buy"), "hs2");

  const whyEl = document.getElementById("why-grid");
  if (whyEl) whyEl.innerHTML = WU.map((w, i) => `<div class="fcd reveal d${i+2}"><div class="ib">${w.i}</div><h4>${w.t}</h4><p>${w.d}</p></div>`).join("");

  const statsEl = document.getElementById("statsBar");
  if (statsEl) statsEl.innerHTML = ST.map(s => `<div><div class="stat-num" data-target="${s.v}" data-suffix="${s.s}">0${s.s}</div><div class="stat-label">${s.l}</div></div>`).join("");

  const ddEl = document.getElementById("dubai-dev-wrap");
  if (ddEl) ddEl.innerHTML = devSl(DD, "hs3");
  const idEl = document.getElementById("india-dev-wrap");
  if (idEl) idEl.innerHTML = devSl(ID, "hs4");

  const prEl = document.getElementById("timeline");
  if (prEl) prEl.innerHTML = PR.map((s, i) => `<div class="ts reveal d${i+3}"><div class="ts-num">${s.n}</div>${i < PR.length - 1 ? '<div class="ts-line" data-line></div>' : ""}<h4>${s.t}</h4><p>${s.d}</p></div>`).join("");

  const tmEl = document.getElementById("testimonials-grid");
  if (tmEl) tmEl.innerHTML = TM.map((t, i) => `<div class="tc reveal d${i+2}"><div class="stars">★★★★★</div><p class="qt">"${t.tx}"</p><div class="au">${t.n}</div><div class="rl">${t.r}</div></div>`).join("");
}

/* ═══ RENDER: ABOUT ═══ */
function renderAbout() {
  const vlEl = document.getElementById("val-grid");
  if (vlEl) vlEl.innerHTML = VL.map((v, i) => `<div class="vc reveal d${i+2}"><div class="vi">${v.i}</div><div><h4>${v.t}</h4><p>${v.d}</p></div></div>`).join("");

  const statsEl = document.getElementById("statsBar");
  if (statsEl) statsEl.innerHTML = ST.map(s => `<div><div class="stat-num" data-target="${s.v}" data-suffix="${s.s}">0${s.s}</div><div class="stat-label">${s.l}</div></div>`).join("");

  const teamEl = document.getElementById("team-grid");
  if (teamEl) teamEl.innerHTML = TEM.map((t, i) => `<div class="team-c reveal d${i+2}"><img src="${t.img}" alt="${t.n}" class="av"><h4>${t.n}</h4><p>${t.r}</p></div>`).join("");

  const svcEl = document.getElementById("svc-grid");
  if (svcEl) svcEl.innerHTML = SV.map((s, i) => `<div class="fc reveal d${i+2}"><div class="ib">${s.i}</div><h3>${s.t}</h3><p>${s.d}</p></div>`).join("");

  const tmEl = document.getElementById("testimonials-grid");
  if (tmEl) tmEl.innerHTML = TM.map((t, i) => `<div class="tc reveal d${i+2}"><div class="stars">★★★★★</div><p class="qt">"${t.tx}"</p><div class="au">${t.n}</div><div class="rl">${t.r}</div></div>`).join("");

  const ddEl = document.getElementById("dubai-dev-wrap");
  if (ddEl) ddEl.innerHTML = devSl(DD, "hs5");
  const idEl = document.getElementById("india-dev-wrap");
  if (idEl) idEl.innerHTML = devSl(ID, "hs6");
}

/* ═══ RENDER: PROPERTY PAGE ═══ */
function renderProps(type, mode) {
  const isDubai  = type === "dubai";
  const allProps = isDubai ? DP : IP;
  const devs     = isDubai ? DD : ID;
  const props    = allProps.filter(p => p.m === mode);

  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.mode === mode));

  const gridEl = document.getElementById("prop-grid");
  if (gridEl) gridEl.innerHTML = props.map(pc).join("");

  const devEl = document.getElementById("dev-sl-wrap");
  if (devEl) devEl.innerHTML = devSl(devs, "hs7");
}

/* ═══ EVENT DELEGATION ═══ */
document.addEventListener("click", function (e) {
  const el = e.target.closest("[data-ss],[data-openm-t],[data-subm],[data-subc],[data-closem],[data-goslide],[data-mode]");
  if (!el) return;

  if ("ss" in el.dataset) {
    e.preventDefault();
    ss(el.dataset.ss, +el.dataset.ssDir);
  } else if ("openmT" in el.dataset) {
    e.preventDefault();
    openM(el.dataset.openmT, el.dataset.openmS || "");
  } else if ("subm" in el.dataset) {
    e.preventDefault();
    subM();
  } else if ("subc" in el.dataset) {
    e.preventDefault();
    subC();
  } else if ("closem" in el.dataset) {
    e.preventDefault();
    closeM();
  } else if ("mode" in el.dataset) {
    e.preventDefault();
    const pg = document.body.dataset.page;
    renderProps(pg, el.dataset.mode);
    initPg();
  }
});

/* ═══ MODAL BACKDROP ═══ */
const eqModal = document.getElementById("eqModal");
if (eqModal) {
  eqModal.addEventListener("click", function (e) {
    if (e.target === this) closeM();
  });
}

/* ═══ HEADER SCROLL ═══ */
window.addEventListener("scroll", () => {
  const hdr = document.getElementById("mainHeader");
  if (hdr) hdr.classList.toggle("scrolled", window.scrollY > 60);
}, { passive: true });

/* ═══ BOOT ═══ */
document.addEventListener("DOMContentLoaded", () => {
  const pg = document.body.dataset.page;

  if (pg === "home")    renderHome();
  else if (pg === "about")  renderAbout();
  else if (pg === "dubai")  renderProps("dubai", "buy");
  else if (pg === "india")  renderProps("india", "buy");

  initPg();
  initAutoScroll();

  const loader = document.getElementById("app-loader");
  setTimeout(() => { if (loader) loader.classList.add("hidden"); }, 800);
});
