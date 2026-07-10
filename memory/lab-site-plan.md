---
name: lab-site-plan
description: Plan and pending decisions for the professor's lab website/hub (WAEL-LAB repo)
metadata:
  type: project
---

Building a lab hub site for the user's professor. Field: microfluidics, optics & lasers, electronics ("experimental fluid lab"). Hosted on GitHub Pages at https://chahbazadam-coder.github.io/WAEL-LAB/ (repo: chahbazadam-coder/WAEL-LAB). I handle all git commits/pushes for the user.

**PENDING — remind the user at the end of the session:** they want to rename the GitHub username/repo to something like "experimental fluid lab" (e.g. username `experimental-fluid-lab` or repo rename). After any rename I must run `git remote set-url origin <new-url>` locally or pushes break.

Planned site contents (user's list): lab members + bios; open/ongoing research + past publications; safety procedures (per-machine SOP links + general lab safety); full inventory list (already built in inventory.html with camera scan + smart tags); machinery/equipment list + available tools.

**Decisions (2026-07-10):**
- Site must be PRIVATE (lab members only). GitHub Pages free can't do private → plan to move hosting to Cloudflare Pages + Cloudflare Access (free, email-gated, up to 50 users). Pending user go-ahead.
- 1–2 trusted people will have edit access; everyone else views.
- NO booking system.
- Emergency info folds into the Safety page (not separate).
- Machine operating instructions fold into the Machines & Tools page (not separate SOPs).

**Planned pages:** Home; Members + bios; Research (ongoing) + Publications (past); Safety (per-machine safety links + general lab safety + emergency info); Inventory (scanner, built); Machines & Tools (list + availability + how-to-operate each).

Current files: index.html (home), inventory.html (scanner). Data stored in browser localStorage; no backend yet — may add Supabase later if shared live inventory across devices is needed.
