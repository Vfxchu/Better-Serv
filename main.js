// main.js – Better Real Estate (plain script, no ES6 imports)
// Canvas 2D hero frame animation + GSAP + Swiper + Modals

/* ─────────────────────────────────────────────
   HERO – Canvas 2D Frame Animation
   Plays ./hero_assets/ezgif-frame-001.png → 205.png as a looping video
───────────────────────────────────────────── */
function initHeroCanvas() {
  const canvas  = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx     = canvas.getContext('2d');
  const TOTAL   = 205;
  const DIR     = './hero_assets/ezgif-frame-';
  const EXT     = '.png';
  const frames  = [];
  let   loaded  = 0;

  function pad(n) { return String(n).padStart(3, '0'); }

  function drawFrame(idx) {
    const img = frames[idx];
    if (!img || !img.complete) return;
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const w = iw * scale, h = ih * scale;
    const x = (cw - w) / 2, y = (ch - h) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, w, h);
  }

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const current = window.heroFrameObj ? window.heroFrameObj.frame : 0;
    if (frames[current]) drawFrame(current);
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  const loader = document.getElementById('loader');
  function hideLoader() {
    if (!loader) return;
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.6s';
    setTimeout(() => { loader.style.display = 'none'; }, 650);
  }

  for (let i = 1; i <= TOTAL; i++) {
    const img = new Image();
    img.decoding = 'async';
    img.src = DIR + pad(i) + EXT;
    const idx = i - 1;
    img.onload = () => {
      frames[idx] = img;
      loaded++;
      if (idx === 0) {
        drawFrame(0);
        hideLoader();
      }
    };
    img.onerror = () => { loaded++; }; 
    frames[idx] = img;
  }

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    window.heroFrameObj = { frame: 0 };
    gsap.to(window.heroFrameObj, {
      frame: TOTAL - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: "+=300%",
        onUpdate: () => drawFrame(window.heroFrameObj.frame)
      }
    });
  }
}

/* ─────────────────────────────────────────────
   GSAP + ScrollTrigger – hero content fade
───────────────────────────────────────────── */
function initGSAP() {
  if (!window.gsap || !window.ScrollTrigger) {
    // GSAP not available — make sure all reveal elements are visible
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // Set initial hidden state from JS only (not CSS — prevents invisible content on CDN failure)
  gsap.set('.reveal', { opacity: 0, y: 40 });

  // Scroll reveal — each element animates in once
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.to(el, {
      y        : 0,
      opacity  : 1,
      duration : 0.75,
      ease     : 'power3.out',
      scrollTrigger: {
        trigger      : el,
        start        : 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });
}

/* ─────────────────────────────────────────────
   SWIPER OFFSET — aligns first slide with page grid
───────────────────────────────────────────── */
function setSwiperOffset() {
  // Container max-width is 1280px with 40px side padding.
  // On wide screens: offset = (viewport - 1280) / 2 + 40
  // On narrow screens the container fills the viewport, so offset = container padding
  const maxW       = 1280;
  const containerPad = window.innerWidth <= 480 ? 16
                     : window.innerWidth <= 768 ? 20
                     : window.innerWidth <= 1100 ? 32
                     : 40;
  const sideGap    = Math.max(0, (window.innerWidth - maxW) / 2);
  const offset     = Math.round(sideGap + containerPad);
  document.documentElement.style.setProperty('--swiper-offset', offset + 'px');
}

/* ─────────────────────────────────────────────
   SWIPER CAROUSELS
───────────────────────────────────────────── */
function initSwipers() {
  if (!window.Swiper) return;

  // Compute offset before Swiper measures widths
  setSwiperOffset();

  new Swiper('.swiper-india', {
    slidesPerView : 1.15,
    spaceBetween  : 20,
    grabCursor    : true,
    loop          : true,
    navigation    : { nextEl: '.india-next', prevEl: '.india-prev' },
    breakpoints   : {
      540 : { slidesPerView: 2.1,  spaceBetween: 20 },
      900 : { slidesPerView: 3.1,  spaceBetween: 24 },
      1280: { slidesPerView: 3.8,  spaceBetween: 28 },
    },
  });

  new Swiper('.swiper-dubai', {
    slidesPerView : 1.15,
    spaceBetween  : 20,
    grabCursor    : true,
    loop          : true,
    navigation    : { nextEl: '.dubai-next', prevEl: '.dubai-prev' },
    breakpoints   : {
      540 : { slidesPerView: 2.1,  spaceBetween: 20 },
      900 : { slidesPerView: 3.1,  spaceBetween: 24 },
      1280: { slidesPerView: 3.8,  spaceBetween: 28 },
    },
  });

  new Swiper('.swiper-testimonials', {
    slidesPerView : 1.05,
    spaceBetween  : 20,
    grabCursor    : true,
    loop          : true,
    autoplay      : { delay: 5000, disableOnInteraction: false },
    pagination    : { el: '.testi-pagination', clickable: true },
    breakpoints   : {
      640 : { slidesPerView: 1.8, spaceBetween: 24 },
      1024: { slidesPerView: 2.8, spaceBetween: 28 },
      1280: { slidesPerView: 3,   spaceBetween: 32 },
    },
  });

  // Re-compute on resize
  window.addEventListener('resize', setSwiperOffset, { passive: true });
}

/* ─────────────────────────────────────────────
   PROPERTY MODAL
───────────────────────────────────────────── */
function initModals() {
  const modal      = document.getElementById('property-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-property-title');
  const modalImg   = document.getElementById('modal-property-img');
  const modalLoc   = document.getElementById('modal-property-location');
  const modalPrice = document.getElementById('modal-property-price');
  if (!modal) return;

  function openModal(card) {
    modalTitle.textContent = card.dataset.title    || '';
    modalLoc.textContent   = card.dataset.location || '';
    modalPrice.textContent = card.dataset.price    || '';
    modalImg.src           = card.dataset.img      || '';
    modalImg.alt           = card.dataset.title    || '';
    const hp = document.getElementById('modal-hidden-property');
    if (hp) hp.value = card.dataset.title || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* ─────────────────────────────────────────────
   MODAL FORM (routes to vishnuss80@gmail.com)
───────────────────────────────────────────── */
function initModalForm() {
  const form = document.getElementById('modal-contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name     = form.querySelector('[name="name"]').value;
    const email    = form.querySelector('[name="email"]').value;
    const phone    = form.querySelector('[name="phone"]').value;
    const property = form.querySelector('[name="property"]').value;
    const message  = form.querySelector('[name="message"]').value;
    const subject  = encodeURIComponent('Property Enquiry – ' + property);
    const body     = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\nProperty: ' + property + '\n\nMessage:\n' + message);
    window.location.href = 'mailto:vishnuss80@gmail.com?subject=' + subject + '&body=' + body;
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Enquiry Sent!';
    btn.style.background = '#22c55e';
    setTimeout(() => { btn.textContent = 'Send Enquiry'; btn.style.background = ''; form.reset(); }, 3000);
  });
}

/* ── General contact form ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = form.querySelector('[name="name"]').value;
    const email   = form.querySelector('[name="email"]').value;
    const phone   = form.querySelector('[name="phone"]').value;
    const message = form.querySelector('[name="message"]').value;
    const subject = encodeURIComponent('General Enquiry – Better Real Estate');
    const body    = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\n\nMessage:\n' + message);
    window.location.href = 'mailto:vishnuss80@gmail.com?subject=' + subject + '&body=' + body;
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#22c55e';
    setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; form.reset(); }, 3000);
  });
}

/* ─────────────────────────────────────────────
   ANIMATED NUMBER COUNTERS (Section 7)
───────────────────────────────────────────── */
function initCounters() {
  if (!window.gsap || !window.ScrollTrigger) return;
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;
  ScrollTrigger.create({
    trigger: '#stats',
    start  : 'top 75%',
    once   : true,
    onEnter: () => {
      counters.forEach(el => {
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const proxy  = { val: 0 };
        gsap.to(proxy, {
          val: target, duration: 2, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(proxy.val).toLocaleString() + suffix; },
        });
      });
    },
  });
}

/* ─────────────────────────────────────────────
   DESKTOP NAV – scroll shrink
───────────────────────────────────────────── */
function initDesktopNav() {
  const nav = document.querySelector('.capsule-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
  }
}

/* ─────────────────────────────────────────────
   MOBILE BOTTOM NAV – active state by URL
───────────────────────────────────────────── */
function initMobileNav() {
  const navLinks = document.querySelectorAll('.mobile-nav a');
  let currentFile = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(a => {
    const hrefFile = a.getAttribute('href').split('/').pop() || 'index.html';
    a.classList.toggle('active', hrefFile === currentFile);
  });
}

/* ─────────────────────────────────────────────
   PROPERTY CARD INJECTION
───────────────────────────────────────────── */
const INDIA_PROPS = [
  { title:"Sea-View Penthouse",    location:"Bandra, Mumbai",     price:"₹4.2 Cr",  beds:3, baths:3, sqft:"2,800", badge:"New",     img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=70" },
  { title:"Garden Villa",          location:"Whitefield, Bangalore",price:"₹2.8 Cr", beds:4, baths:3, sqft:"3,200", badge:"Hot",     img:"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=70" },
  { title:"Skyline Apartment",     location:"Cyber City, Gurgaon", price:"₹1.9 Cr", beds:2, baths:2, sqft:"1,400", badge:"Ready",   img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=70" },
  { title:"Heritage Bungalow",     location:"Boat Club, Chennai",  price:"₹5.5 Cr", beds:5, baths:4, sqft:"5,000", badge:"Rare",    img:"https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=600&q=70" },
  { title:"Lakeside Retreat",      location:"Varthur, Bangalore",  price:"₹3.1 Cr", beds:4, baths:3, sqft:"3,600", badge:"New",     img:"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=70" },
  { title:"Coastal Villa",         location:"Candolim, Goa",       price:"₹6.8 Cr", beds:5, baths:5, sqft:"4,800", badge:"Luxury",  img:"https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=70" },
  { title:"Riverside Mansion",     location:"OMR, Chennai",        price:"₹8.2 Cr", beds:6, baths:5, sqft:"7,000", badge:"New",     img:"https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600&q=70" }
];
const DUBAI_PROPS = [
  { title:"Marina Penthouse",      location:"Dubai Marina",        price:"AED 6.5M", beds:4, baths:4, sqft:"4,200", badge:"Luxury",  img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=70" },
  { title:"Palm Island Villa",     location:"Palm Jumeirah",       price:"AED 18M",  beds:6, baths:6, sqft:"9,500", badge:"Ultra",   img:"https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&q=70" },
  { title:"Downtown Apartment",    location:"Downtown Dubai",      price:"AED 2.8M", beds:2, baths:2, sqft:"1,600", badge:"Hot",     img:"https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?w=600&q=70" },
  { title:"Creek Harbour Flat",    location:"Dubai Creek Harbour", price:"AED 1.9M", beds:1, baths:1, sqft:"950",  badge:"New",     img:"https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=70" },
  { title:"JBR Beachfront Studio", location:"JBR, Dubai",          price:"AED 1.4M", beds:1, baths:1, sqft:"700",  badge:"Ready",   img:"https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=70" },
  { title:"Business Bay Tower",    location:"Business Bay",        price:"AED 3.2M", beds:3, baths:3, sqft:"2,100", badge:"Hot",     img:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=70" },
  { title:"Emaar Hills Estate",    location:"Dubai Hills",         price:"AED 5.8M", beds:4, baths:4, sqft:"4,800", badge:"Luxury",  img:"https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=70" }
];

function makeCard(p) {
  return `<div class="swiper-slide">
    <div class="property-card" data-title="${p.title}" data-location="${p.location}" data-price="${p.price}" data-img="${p.img}">
      <div class="prop-img-wrap">
        <img src="${p.img}" alt="${p.title}" loading="lazy"/>
        <span class="prop-badge">${p.badge}</span>
      </div>
      <div class="prop-body">
        <h3>${p.title}</h3>
        <p class="prop-location"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> ${p.location}</p>
        <div class="prop-meta">
          <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1z"/><path d="M9 21V12h6v9"/></svg> ${p.beds} Bed</span>
          <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16M4 12a2 2 0 01-2-2V6a2 2 0 012-2h8"/><rect x="2" y="14" width="20" height="6" rx="1"/></svg> ${p.baths} Bath</span>
          <span>${p.sqft} sqft</span>
        </div>
        <p class="prop-price">${p.price}</p>
      </div>
      <div class="prop-cta-row"><button class="btn btn-primary">Enquire Now</button></div>
    </div>
  </div>`;
}

function injectPropertyCards() {
  const indiaCards = document.getElementById('india-cards');
  if (indiaCards) indiaCards.innerHTML = INDIA_PROPS.map(makeCard).join('');
  const dubaiCards = document.getElementById('dubai-cards');
  if (dubaiCards) dubaiCards.innerHTML = DUBAI_PROPS.map(makeCard).join('');
}

/* ─────────────────────────────────────────────
   BOOT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  initDesktopNav();
  initMobileNav();
  injectPropertyCards();
  
  // GSAP init (after DOM is ready, CDN scripts should be loaded)
  initGSAP();
  initHeroCanvas(); // Runs after GSAP so it can use ScrollTrigger
  initSwipers();
  initModals();
  initModalForm();
  initContactForm();
  initCounters();
});
