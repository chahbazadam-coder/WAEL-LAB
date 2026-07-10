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
     photo       optional image in images/ (machines mainly)

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

  /* ------------------------- MACHINES ------------------------- */
  {
    id: "laser-cutter", no: "EFD-M-001", type: "machine", name: "CO₂ Laser Cutter", icon: "laser",
    category: "Optics", status: "available", location: "Room 1 — bench A",
    photo: "images/machine-laser.jpg",
    description: "Cuts and engraves acrylic, paper, and thin polymers. Used for rapid microfluidic mould and jig prototyping.",
    howItWorks: [
      "Put on the correct laser safety goggles.",
      "Turn on exhaust/extraction before the laser.",
      "Load material, set focus, set power/speed in the software.",
      "Never leave the laser running unattended.",
      "Turn off the laser, then leave exhaust running 2 min."
    ],
    manuals: [ { label: "User manual (PDF)", url: "" }, { label: "Quick-start booklet", url: "" } ],
    safety: "safety.html#laser",
    lastMaintained: "2026-06-15",
    note: "Class 4 laser — trained users only."
  },
  {
    id: "plasma-cleaner", no: "EFD-M-002", type: "machine", name: "Plasma Cleaner", icon: "plasma",
    category: "Microfluidics", status: "available", location: "Room 2 — fume hood",
    photo: "images/machine-plasma.jpg",
    description: "Oxygen-plasma surface activation for irreversible PDMS–glass bonding.",
    howItWorks: [
      "Place PDMS and glass in the chamber, treated faces up.",
      "Close chamber, start the vacuum pump.",
      "Run plasma for the set time (e.g. 30–45 s).",
      "Vent, remove parts, bond immediately while activated."
    ],
    manuals: [ { label: "Operating manual", url: "" } ],
    safety: "safety.html#plasma",
    lastMaintained: "2026-05-02",
    note: ""
  },
  {
    id: "spin-coater", no: "EFD-M-003", type: "machine", name: "Spin Coater", icon: "spincoater",
    category: "Microfluidics", status: "down", location: "Room 2 — bench C",
    photo: "images/machine-spincoater.jpg",
    description: "Deposits uniform thin films of photoresist on wafers and slides.",
    howItWorks: [
      "Select or program the spin recipe (rpm, ramp, time).",
      "Center the wafer/slide on the chuck; check the vacuum holds.",
      "Dispense resist, close the lid, run the program.",
      "Soft-bake per your process."
    ],
    manuals: [ { label: "Manual", url: "" } ],
    safety: "safety.html#chemicals",
    lastMaintained: "2026-03-20",
    note: "",
    maintenance: {
      needed: true, priority: "high",
      issue: "Chuck vacuum leak — won't hold the wafer during spin.",
      action: "Replace the chuck vacuum seal; call service if it persists.",
      reported: "2026-07-08"
    }
  },
  {
    id: "microscope", no: "EFD-M-004", type: "machine", name: "Inverted Microscope + Camera", icon: "microscope",
    category: "Optics", status: "inuse", location: "Room 1 — optics table",
    photo: "images/machine-microscope.jpg",
    description: "Brightfield/fluorescence imaging of chips and samples, with digital camera capture.",
    howItWorks: [
      "Turn on illumination and the camera software.",
      "Start at low magnification, then focus up.",
      "Match the objective to the correct immersion medium.",
      "Turn off the lamp after use to preserve bulb life."
    ],
    manuals: [ { label: "Camera software guide", url: "" } ],
    safety: "",
    lastMaintained: "2026-06-01",
    note: "Book informally on the whiteboard."
  },
  {
    id: "syringe-pump", no: "EFD-M-005", type: "machine", name: "Syringe Pump (×2)", icon: "pump",
    category: "Microfluidics", status: "available", location: "Room 2 — bench C",
    photo: "images/machine-syringepump.jpg",
    description: "Precise, programmable flow control for driving fluids through microfluidic chips.",
    howItWorks: [
      "Mount the syringe, set the syringe diameter in the menu.",
      "Set the flow rate and volume.",
      "Prime tubing to remove air before connecting the chip.",
      "Start; watch the first minute for leaks."
    ],
    manuals: [ { label: "Manual", url: "" } ],
    safety: "",
    lastMaintained: "2026-04-10",
    note: ""
  },
  {
    id: "oscilloscope", no: "EFD-M-006", type: "machine", name: "Oscilloscope + Function Generator", icon: "scope",
    category: "Electronics", status: "available", location: "Room 3 — electronics bench",
    photo: "images/machine-scope.jpg",
    description: "Signal generation and measurement for testing custom control electronics and sensors.",
    howItWorks: [
      "Power on, connect probes, compensate the probe if needed.",
      "Set timebase and vertical scale to see your signal.",
      "Use Auto-set as a starting point, then fine-tune."
    ],
    manuals: [ { label: "Manual", url: "" } ],
    safety: "",
    lastMaintained: "2026-02-18",
    note: "",
    maintenance: {
      needed: true, priority: "low",
      issue: "Annual calibration due.",
      action: "Send probes for calibration or run the self-cal routine.",
      reported: "2026-07-01"
    }
  },

  /* ------------------------- CABINETS / LOCKERS ------------------------- */
  {
    id: "cab-optics", no: "EFD-C-001", type: "cabinet", name: "Optics Cabinet A", icon: "cabinet",
    location: "Room 1 — beside optics table",
    description: "Optical components and mounts. Return items to their labeled slots.",
    contains: [ "tool-calipers", "tool-tweezers" ]
  },
  {
    id: "cab-electronics", no: "EFD-C-002", type: "cabinet", name: "Electronics Locker", icon: "cabinet",
    location: "Room 3 — under the bench",
    description: "Hand tools and small electronics equipment.",
    contains: [ "tool-multimeter", "tool-soldering", "tool-screwdrivers" ]
  },

  /* ------------------------- TOOLS ------------------------- */
  { id: "tool-multimeter",  no: "EFD-T-001", type: "tool", name: "Digital Multimeter", icon: "tool",
    purpose: "Measure voltage, current, resistance, and continuity.", home: "cab-electronics", qty: "3", location: "Electronics Locker, drawer 1" },
  { id: "tool-soldering",   no: "EFD-T-002", type: "tool", name: "Soldering Station", icon: "tool",
    purpose: "Solder electronic components and connectors.", home: "cab-electronics", qty: "2", location: "Electronics bench" },
  { id: "tool-screwdrivers",no: "EFD-T-003", type: "tool", name: "Precision Screwdriver Set", icon: "tool",
    purpose: "Small fasteners for enclosures and instruments.", home: "cab-electronics", qty: "1", location: "Electronics Locker" },
  { id: "tool-calipers",    no: "EFD-T-004", type: "tool", name: "Digital Calipers", icon: "tool",
    purpose: "Measure dimensions to 0.01 mm.", home: "cab-optics", qty: "2", location: "Optics Cabinet A, drawer 2" },
  { id: "tool-tweezers",    no: "EFD-T-005", type: "tool", name: "Tweezers (assorted)", icon: "tool",
    purpose: "Handle small parts, chips, and optical components.", home: "cab-optics", qty: "6", location: "Optics Cabinet A" }

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
