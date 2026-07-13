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

   type "cabinet" (a cabinet, locker, OR a box):
     description
     contains: [ id, id, ... ]                 // other catalogued items (each has its own QR page)
     contents: [ { name, qty, note, photo }, ... ]  // inline packing list; photo optional

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

  /* ------------------------- CABINETS / BOXES ------------------------- */
  {
    id: "cab-mech314", no: "EFD-C-001", type: "cabinet", name: "MECH 314 Class Activity Box", icon: "box",
    location: "[location]",
    photo: "images/m314-box.jpg",
    description: "Materials and equipment for the MECH 314 class activity.",
    contents: [
      { name: "Reusable plastic ice cubes, assorted colors", qty: "1", note: "Family / Dollar Empire — box + mesh bag", photo: "images/m314-icecubes.jpg" },
      { name: "Plastic balls, assorted colors (ball-pit type)", qty: "1", note: "mesh bag", photo: "images/m314-balls.jpg" },
      { name: "String / twine, cream", qty: "1", note: "spool", photo: "images/m314-string.jpg" },
      { name: "Black screen mesh / netting", qty: "1", photo: "images/m314-mesh.jpg" },
      { name: "Black fabric / cloth", qty: "1", photo: "images/m314-cloth.jpg" },
      { name: "Wooden cubes", qty: "1", note: "label 730441", photo: "images/m314-woodcubes.jpg" },
      { name: "Wooden balls, 3/8\" (Woodpeckers) + bulk wooden balls", qty: "1", note: "label 5048", photo: "images/m314-woodballs.jpg" },
      { name: "Clear / frosted spheres (beads)", qty: "1", note: "label 730442 PO", photo: "images/m314-spheres.jpg" },
      { name: "AQUANEAT 50 GPH water pump (G054)", qty: "19", photo: "images/m314-pump.jpg" }
    ]
  },

  /* ------------------------- TOOLS ------------------------- */
  { id: "tool-clamp-large", no: "EFD-T-001", type: "tool", name: "Bar clamp, large (MESA)", icon: "tool",
    tags: ["General", "Clamping"],
    purpose: "", home: "", qty: "5", location: "[location]",
    photos: ["images/tool-clamp-large.jpg", "images/tool-clamp-large-2.jpg"] },
  { id: "tool-clamp-small", no: "EFD-T-002", type: "tool", name: "Bar clamp, small", icon: "tool",
    tags: ["General", "Clamping"],
    purpose: "", home: "", qty: "7", location: "[location]", photo: "" },
  { id: "tool-pipe-wrench", no: "EFD-T-003", type: "tool", name: "Pipe wrench, 10\" (heavy duty)", icon: "tool",
    tags: ["General", "Wrench"], purpose: "", home: "", qty: "1", location: "[location]", photo: "" },
  { id: "tool-slip-joint", no: "EFD-T-004", type: "tool", name: "Slip-joint pliers", icon: "tool",
    tags: ["General", "Pliers"], purpose: "", home: "", qty: "1", location: "[location]", photo: "" },
  { id: "tool-sd-flat-yellow", no: "EFD-T-005", type: "tool", name: "Flathead screwdriver (yellow handle)", icon: "tool",
    tags: ["General", "Screwdriver"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-sd-flat-yellow.jpg" },
  { id: "tool-longnose", no: "EFD-T-006", type: "tool", name: "Long-nose pliers (Vanadium)", icon: "tool",
    tags: ["General", "Pliers"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-longnose.jpg" },
  { id: "tool-ratchet-sd", no: "EFD-T-007", type: "tool", name: "Ratcheting screwdriver (blue)", icon: "tool",
    tags: ["General", "Screwdriver"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-ratchet-sd.jpg" },
  { id: "tool-sd-flat-blackred", no: "EFD-T-008", type: "tool", name: "Flathead screwdriver (black/red handle)", icon: "tool",
    tags: ["General", "Screwdriver"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-sd-flat-blackred.jpg" },
  { id: "tool-sd-phillips-red", no: "EFD-T-009", type: "tool", name: "Phillips screwdriver (red/black handle)", icon: "tool",
    tags: ["General", "Screwdriver"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-sd-phillips-red.jpg" },
  { id: "tool-tinsnips", no: "EFD-T-010", type: "tool", name: "Tin / aviation snips (KIMBA)", icon: "tool",
    tags: ["General", "Cutting"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-tinsnips.jpg" },
  { id: "tool-stripper-auto", no: "EFD-T-011", type: "tool", name: "Self-adjusting wire stripper (Elcontrol)", icon: "tool",
    tags: ["Electronics", "Wire stripping"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-stripper-auto.jpg" },
  { id: "tool-stripper-crimper", no: "EFD-T-012", type: "tool", name: "Wire stripper / crimper", icon: "tool",
    tags: ["Electronics", "Wire stripping"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-stripper-crimper.jpg" },
  { id: "tool-diagonal-cutters", no: "EFD-T-013", type: "tool", name: "Diagonal side cutters (evolv)", icon: "tool",
    tags: ["Electronics", "Cutting"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-diagonal-cutters.jpg" },
  { id: "tool-sd-phillips-stanley", no: "EFD-T-014", type: "tool", name: "Phillips screwdriver (Stanley, orange)", icon: "tool",
    tags: ["General", "Screwdriver"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-sd-phillips-stanley.jpg" },
  { id: "tool-awl", no: "EFD-T-015", type: "tool", name: "Scratch awl / scriber", icon: "tool",
    tags: ["General", "Marking"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-awl.jpg" },
  { id: "tool-sd-flat-worn", no: "EFD-T-016", type: "tool", name: "Flathead screwdriver (worn handle)", icon: "tool",
    tags: ["General", "Screwdriver"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-sd-flat-worn.jpg" },
  { id: "tool-sd-flat-cream", no: "EFD-T-017", type: "tool", name: "Flathead screwdriver (cream handle)", icon: "tool",
    tags: ["General", "Screwdriver"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-sd-flat-cream.jpg" },
  { id: "tool-sd-flat-blackyellow", no: "EFD-T-018", type: "tool", name: "Flathead screwdriver (black/yellow handle)", icon: "tool",
    tags: ["General", "Screwdriver"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-sd-flat-blackyellow.jpg" },
  { id: "tool-sd-xcelite", no: "EFD-T-019", type: "tool", name: "Precision screwdriver (Xcelite XP1550, 1.5 mm)", icon: "tool",
    tags: ["Electronics", "Screwdriver"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-sd-xcelite.jpg" },
  { id: "tool-sd-phillips-br-long", no: "EFD-T-020", type: "tool", name: "Phillips screwdriver (black/red handle, long)", icon: "tool",
    tags: ["General", "Screwdriver"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-sd-phillips-br-long.jpg" },
  { id: "tool-sd-phillips-br", no: "EFD-T-021", type: "tool", name: "Phillips screwdriver (black/red handle)", icon: "tool",
    tags: ["General", "Screwdriver"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-sd-phillips-br.jpg" },
  { id: "tool-sd-phillips-rb-small", no: "EFD-T-022", type: "tool", name: "Phillips screwdriver (red/black handle, small)", icon: "tool",
    tags: ["General", "Screwdriver"], purpose: "", home: "", qty: "1", location: "[location]", photo: "images/tool-sd-phillips-rb-small.jpg" },
  { id: "tool-caliper", no: "EFD-T-023", type: "tool", name: "Electronic digital caliper (150 mm)", icon: "tool",
    tags: ["General", "Measurement"], purpose: "", home: "", qty: "1", location: "[location]",
    photos: ["images/tool-caliper.jpg", "images/tool-caliper-2.jpg"] }

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

// All photos for an item: the `photos` array if present, else the single `photo`.
window.itemPhotos = function (a) {
  if (a && a.photos && a.photos.length) return a.photos;
  return (a && a.photo) ? [a.photo] : [];
};
