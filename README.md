# TROLL CAT — `$TROLL`

> Beige cat. Green terminal. Gold chain. Zero explanation.

The official landing site for **TROLL CAT (`$TROLL`)** — a meme coin about a beige cat
wearing the oldest grin on the internet. A high-volume-meme-project aesthetic *turned
ultra on*: green-terminal core, gold-chain accents, animated everything — but every
trust claim is wired to real on-chain proof, or honestly marked **PENDING** until launch.

Built to launch from the [**Robin Labs pad**](https://robinlab.io).

---

## What's in here

```
index.html            Single-page, long-scroll, anchor-nav landing site
404.html              Themed not-found page
robots.txt
assets/
  css/styles.css      Design system (dark-first, phosphor-green + gold)
  js/app.js           All interactions, zero dependencies
  img/                Brand imagery (custom-generated, see below)
```

### Sections
Nav → hero + ticker → what is this → `troll --verify` trust row → how to pet the cat →
the numbers part (trollnomics + MOON MATH) → the squiggly line (chart) → the memedex →
the trollmap → the litter box (community) → FAQ → footer + disclaimer.

## Imagery
All art is **custom-generated** (nano-banana-pro, high quality) to match the brand —
no stock art, no emoji. The set: `hero_scene`, `mascot`, `logo`, `icon` (favicon),
`bg_wall`, `og_banner`, and the memedex (`meme_trader`, `meme_moon`, `meme_diamond`,
`meme_king`). Swap any file in `assets/img/` to reskin — keep the filenames.

## Configure before launch
Everything launch-specific lives in one object at the top of `assets/js/app.js`:

```js
var CONFIG = {
  launched: false,                 // flip to true at launch → reveals live-only UI
  contract: "TBA — not live yet",  // paste the VERIFIED contract address
  links: { buy, chart, x, telegram, pad }   // official links only
};
```

- **`launched: false`** keeps the site in honest pre-launch mode: no fake price, no fake
  countdowns, "no contract exists yet" everywhere, trust badges read `PENDING`.
- Flip to **`true`** and paste the real CA + links: the buy CTAs go live, the chart box is
  ready for a DexScreener embed, and the trust badges are meant to carry on-chain proof links.

## Run locally
Static site — no build step.

```bash
python3 -m http.server 8080     # then open http://localhost:8080
```

## Deploy
Any static host (GitHub Pages, Netlify, Cloudflare Pages). For a custom domain such as
`trollcat.robinlab.io`, point the DNS/`CNAME` at your host and update the `og:url` /
`canonical` in `index.html`.

---

### Disclaimer
`$TROLL` is a meme coin about a cat. It has no intrinsic value and makes no promise of
financial return. Nothing here is financial, legal, or tax advice. Meme coins are highly
speculative — you can lose 100%. DYOR. The cat is fine either way.
