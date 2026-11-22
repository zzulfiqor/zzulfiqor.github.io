# Ahmad Zuhair Dzulfiqor — Portfolio

Personal portfolio website for **Ahmad Zuhair Dzulfiqor** (Flutter & Mobile Developer).

## Structure

- `index.html` — Semantic HTML5 entry page
- `css/` — Layered stylesheets (`tokens.css`, `base.css`, `layout.css`, `sections.css`, `overlays.css`, `motion.css`) imported via `styles.css`
- `js/` — Modular vanilla ES modules (`data.js`, `utils.js`, `ui/`, `sections/`, `features/`, `app.js`)
- `assets/` — Portrait cutout image
- `tests/` — Unit tests using Node's built-in `node:test` runner

## Local Development & Tests

Run unit tests:

```bash
node --test tests/utils.test.mjs
```

Serve locally:

```bash
npx serve .
```
