/* ============================================================
   suryaavfx portfolio logic
   Renders categories from videos.js, builds thumbnails,
   handles filtering + the video lightbox.
   ============================================================ */

/* ---------- URL helpers: detect platform, id, thumbnail, embed ---------- */

function parseVideo(v) {
  const url = v.url.trim();
  let platform = v.platform;
  let id = null;

  // YouTube
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/);
  // Instagram
  const ig = url.match(/instagram\.com\/(?:p|reel|tv)\/([\w-]+)/);

  if (yt) { platform = platform || "youtube"; id = yt[1]; }
  else if (ig) { platform = platform || "instagram"; id = ig[1]; }

  return { ...v, platform: platform || "youtube", id, url };
}

function thumbFor(p) {
  if (p.thumb) return p.thumb;                       // manual override always wins
  if (p.platform === "youtube" && p.id)
    return `https://i.ytimg.com/vi/${p.id}/maxresdefault.jpg`;
  return null;                                       // instagram -> placeholder
}

function embedFor(p) {
  if (p.platform === "youtube" && p.id)
    return { type: "youtube", src: `https://www.youtube.com/embed/${p.id}?autoplay=1&rel=0&modestbranding=1` };
  if (p.platform === "instagram" && p.id)
    return { type: "instagram", src: `https://www.instagram.com/${p.url.includes("/reel/") ? "reel" : "p"}/${p.id}/embed/` };
  return { type: "link", src: p.url };
}

/* ---------- build data ---------- */
const DATA = CATEGORIES.map(c => ({ ...c, videos: c.videos.map(parseVideo) }));

/* ---------- populate static config bits ---------- */
// Renders the brand as a two-tone wordmark (white "suryaa" + rainbow "vfx").
// If your handle isn't "suryaavfx", it just shows plain. Edit the split here.
function wordmark(name) {
  if (/^suryaavfx/i.test(name))
    return `<span class="wm-b">suryaa</span><span class="wm-a">vfx.</span>`;
  return `<span class="wm-b">${escapeHTML(name)}</span>`;
}
document.getElementById("brandName").innerHTML = wordmark(CONFIG.brand);
document.getElementById("footerBrand").textContent = CONFIG.brand;   // plain text in footer
document.getElementById("year").textContent = "2026";
document.title = `${CONFIG.brand} | Video Editor Portfolio`;

document.getElementById("contactSocials").innerHTML = Object.entries(CONFIG.socials)
  .map(([k, u]) => {
    const isMail = u.startsWith("mailto:");
    const attrs = isMail ? "" : ` target="_blank" rel="noopener"`;
    const arrow = isMail ? "" : " ↗";
    return `<a href="${u}"${attrs}>${k}${arrow}</a>`;
  }).join("");

/* nav links */
document.getElementById("navLinks").innerHTML =
  DATA.map(c => `<a href="#cat-${c.slug}">${c.name}</a>`).join("");

/* ---------- render category sections ---------- */
const LOCK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`;

function cardHTML(p, locked) {
  const thumb = thumbFor(p);
  // For YouTube we load via JS (see hydrateThumbs) so we can detect the gray
  // 404 placeholder maxresdefault returns and fall back to hqdefault.
  const thumbInner = thumb
    ? `<img alt="${escapeAttr(p.title)}" loading="lazy"
            ${p.thumb ? `src="${escapeAttr(p.thumb)}"` : `data-ytid="${p.id}"`}>`
    : `<span class="ph-glyph">▶ ${p.platform === "instagram" ? "IG" : ""}</span>`;

  const overlay = locked
    ? `<span class="card__lock">${LOCK_SVG}</span>`
    : `<span class="card__play"><i></i></span>`;

  return `
    <article class="card ${locked ? "card--locked" : ""}" data-platform="${p.platform}" data-id="${p.id || ""}"
             data-title="${escapeAttr(p.title)}" data-url="${escapeAttr(p.url)}"${locked ? ' data-locked="1"' : ""}>
      <div class="card__thumb ${thumb ? "" : "card__thumb--ph"}">
        ${thumbInner}
        ${overlay}
      </div>
      <div class="card__body">
        <span class="card__title">${escapeHTML(p.title)}</span>
        <span class="card__arrow">↗</span>
      </div>
    </article>`;
}

function escapeHTML(s) { return s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }
function escapeAttr(s) { return s.replace(/"/g, "&quot;"); }

document.getElementById("sections").innerHTML = DATA.map((c, ci) => `
  <section class="cat" id="cat-${c.slug}" data-slug="${c.slug}">
    <div class="cat__head">
      <span class="cat__index">${String(ci + 1).padStart(2, "0")}</span>
      <h3 class="cat__name">${c.name}</h3>
      <p class="cat__blurb">${c.blurb || ""}</p>
      <span class="cat__rule"></span>
      <span class="cat__index">${c.videos.length} ${c.videos.length === 1 ? "edit" : "edits"}</span>
    </div>
    <div class="grid">${c.videos.map(v => cardHTML(v, c.locked)).join("")}</div>
  </section>
`).join("");

/* ---------- thumbnail hydration (robust maxres -> hq fallback) ----------
   YouTube returns a gray 120x90 placeholder (HTTP 404, but a real JPEG body)
   for maxresdefault when no max-res frame exists. The browser renders it and
   never fires onerror, so we detect it by the loaded image's natural width
   and downgrade to hqdefault, which always exists. hqdefault is 4:3 with black
   bars; object-fit: cover on the 16:9 card crops them cleanly. */
function hydrateThumbs(root) {
  root.querySelectorAll("img[data-ytid]").forEach(img => {
    const id = img.dataset.ytid;
    img.onload = () => {
      if (img.naturalWidth <= 121) {        // gray placeholder detected
        img.onload = null;
        img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      }
    };
    img.onerror = () => {
      img.onerror = null;
      img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    };
    img.src = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  });
}
hydrateThumbs(document.getElementById("sections"));

/* ---------- featured video (top of projects) ---------- */
(function renderFeatured() {
  const f = CONFIG.featured;
  const host = document.getElementById("featured");
  if (!f || !f.url || !host) return;
  const p = parseVideo(f);
  // auto-playing muted preview if a clip is provided, else a thumbnail image
  const mediaInner = f.preview
    ? `<video class="featured__video" src="${escapeAttr(f.preview)}" muted autoplay loop playsinline preload="auto"></video>`
    : `<img alt="${escapeAttr(f.title)}" ${p.thumb ? `src="${escapeAttr(p.thumb)}"` : `data-ytid="${p.id}"`}>`;
  host.innerHTML = `
    <div class="featured__media" data-platform="${p.platform}" data-id="${p.id || ""}"
         data-title="${escapeAttr(f.title)}" data-url="${escapeAttr(f.url)}">
      <div class="card__thumb">
        ${mediaInner}
        <span class="card__play"><i></i></span>
      </div>
    </div>
    <div class="featured__info">
      <span class="section-tag rainbow">★ featured</span>
      <h2 class="featured__title">${escapeHTML(f.title)}</h2>
      <p class="featured__desc">${escapeHTML(f.description || "")}</p>
      <button class="featured__play" type="button">Watch now <i class="btn__play"></i></button>
    </div>`;
  if (f.preview) {
    const v = host.querySelector(".featured__video");
    if (v) { v.muted = true; v.play().catch(() => {}); }
  } else {
    hydrateThumbs(host);
  }
  const media = host.querySelector(".featured__media");
  host.addEventListener("click", e => {
    if (e.target.closest(".featured__media") || e.target.closest(".featured__play")) openVideo(media);
  });
})();

/* ---------- minimal floating rainbow particles (projects bg) ---------- */
(function renderParticles() {
  const host = document.getElementById("workParticles");
  if (!host || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const N = 120;
  for (let i = 0; i < N; i++) {
    const dot = document.createElement("span");
    dot.className = "particle";
    const hue = Math.floor(Math.random() * 360);
    const size = 2.5 + Math.random() * 4;                 // small, shiny points
    const col = `hsl(${hue}, 100%, 70%)`;
    dot.style.left = (Math.random() * 100) + "%";
    dot.style.top = (Math.random() * 100) + "%";
    dot.style.width = dot.style.height = size.toFixed(1) + "px";
    // bright white core fading to a neon hue and out -> looks like a glinting spark
    dot.style.background = `radial-gradient(circle, #ffffff 0%, ${col} 42%, transparent 78%)`;
    dot.style.boxShadow = `0 0 ${(size * 1.8 + 2).toFixed(1)}px ${col}`;   // tight glow, no big bleed
    dot.style.setProperty("--op", (0.5 + Math.random() * 0.5).toFixed(2));
    dot.style.animationDuration = (9 + Math.random() * 11).toFixed(1) + "s";
    dot.style.animationDelay = (-Math.random() * 18).toFixed(1) + "s";
    host.appendChild(dot);
  }
})();

/* ---------- scroll reveal (staggered) ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const cards = [...en.target.querySelectorAll(".card:not(.in)")];
      cards.forEach((card, i) => setTimeout(() => card.classList.add("in"), i * 65));
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll(".grid").forEach(g => io.observe(g));

/* ---------- lightbox ---------- */
const lb = document.getElementById("lightbox");
const lbFrame = document.getElementById("lbFrame");
const lbTitle = document.getElementById("lbTitle");
const lbPlat = document.getElementById("lbPlatform");

function openVideo(card) {
  const platform = card.dataset.platform;
  const p = { platform, id: card.dataset.id, url: card.dataset.url };
  const emb = embedFor(p);

  lbTitle.textContent = card.dataset.title;
  lbPlat.textContent = platform === "instagram" ? "Instagram" : "YouTube";

  if (emb.type === "instagram") {
    lbFrame.className = "lightbox__frame lightbox__frame--ig";
    lbFrame.innerHTML = `<iframe src="${emb.src}" allowtransparency="true" frameborder="0" scrolling="no" allowfullscreen></iframe>`;
  } else if (emb.type === "youtube") {
    lbFrame.className = "lightbox__frame";
    lbFrame.innerHTML = `<iframe src="${emb.src}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else {
    window.open(emb.src, "_blank");
    return;
  }
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeVideo() {
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
  lbFrame.innerHTML = "";          // stops playback
  document.body.style.overflow = "";
}

document.getElementById("sections").addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (!card) return;
  if (card.dataset.locked) { openLock(); return; }   // locked categories show the popup
  openVideo(card);
});
lb.addEventListener("click", e => { if (e.target.dataset.close !== undefined) closeVideo(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") { closeVideo(); closeLock(); } });

/* ---------- locked video popup ---------- */
const lockbox = document.getElementById("lockbox");
function openLock() {
  lockbox.classList.add("open");
  lockbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLock() {
  lockbox.classList.remove("open");
  lockbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
lockbox.addEventListener("click", e => { if (e.target.dataset.lockclose !== undefined) closeLock(); });

/* ---------- nav scroll state ---------- */
const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 40), { passive: true });

/* ---------- neon cursor trail (solid streak, canvas) ---------- */
if (matchMedia("(pointer:fine)").matches) {
  const canvas = document.createElement("canvas");
  canvas.className = "cursor-trail";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
  }
  resize();
  addEventListener("resize", resize);

  const LIFE = 380;                     // ms a point stays in the streak
  const pts = [];
  let hue = 0;

  addEventListener("mousemove", e => {
    hue = (hue + 6) % 360;              // glide through the neon spectrum along the streak
    pts.push({ x: e.clientX, y: e.clientY, t: performance.now(), h: hue });
  });

  function frame(now) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    while (pts.length && now - pts[0].t > LIFE) pts.shift();

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i - 1], p1 = pts[i];
      const a = Math.max(0, 1 - (now - p1.t) / LIFE);   // newer = brighter/thicker
      const col = `hsla(${p1.h}, 100%, 62%, ${a})`;
      ctx.strokeStyle = col;
      ctx.lineWidth = 1 + 5 * a;
      ctx.shadowColor = col;
      ctx.shadowBlur = 12 * a;
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.stroke();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ---------- hero background video (muted, seamless segment loop) ---------- */
(function initHeroVideo() {
  const cfg = CONFIG.heroVideo;
  const mount = document.getElementById("heroVideo");
  const stage = document.querySelector(".hero__bg");
  if (!cfg || !mount) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const start = Math.max(0, cfg.start || 0);
  const end = cfg.end || 0;

  /* ---- Preferred: self-hosted MP4, full res, no player UI, seamless ---- */
  if (cfg.file) {
    const v = document.createElement("video");
    v.id = "heroVideo";
    v.src = cfg.file;
    v.muted = true; v.defaultMuted = true; v.autoplay = true;
    v.loop = !end;                       // native loop unless we're looping a segment
    v.playsInline = true; v.setAttribute("playsinline", ""); v.preload = "auto";
    if (start) v.addEventListener("loadedmetadata", () => { try { v.currentTime = start; } catch (e) {} });
    if (end) v.addEventListener("timeupdate", () => { if (v.currentTime >= end) v.currentTime = start; });
    v.addEventListener("playing", () => stage && stage.classList.add("ready"), { once: true });
    mount.replaceWith(v);
    v.play().catch(() => {});
    return;
  }

  /* ---- Fallback: YouTube embed (carries YouTube's loading chrome) ---- */
  if (!cfg.url) return;
  const m = cfg.url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/);
  const id = m ? m[1] : cfg.url.trim();
  if (!id) return;

  let player, watch;

  function build() {
    player = new YT.Player("heroVideo", {
      videoId: id,
      host: "https://www.youtube-nocookie.com",
      playerVars: {
        autoplay: 1, mute: 1, controls: 0, loop: 0, start,
        playsinline: 1, rel: 0, modestbranding: 1, disablekb: 1, fs: 0, iv_load_policy: 3,
        origin: location.origin,        // required for the embed when served over http
      },
      events: {
        onReady: e => { e.target.mute(); e.target.playVideo(); try { e.target.setPlaybackQuality("hd1080"); } catch (err) {} },
        onStateChange: e => {
          // only reveal once frames are actually playing, hides the spinner + buttons
          if (e.data === YT.PlayerState.PLAYING) { stage && stage.classList.add("ready"); loop(); }
        },
      },
    });
  }

  // poll playback; jump back to the in-point when we hit the out-point
  function loop() {
    clearInterval(watch);
    watch = setInterval(() => {
      if (!player || !player.getCurrentTime) return;
      const t = player.getCurrentTime();
      if ((end && t >= end) || t < start - 1) player.seekTo(start, true);
    }, 200);
  }

  // load the IFrame Player API once, then build
  if (window.YT && window.YT.Player) {
    build();
  } else {
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof prev === "function") prev();
      build();
    };
  }
})();
