# With Love, Aisha — Eman's Sixth Birthday Wish

A complete, standalone React 19 + TypeScript + Vite birthday greeting. This is a loving digital card, not an invitation.

## Run locally

Install Node.js 22.12 or newer (Node 24 LTS recommended), then open a terminal in this extracted folder:

```sh
npm install
npm run dev
```

Open the local address printed by Vite (usually http://localhost:5173). Do not open index.html directly; it requires the development server.

## Build and preview

```sh
npm run build
npm run preview
```

Upload the contents of the generated `dist` directory to any static website host. No backend, credentials, paid service, or Lovable account is required.

## Change the words

The greeting is for Eman, from Aisha. To change any wording, edit `src/lib/birthday-content.ts` and rebuild. There is no on-screen editor.

All colors, typography, and animations are in `src/styles.css`. The cake artwork is in `src/assets/birthday-cake.jpg` and has exactly six candles.

## Included experience

- Soft pink, cream and gold palette with satin bows, flowers, balloons, a little crown, twinkling stars and drifting petals
- Shimmering gold script name, glowing six-candle cake and a sheen-sweep wish button
- Interactive birthday wish with floating hearts
- The love note is hidden: tap the gift, it pops open with sparkles, then tap the envelope, the wax seal breaks and the note rises out in a gold-framed letter
- A cute teddy waiting beside the gift
- A cinematic opening: sparkling intro text, falling confetti, rising balloons, Eman's name with a dropping crown, then pink curtains part to reveal the card (tap Skip to jump ahead)
- Keyboard-accessible dialogs, phone-friendly layout, reduced-motion support

Fonts load from Google Fonts when online; serif and sans-serif fallbacks work offline. Cake art and all source files are included. Dependencies are declared in package.json and pinned by package-lock.json; node_modules and generated build output are deliberately excluded from the source ZIP.

## Source structure

- `src/main.tsx`: standalone React entry
- `src/components/birthday-card.tsx`: full birthday card and interactions
- `src/components/ui/button.tsx`: reusable button variants
- `src/lib/birthday-content.ts`: greeting copy (names, message)
- `src/lib/utils.ts`: class name helper
- `src/styles.css`: semantic palette and complete visual design
- `src/assets/birthday-cake.jpg`: included six-candle cake artwork

The live Lovable preview uses the same greeting component in its existing TanStack Start shell. This downloadable edition uses a standard Vite shell for easy independent running and hosting.
