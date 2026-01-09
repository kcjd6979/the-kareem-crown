# Design Baseline v1: MTM Premium Design

This document serves as the single source of truth for the visual design of "The Kareem Crown" pre-portfolio website. All future structural and content changes must adhere to this baseline to ensure 100% visual fidelity.

## Table of Contents

1.  [Color Palette](#color-palette)
2.  [Gradients](#gradients)
3.  [Typography](#typography)
4.  [Shadows & Glows](#shadows--glows)
5.  [Components](#components)
6.  [Animations](#animations)

---

## 1. Color Palette

### Primary Colors
- **Midas Gold (Glossy):** `#D4AF37` (`--midas-gold-glossy`)
- **Obsidian Black:** `#0A0A0A` (`--obsidian-black`)
- **Chrome White:** `#F5F5F5` (`--chrome-white`)

### Secondary Colors
- **Midas Gold (Matte):** `#B6862C` (`--midas-gold-matte`)
- **Jet Black (Soft):** `#1A1A1A` (`--jet-black-soft`)
- **Metallic Silver:** `#C0C0C0` (`--metallic-silver`)

### Accent Color
- **Hi-Gloss Chrome:** `#E1E1E1` (`--hi-gloss-chrome`)

### Persona Colors
- **Goldie:** `#D4AF37`
- **Roman:** `#C0C0C0`
- **Nina:** `#E1E1E1`
- **Echo:** `#D4AF37`

---

## 2. Gradients

- **Premium Gold Gradient:** `linear-gradient(135deg, #D4AF37 0%, #B6862C 100%)` (`--gold-gradient`)
- **Light Gold Gradient (Text):** `linear-gradient(135deg, #FFFFFF 0%, #D4AF37 100%)`
- **Section Divider:** `linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)`

---

## 3. Typography

- **Headings:** 'Playfair Display SC', 'serif' (`font-playfair`) - Weights: 400, 700, 900
- **Body:** 'Merriweather', 'serif' (`font-merriweather`) - Weights: 400, 700

---

## 4. Shadows & Glows

- **Gold Glow:** `0 0 30px rgba(212, 175, 55, 0.3)` (`--glow-gold`)
- **Persona Glows:**
  - **Goldie/Echo:** `rgba(212, 175, 55, 0.4)` (`--goldie-glow`, `--echo-glow`)
  - **Roman:** `rgba(192, 192, 192, 0.4)` (`--roman-glow`)
  - **Nina:** `rgba(225, 225, 225, 0.4)` (`--nina-glow`)

---

## 5. Components

### Glassmorphism Card (`.glass-card`)
- **Background:** `rgba(255, 255, 255, 0.02)`
- **Filter:** `blur(20px)`
- **Border:** `1px solid rgba(255, 255, 255, 0.08)`
- **Box Shadow:** `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)`

### Glowing Glass Card (`.glass-card-glow`)
- **Background:** `linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0.3) 100%)`
- **Border Top:** `2px solid var(--persona-color, #D4AF37)`
- **Box Shadow:** `0 10px 40px rgba(0, 0, 0, 0.4), var(--glow-persona)`

### Buttons
- **Gold Button (`.btn-gold`):**
  - **Background:** `--gold-gradient`
  - **Color:** `#050505`
  - **Box Shadow:** `--glow-gold`
  - **Hover:** `transform: translateY(-2px); box-shadow: 0 0 40px rgba(212, 175, 55, 0.5);`
- **Gold Outline Button (`.btn-gold-outline`):**
  - **Color:** `--midas-gold-glossy`
  - **Border:** `2px solid var(--midas-gold-glossy)`
  - **Hover:** `background: rgba(212, 175, 55, 0.1); box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);`

---

## 6. Animations

- **Particle Float (`particleFloat`):** 20s infinite linear animation for background particles.
- **Fade In Up (`fadeInUp`):** 0.8s cubic-bezier animation for scroll-reveal elements.
- **Shimmer (`shimmer`):** 3s infinite animation for shimmering effects.
- **Pulse Glow (`pulseGlow`):** 2s ease-in-out infinite animation for pulsing glows.
- **Ring Pulse (`ringPulse`):** 4s ease-in-out infinite animation for metallic rings.
