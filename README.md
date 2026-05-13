# Shauryawada Resorts — Cinematic Demo

A premium, mobile-first luxury hospitality demo featuring an interactive 3D resort booking experience alongside a polished standard booking flow.

## Highlights
- **Cinematic homepage** with interactive resort selector
- **Standard booking flow**: 3-step (stay details → choose room → confirm)
- **Immersive 3D booking** at `/booking/3d` — orbit a stylized low-poly resort, hover/tap rooms, see live availability
- **Mobile-first**: redesigned layouts, touch-friendly 3D controls, bottom-sheet selection panel
- Three resorts: Alibaug, Pune, Mahabaleshwar

## Stack
- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS v3
- Framer Motion (page & section animations)
- Three.js · @react-three/fiber · @react-three/drei (3D scene)
- lucide-react icons

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Build
```bash
npm run build
npm start
```

## Project structure
```
app/
  page.tsx              # Cinematic homepage
  resorts/              # Resorts index + [slug] detail
  booking/page.tsx      # Standard 3-step booking
  booking/3d/page.tsx   # 3D booking experience
  gallery/, about/, contact/
components/
  Nav.tsx, Footer.tsx
  CinematicHero.tsx, ResortShowcase.tsx
  three/ResortScene3D.tsx   # The 3D scene
data/
  resorts.ts, rooms.ts
public/images/          # Brand imagery
```

## 3D experience notes
The 3D scene uses stylized low-poly geometry (no large model files), per-room status colors (green=available, gold=selected, red=booked, grey=maintenance), and ambient lighting + fog for a cinematic feel. Controls are damped and touch-optimized.

— Demo only. No payments are processed.
