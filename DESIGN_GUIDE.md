# Georgia Tech Women's Rugby — Website Design Guide

This guide adapts Georgia Tech's institutional brand standards (brand.gatech.edu) for use on the GT Women's Rugby club site. As a club sport, this site uses **Georgia Tech's general Institute branding**, not GT Athletics branding — the interlocking outlined "GT" mark and Athletics-specific logos/wordmarks are reserved exclusively for NCAA Athletics and may not be used here.

## 1. Logo & Identity Rules

- Do **not** create a custom logo to represent the team. Per Institute policy, student organizations may not design their own marks to represent themselves or Georgia Tech.
- If a Georgia Tech logo is used on the site (e.g., in a footer or "About" section), use only the **official primary Institute logo** — not the Athletics interlocking GT.
- Maintain clear space around any GT logo equal to the width/height of the word "Tech" within the mark.
- Minimum logo height: 0.25 in (primary), 1.5 in width (combination logo). If space doesn't allow a combination lockup, use the primary logo and identify "Women's Rugby" in text instead.
- Approved logo/background color pairings:
  - Tech Gold + Navy on White
  - Tech Gold + White on Navy
  - Tech Gold on White
  - White on Navy
  - White on Tech Gold
  - Navy on White (web/communications only)
- Never skew, recolor, outline, or add effects/patterns to the logo.

## 2. Color Palette

### Core Colors
| Name | Hex | RGB | Use |
|---|---|---|---|
| Tech Gold | `#B39051` | 179, 144, 81 | Primary brand color — accents, buttons, highlights |
| Navy | `#051E39` | 5, 30, 57 | Primary dark color — headers, nav, text on light bg |
| Dark Gold | `#8F713D` | 143, 113, 61 | Hover states, borders, secondary emphasis |
| White | `#FFFFFF` | 255, 255, 255 | Backgrounds, text on Navy |

### Secondary Colors
| Name | Hex | RGB | Use |
|---|---|---|---|
| Diploma | `#F9F6E5` | 249, 246, 229 | Warm off-white background alternative |
| Buzz | `#EAAA00` | 234, 170, 0 | Bright gold accent — sparingly, for CTAs/badges |

### Accent Colors (use sparingly, for tags/highlights/graphics — e.g. schedule status, roster positions)
| Name | Hex | RGB |
|---|---|---|
| Campanile (teal) | `#048A81` | 4, 138, 129 |
| Tech Lawn (green) | `#066034` | 6, 96, 52 |
| Burdell (light blue) | `#BBE6F2` | 187, 230, 242 |
| Azalea (pink) | `#D90368` | 217, 3, 104 |
| Whistle (purple) | `#660064` | 102, 0, 100 |

**Guidance:** Gold and Navy should carry the site's primary visual weight (roughly 80% of color usage). Accent colors are for functional differentiation only (e.g., match result badges: win/loss/upcoming) — not decoration.

## 3. Typography

Georgia Tech's digital/web standard uses **Roboto** as the workhorse typeface, avoiding the licensed print fonts (DIN, Adelle) that require paid subscriptions.

| Role | Font | Fallback |
|---|---|---|
| Headings / Nav | **Roboto Slab** (bold/700) | Georgia, serif |
| Body text | **Roboto** (400/regular) | Arial, sans-serif |
| Subheads / pull quotes | **Roboto Slab** (medium/500) | Georgia, serif |
| UI labels / buttons | **Roboto** (500/medium, uppercase, letter-spaced) | Arial, sans-serif |

Both are free via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Slab:wght@500;700&display=swap" rel="stylesheet">
```

**Type scale suggestion:**
- H1: 2.5rem / Roboto Slab 700 / Navy
- H2: 1.75rem / Roboto Slab 700 / Navy
- H3: 1.25rem / Roboto Slab 500 / Dark Gold
- Body: 1rem / Roboto 400 / #1A1A1A (near-black, not pure black on white)
- Small/meta (dates, captions): 0.85rem / Roboto 400 / #555

## 4. Layout & Visual Principles

- **Clarity and recognition** over decoration — GT's stated brand principle. Favor generous white space over dense pages.
- Navy as the dominant "anchor" color (header, footer, nav bar); Gold as the accent that draws the eye (buttons, links, active states); White/Diploma as the primary background.
- Avoid pure black (`#000000`) — use Navy or a near-black (`#1A1A1A`) for text instead, consistent with GT's warmer institutional palette.
- Photography should feel authentic to club/student life — action shots from matches and practices — rather than polished Athletics-style studio photography.

## 5. Component Guidance

- **Buttons:** Navy background / White text (primary); Gold background / Navy text (secondary); on hover, shift to Dark Gold.
- **Links:** Dark Gold or Navy, underlined on hover.
- **Cards (roster, schedule, news):** White or Diploma background, subtle Navy border or shadow, Gold accent line/tag for status.
- **Nav bar:** Navy background, White/Gold text, Gold underline for active page.
- **Footer:** Navy background, White text, small Institute logo (primary lockup only) with "Club Sport" or "Not affiliated with GT Athletics" disclaimer if appropriate.

## 6. What to Avoid

- The outlined interlocking "GT" mark (Athletics-exclusive).
- Any Athletics wordmarks, mascot imagery (Buzz character in Athletics contexts), or official team uniforms/branding — this is a club, not an NCAA program.
- Creating a new/custom club logo without going through Institute trademark licensing.
- Using pure black or off-brand colors (e.g., generic Bootstrap blue) as primary UI colors.

---
*Sourced from Georgia Tech Institute Communications brand guidelines (brand.gatech.edu), general Institute standards — not GT Athletics guidelines.*
