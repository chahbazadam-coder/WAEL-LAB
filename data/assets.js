/* =====================================================================
   LAB ASSET CATALOG  —  the single source of truth.
   Every tool, cabinet, and machine lives here. Each gets a QR code that
   opens item.html?id=<id>.  Editors: add/edit entries below.

   Shared fields:
     id          unique, url-safe (letters/numbers/dashes). NEVER reuse.
     no          the printed asset number on the sticker, e.g. "EFD-M-001".
                 Convention: M = machine, C = cabinet, T = tool. Keep it
                 STABLE once printed — give each new item the next free number.
     type        "machine" | "cabinet" | "tool"
     name        display name
     icon        one of the keys in ICONS (see bottom) or leave ""
     location    where it physically is
     photo       optional image in images/ (any item can have one)
     tags        array of tags. Convention: FIRST tag = the domain it belongs
                 to (Optics / Microfluidics / Electronics / Chemistry / General),
                 then descriptive tags (what it is): e.g.
                   laser        -> ["Optics", "Laser", "Fabrication"]
                   screwdriver  -> ["General", "Hand tool", "Fastening"]
                 "General" = shared tools that don't belong to one domain.

   type "machine":
     category, status ("available"|"inuse"|"down"|"caution"),
     description, howItWorks: [steps...], manuals: [{label,url}],
     safety (link, e.g. "safety.html#laser"), lastMaintained ("YYYY-MM-DD"), note

   MAINTENANCE (works on machines AND tools):
     maintenance: {
       needed: true,
       priority: "high" | "medium" | "low",
       issue:  "what's wrong",
       action: "what needs to be done",
       reported: "YYYY-MM-DD"
     }
     Set this and the item shows a "Needs maintenance" badge AND appears as a
     ticket on the Maintenance board. Delete the maintenance field once fixed
     (and bump lastMaintained) to clear it from both places.

   type "cabinet":
     description, contains: [ toolId, toolId, ... ]

   type "tool":
     purpose, home (cabinet id it belongs to), qty
   ===================================================================== */

window.LAB_ASSETS = [

  /* ==== EXAMPLE ENTRIES — one of each type, all placeholders. We replace these
          with the real inventory during the photo session. Asset numbers
          (EFD-M-001 …) stay stable; fill in everything else. ==== */

  /* ------------------------- MACHINES ------------------------- */
  {
    id: "example-machine", no: "EFD-M-001", type: "machine", name: "[Machine name]", icon: "machine",
    category: "[domain]", status: "available", location: "[location]",
    photo: "",
    description: "[placeholder]",
    howItWorks: [ "[step]" ],
    manuals: [ { label: "[manual name]", url: "" } ],
    safety: "safety.html#machine-example",
    lastMaintained: "[date]",
    note: ""
  },

  /* ------------------------- CABINETS / LOCKERS ------------------------- */
  {
    id: "example-cabinet", no: "EFD-C-001", type: "cabinet", name: "[Cabinet name]", icon: "cabinet",
    location: "[location]",
    description: "[placeholder]",
    contains: [ "example-tool" ]
  },

  /* ------------------------- TOOLS ------------------------- */
  { id: "example-tool", no: "EFD-T-001", type: "tool", name: "[Tool name]", icon: "tool",
    tags: ["[domain]", "[tag]"],
    purpose: "[placeholder]", home: "example-cabinet", qty: "[#]", location: "[location]" }

];

/* =====================================================================
   Icons (inline SVG, inherit text color). Add your own keys as needed.
   ===================================================================== */
window.ASSET_ICONS = {
  laser:      '<path d="M2 12h6M22 12h-4M12 2v4M12 18v4"/><circle cx="12" cy="12" r="3"/>',
  microscope: '<path d="M6 18h8M8 18a4 4 0 0 0 4-10M9 4l3 1M7 20h10"/><path d="M12 8l2 4"/>',
  pump:       '<rect x="3" y="8" width="14" height="8" rx="1"/><path d="M17 12h4M7 8V6M11 8V6"/>',
  scope:      '<rect x="2" y="4" width="20" height="14" rx="2"/><path d="M4 12h4l2-4 3 8 2-4h5"/>',
  spincoater: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/>',
  plasma:     '<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 12h2l1-2 2 4 1-2h2"/>',
  cabinet:    '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M8 8h1M15 8h1"/>',
  tool:       '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-.4-.4-2.1z"/>',
  droplet:    '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  chip:       '<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
  machine:    '<circle cx="12" cy="12" r="3"/><path d="M4 12h2M18 12h2M12 4v2M12 18v2"/>',
  box:        '<path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5"/>'
};

window.assetIcon = function (key) {
  var body = window.ASSET_ICONS[key] || window.ASSET_ICONS.box;
  return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
         'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + body + '</svg>';
};

window.getAsset = function (id) {
  return (window.LAB_ASSETS || []).filter(function (a) { return a.id === id; })[0] || null;
};
