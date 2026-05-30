ASSETS — Reddie's Universe Game
================================

MASCOT
------
- reddie.png   → robot mascot sprite (transparent PNG, ~120x160px)
- reddie.gif   → blinking idle animation (optional, briefing/loading)
  Fallback: red rounded-rect placeholder if missing.

COIN ASSETS (Stage 1 collectibles — each = 10 points)
------------------------------------------------------
Loader tries  assets/coin-<slug>.png  first, then falls back to  assets/<slug>.png,
then to a crimson circle. Current slugs:

  - hospitality   (hotel reception scene)
  - manufaktur    (factory / power plant)
  - pabrik        (industrial plant)
  - tambang       (construction / excavation)
  - toko          (retail store)

Present base files: hospitality.png, manufaktur.png, pabrik.png, tambang.png, toko.png
(To use the coin- naming convention explicitly, add coin-<slug>.png versions.)

OBSTACLE
--------
- obstacle-skull.png  → optional. If missing, a generic 💀 emoji is drawn instead.

CURRENCY
--------
Score unit stays Rupiah, displayed under the label "TYFCB" (Thank You For Closed Business).
HUD center shows cumulative total POINTS; HUD right shows cumulative TYFCB Rp value.
