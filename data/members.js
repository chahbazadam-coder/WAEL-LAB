/* =====================================================================
   LAB MEMBERS  —  single source of truth for the Members page AND the
   short preview on the landing page. Add students here as they join.

   Fields:
     group      "Professor" | "Graduate" | "Undergraduate"   (controls section)
     name       display name
     title      role/title line (e.g. "Assistant Professor", "PhD Student")
     photo      image in images/  (leave "" to show initials)
     initials   fallback shown when there's no photo (auto if omitted)
     email, office, ext
     bio        one or two sentences  (shown on Members page only)
     interests  array of short tags   (shown on Members page only)
   ===================================================================== */

window.LAB_MEMBERS = [

  /* ------------------------- PROFESSORS ------------------------- */
  {
    group: "Professor", name: "Dr. Wael Itani", title: "Assistant Professor",
    photo: "images/itani.jpg", initials: "WI",
    email: "wi07@aub.edu.lb", office: "RGB 411", ext: "3554",
    bio: "Fluid dynamics and quantum computing — accelerating multiscale simulations of fluid flow, including quantum algorithms and lattice methods.",
    interests: ["Fluid dynamics", "Kinetic theory", "Lattice methods", "Nonlinear dynamics", "Quantum algorithms", "Photonics"]
  },
  {
    group: "Professor", name: "Dr. Theresa Honein", title: "Assistant Professor",
    photo: "images/honein.jpg", initials: "TH",
    email: "th72@aub.edu.lb", office: "Bechtel 532", ext: "3429",
    bio: "Dynamics and mechanics — physically accurate simulation of constrained and impacting rigid-body systems.",
    interests: ["Dynamics", "Mechanics", "Constraints & holonomy", "Motion planning", "Nonsmooth dynamics"]
  },
  {
    group: "Professor", name: "Dr. Issam Lakkis", title: "Professor & Chairperson",
    photo: "images/lakkis.jpg", initials: "IL",
    email: "il01@aub.edu.lb", office: "Bechtel 309a", ext: "3636",
    bio: "MEMS and microfluidics — grid-free numerical modeling of transport phenomena, bio-flows, and multiscale micro-devices.",
    interests: ["Microfluidics", "MEMS / NEMS", "Grid-free methods", "Transport phenomena", "Molecular dynamics"]
  }

  /* ------------------------- GRADUATE STUDENTS -------------------------
     Add entries with group: "Graduate", e.g.
     { group: "Graduate", name: "[Name]", title: "PhD Student", photo: "",
       email: "[email]", office: "[office]", ext: "",
       bio: "[placeholder]", interests: [] },
  */

  /* ------------------------- UNDERGRADUATES -------------------------
     Add entries with group: "Undergraduate", title: "Undergraduate Researcher", etc.
  */

];

/* ---- helpers ---- */
window.memberInitials = function (m) {
  if (m.initials) return m.initials;
  return (m.name || "").replace(/^Dr\.\s*/, "").split(/\s+/)
    .map(function (w) { return w[0] || ""; }).join("").slice(0, 2).toUpperCase();
};

window.memberPlaceholder = function (m) {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#eef2fe"/>' +
    '<text x="50%" y="55%" fill="#2b5ce6" font-family="sans-serif" font-size="26" font-weight="700" ' +
    'text-anchor="middle" dominant-baseline="middle">' + window.memberInitials(m) + '</text></svg>');
};

// Returns an <img> HTML string with an initials fallback on load error.
window.memberImg = function (m, cls) {
  var ph = window.memberPlaceholder(m);
  var src = m.photo || ph;
  return '<img class="' + cls + '" alt="' + m.name + '" src="' + src +
         '" onerror="this.onerror=null;this.src=\'' + ph + '\'">';
};

window.membersByGroup = function (group) {
  return (window.LAB_MEMBERS || []).filter(function (m) { return m.group === group; });
};
