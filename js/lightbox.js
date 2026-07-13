/* =====================================================================
   Global image lightbox — click any photo to view it full-screen,
   centered, with the page blurred behind it. Close by clicking the
   backdrop, the ✕, or pressing Escape. Works on every page that loads
   this script (uses event delegation, so dynamically-added images work).
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
    "#lightbox img{max-width:92vw;max-height:88vh;border-radius:12px;object-fit:contain;" +
      "box-shadow:0 30px 90px -20px rgba(0,0,0,0.75);cursor:default;transform:scale(.97);transition:transform .18s ease;}" +
    "#lightbox.open img{transform:scale(1);}" +
    "#lightbox .lb-close{position:fixed;top:16px;right:20px;width:44px;height:44px;border:none;border-radius:50%;" +
      "background:rgba(255,255,255,0.16);color:#fff;font-size:1.25rem;line-height:1;cursor:pointer;}" +
    "#lightbox .lb-close:hover{background:rgba(255,255,255,0.30);}" +
    /* show a zoom-in cursor on the photos that open the lightbox */
    ".person-photo,.mphoto,.machine-photo,.item-photo,.item-thumb,.cthumb,.tool-thumb,.hero-photo," +
      ".card-photo,.cab .cic img{cursor:zoom-in;}";
  document.head.appendChild(css);

  var ov = document.createElement("div");
  ov.id = "lightbox";
  var big = document.createElement("img");
  big.alt = "";
  var closeBtn = document.createElement("button");
  closeBtn.className = "lb-close";
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.textContent = "✕";
  ov.appendChild(big);
  ov.appendChild(closeBtn);

  function mount() { document.body.appendChild(ov); }
  if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);

  function open(src, alt) {
    if (!src) return;
    big.src = src;
    big.alt = alt || "";
    ov.classList.add("open");
    document.documentElement.style.overflow = "hidden";
  }
  function close() {
    ov.classList.remove("open");
    document.documentElement.style.overflow = "";
    setTimeout(function () { if (!ov.classList.contains("open")) big.removeAttribute("src"); }, 200);
  }

  // Click any content image -> open it in the lightbox (beat parent links via capture phase).
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || t.tagName !== "IMG") return;
    if (t.closest("#lightbox")) return;                 // ignore the lightbox's own image
    if (t.naturalWidth && t.naturalWidth < 20) return;  // ignore tiny icons
    e.preventDefault();
    e.stopPropagation();
    open(t.currentSrc || t.src, t.alt);
  }, true);

  ov.addEventListener("click", function (e) { if (e.target !== big) close(); });
  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();
