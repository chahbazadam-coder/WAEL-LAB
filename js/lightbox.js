/* =====================================================================
   Global image lightbox + gallery.
   - Click any photo to view it full-screen, centered, page blurred behind.
   - If the image has a data-gallery="url1|url2|..." attribute, the viewer
     becomes a gallery: ‹ › arrows, a "1 / 2" counter, and Left/Right keys.
   - Close with the backdrop, the ✕, or Escape.
   Uses event delegation, so dynamically-added images work automatically.
   ===================================================================== */
(function () {
  if (window.__lightboxInit) return;
  window.__lightboxInit = true;

  var css = document.createElement("style");
  css.textContent =
    "#lightbox{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;" +
      "background:rgba(12,17,33,0.55);backdrop-filter:blur(11px);-webkit-backdrop-filter:blur(11px);" +
      "padding:4vmin;cursor:zoom-out;opacity:0;transition:opacity .18s ease;}" +
    "#lightbox.open{display:flex;opacity:1;}" +
    "#lightbox img{max-width:92vw;max-height:86vh;border-radius:12px;object-fit:contain;" +
      "box-shadow:0 30px 90px -20px rgba(0,0,0,0.75);cursor:default;transform:scale(.97);transition:transform .18s ease;}" +
    "#lightbox.open img{transform:scale(1);}" +
    "#lightbox .lb-btn{position:fixed;border:none;border-radius:50%;background:rgba(255,255,255,0.16);color:#fff;" +
      "cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;}" +
    "#lightbox .lb-btn:hover{background:rgba(255,255,255,0.30);}" +
    "#lightbox .lb-close{top:16px;right:20px;width:44px;height:44px;font-size:1.25rem;}" +
    "#lightbox .lb-prev,#lightbox .lb-next{top:50%;transform:translateY(-50%);width:52px;height:52px;font-size:1.7rem;}" +
    "#lightbox .lb-prev{left:16px;} #lightbox .lb-next{right:16px;}" +
    "#lightbox .lb-count{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);color:#fff;" +
      "background:rgba(0,0,0,0.4);padding:5px 14px;border-radius:20px;font-size:0.9rem;font-weight:600;}" +
    /* zoom-in cursor + multi-photo badge on the site's photos */
    ".person-photo,.mphoto,.machine-photo,.item-photo,.item-thumb,.cthumb,.tool-thumb,.hero-photo," +
      ".card-photo,.cab .cic img{cursor:zoom-in;}" +
    ".thumb-wrap{position:relative;display:inline-flex;flex-shrink:0;}" +
    ".ph-badge{position:absolute;right:-5px;bottom:-5px;min-width:19px;height:19px;padding:0 5px;border-radius:10px;" +
      "background:var(--accent,#2b5ce6);color:#fff;font-size:0.68rem;font-weight:700;display:flex;align-items:center;" +
      "justify-content:center;box-shadow:0 0 0 2px #fff;pointer-events:none;}" +
    ".photo-hint{color:var(--muted,#5c636e);font-size:0.85rem;margin:-6px 0 16px;}";
  document.head.appendChild(css);

  var ov = document.createElement("div");
  ov.id = "lightbox";
  ov.innerHTML =
    '<button class="lb-btn lb-prev" aria-label="Previous">‹</button>' +
    '<img alt="">' +
    '<button class="lb-btn lb-next" aria-label="Next">›</button>' +
    '<button class="lb-btn lb-close" aria-label="Close">✕</button>' +
    '<div class="lb-count"></div>';
  function mount() { document.body.appendChild(ov); }
  if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);

  var big = ov.querySelector("img");
  var prevBtn = ov.querySelector(".lb-prev");
  var nextBtn = ov.querySelector(".lb-next");
  var closeBtn = ov.querySelector(".lb-close");
  var countEl = ov.querySelector(".lb-count");

  var list = [], idx = 0;

  function draw() {
    big.src = list[idx] || "";
    var multi = list.length > 1;
    prevBtn.style.display = multi ? "flex" : "none";
    nextBtn.style.display = multi ? "flex" : "none";
    countEl.style.display = multi ? "block" : "none";
    countEl.textContent = multi ? (idx + 1) + " / " + list.length : "";
  }
  function openList(arr, start) {
    list = arr; idx = start || 0;
    ov.classList.add("open");
    document.documentElement.style.overflow = "hidden";
    draw();
  }
  function close() {
    ov.classList.remove("open");
    document.documentElement.style.overflow = "";
    setTimeout(function () { if (!ov.classList.contains("open")) big.removeAttribute("src"); }, 200);
  }
  function go(d) { if (list.length) { idx = (idx + d + list.length) % list.length; draw(); } }

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || t.tagName !== "IMG") return;
    if (t.closest("#lightbox")) return;
    if (t.naturalWidth && t.naturalWidth < 20) return;
    e.preventDefault();
    e.stopPropagation();
    var gal = t.getAttribute("data-gallery");
    if (gal) {
      var arr = gal.split("|");
      var start = arr.indexOf(t.getAttribute("src"));
      openList(arr, start < 0 ? 0 : start);
    } else {
      openList([t.currentSrc || t.src], 0);
    }
  }, true);

  ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", function (e) { e.stopPropagation(); go(-1); });
  nextBtn.addEventListener("click", function (e) { e.stopPropagation(); go(1); });
  document.addEventListener("keydown", function (e) {
    if (!ov.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "ArrowRight") go(1);
  });
})();
