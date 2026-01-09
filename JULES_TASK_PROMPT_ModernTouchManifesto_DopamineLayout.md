# JULES TASK PROMPT: Modern Touch Manifesto - Dopamine-Optimized Video-First Layout

**Priority:** HIGH - User is waiting for completion
**Deadline:** Complete before user returns
**Status:** Must build successfully and deploy

---

## CONTEXT

You're building "The Modern Touch Manifesto" section for the Kareem Crown pre-portfolio site (MTM Media). The section serves as the **introduction lead-in between Hero and Meet The Forge sections**.

**Design Direction:** The user wants maximum dopamine impact. Video-first layout has been scientifically validated as higher engagement for this ICP (entrepreneurs seeking sovereignty/ROI).

**Current State:** Staggered box layout is implemented but video integration is pending. You need to add the video section to create the dopamine-optimized layout.

---

## VISUAL REFERENCE

**Image 1 (Design Spec):**
- Staggered LEFT/RIGHT boxes for manifesto text (01-04)
- Dark matte cards (#0d0d0d) with subtle gold borders
- Large shadowed numbers in background
- Gold-highlighted key terms
- Pulsing CTA box at bottom

**Image 2 (Card Styling):**
- Rounded corners (12px radius)
- Deep charcoal background (#0d0d0d)
- Thin gold border (1px, rgba(212,175,55,0.2))
- Center-aligned content hierarchy
- Premium, luxury tech aesthetic

---

## YOUR TASK

Implement the **VIDEO-FIRST DOPAMINE LAYOUT**:

```
┌─────────────────────────────────────────────────────────────┐
│                    SECTION HEADER                            │
│          THE MODERN TOUCH [GOLD]MANIFESTO[/GOLD]            │
│                    (gold underline)                          │
├───────────────────────┬─────────────────────────────────────┤
│                       │                                     │
│   ┌─────────────────┐ │   ┌─────────────────────────────┐   │
│   │   CUSTOMER      │ │   │  □ 01 - THE REALITY CHECK   │   │
│   │   JOURNEY       │ │   │    [Left-aligned card]      │   │
│   │   VIDEO/GIF     │ │   │                             │   │
│   │                 │ │   │  □ 02 - THE SHIFT           │   │
│   │   [Auto-play]   │ │   │    [Right-aligned card]     │   │
│   │   [Loop]        │ │   │                             │   │
│   │   [Muted]       │ │   │  □ 03 - THE MECHANISM       │   │
│   │                 │ │   │    [Left-aligned card]      │   │
│   └─────────────────┘ │   │                             │   │
│                       │   │  □ 04 - THE RESULT           │   │
│   "YOUR JOURNEY       │ │    [Right-aligned card]       │   │
│    STARTS HERE"       │ │                             │   │
│   (gold caption)      │ └─────────────────────────────┘   │
│                       │                                     │
├───────────────────────┴─────────────────────────────────────┤
│                                                             │
│         ┌─────────────────────────────────────────┐         │
│         │      THE PALACE IS OPEN.                │         │
│         │    Don't just watch the shift. Own it.  │         │
│         │    [Pulsing gold glow effect]           │         │
│         └─────────────────────────────────────────┘         │
│                                                             │
│              MARKETING MASTERY FOR MODERN MINDS              │
│                    (gold, tracking-wide)                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## TECHNICAL SPECIFICATIONS

### 1. Brand Colors (MANDATORY)
```css
--gold-primary:     #D4AF37  /* Midas Gold */
--gold-secondary:   #B6862C  /* Matte Gold */
--obsidian-black:   #0A0A0A  /* Background base */
--chrome-white:     #F5F5F5  /* Text primary */
--card-bg:          #0d0d0d  /* Card background */
--card-border:      rgba(212, 175, 55, 0.2)  /* Subtle gold */
```

### 2. Layout Structure

**Desktop (>1024px):**
- Two-column grid (50% video, 50% text)
- Video column: STICKY position (stays visible while scrolling text)
- Text column: Staggered boxes alternating left/right alignment
- Maximum content width: 1400px centered

**Tablet/Mobile:**
- Single column stack
- Video on top OR bottom (user preference - put video on top for dopamine hit)
- Stacked boxes with full-width cards
- Responsive padding adjustments

### 3. Video Specifications

**File Requirements:**
```typescript
// Required files in /public:
/public/videos/customer-journey.mp4    // Primary video (auto-play)
/public/images/customer-journey.gif    // Fallback GIF
/public/images/manifesto-poster.jpg    // Video poster image
```

**Video Attributes:**
```jsx
<video
  autoPlay        // Starts immediately
  loop            // Repeats seamlessly
  muted           // Required for autoplay
  playsInline     // Mobile compatibility
  poster="/images/manifesto-poster.jpg"
  className="w-full h-full object-cover"
>
  <source src="/videos/customer-journey.mp4" type="video/mp4" />
  <img src="/images/customer-journey.gif" alt="Customer Journey" />
</video>
```

**Video Container:**
```jsx
<div className="relative aspect-video rounded-xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-2xl shadow-[#D4AF37]/10">
  {/* video element here */}
  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-black/50 via-transparent to-transparent pointer-events-none" />
</div>
<p className="text-center text-[#D4AF37] text-sm tracking-[0.2em] uppercase mt-4">
  Your Journey Starts Here
</p>
```

### 4. Staggered Box Component

**Props:**
```typescript
interface ManifestoBoxProps {
  number: string;      // "01", "02", "03", "04"
  title: string;       // "THE REALITY CHECK", etc.
  children: ReactNode; // Paragraph content
  isInView: boolean;   // Animation trigger
  align: "left" | "right";
}
```

**Styling:**
```jsx
<div className={`flex flex-col ${align === "right" ? "md:items-end" : "md:items-start"}`}>
  {/* Large shadowed number in background */}
  <span className="text-7xl md:text-8xl font-bold text-[#D4AF37]/15 select-none absolute -top-8">
    {number}
  </span>
  
  {/* Card */}
  <div className="w-full md:w-4/5 bg-[#0d0d0d] border border-[#D4AF37]/20 rounded-xl p-6 md:p-8">
    <h3 className="text-2xl md:text-3xl font-bold text-chrome-white mb-4">
      {title}
    </h3>
    <div className="text-gray-300 leading-relaxed text-lg">
      {children}
    </div>
  </div>
</div>
```

**Alignment Pattern:**
```javascript
// Box 01: align="left"
// Box 02: align="right"
// Box 03: align="left"
// Box 04: align="right"
```

### 5. Text Highlighting

**Gold-highlighted terms in content:**
- Sovereignty
- Modern Touch
- The Forge
- Midas OS
- Roman, Goldie, Nina, Echo (AI team names)
- ROI

**Implementation:**
```jsx
<span className="text-[#D4AF37] font-semibold">Sovereignty</span>
```

### 6. CTA Box

**Location:** Below video column, centered
**Styling:**
```jsx
<div className="relative inline-block">
  <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#B6862C] rounded-2xl blur opacity-30 animate-pulse" />
  <div className="relative bg-[#0d0d0d] border border-[#D4AF37]/50 rounded-2xl p-8 md:p-12">
    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-chrome-white mb-4">
      THE PALACE IS OPEN.
    </p>
    <p className="text-xl md:text-2xl text-[#D4AF37] font-semibold">
      Don't just watch the shift. <span className="text-white">Own it.</span>
    </p>
  </div>
</div>
```

### 7. Animations

**Framer Motion Configuration:**
```javascript
const containerRef = useRef(null);
const isInView = useInView(containerRef, { once: true, margin: "-100px" });

// Section header
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>

// Individual boxes (staggered entrance)
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>

// CTA box (delayed)
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
>
```

---

## FILE LOCATIONS

**Component File:**
```
/workspace/Kareem Crown Pre-Portfolio Site Codebase/components/ModernTouchManifesto.tsx
```

**Page Integration:**
```
/workspace/Kareem Crown Pre-Portfolio Site Codebase/app/page.tsx
```

**Current Status:** 
- Component exists, imports correctly
- Page already has `<ModernTouchManifesto />` between Hero and MeetTheForge

---

## EXECUTION CHECKLIST

### Phase 1: Component Restructure
- [ ] Read current `ModernTouchManifesto.tsx`
- [ ] Implement two-column grid layout (video LEFT, text RIGHT)
- [ ] Add sticky positioning to video column
- [ ] Restructure text into staggered boxes (01-04)
- [ ] Apply correct card styling (#0d0d0d bg, gold border, 12px radius)

### Phase 2: Video Integration
- [ ] Create video container with aspect-ratio
- [ ] Implement `<video>` with autoPlay, loop, muted, playsInline
- [ ] Add fallback to `<img>` GIF
- [ ] Add poster image support
- [ ] Style video container (gold border, shadow effect)
- [ ] Add "Your Journey Starts Here" caption

### Phase 3: Content & Styling
- [ ] Verify all 4 manifesto blocks have correct content
- [ ] Apply gold highlighting to key terms
- [ ] Implement alternating left/right alignment
- [ ] Add large shadowed numbers (text-[#D4AF37]/15)
- [ ] Style CTA box with pulsing gold glow

### Phase 4: Animations & Polish
- [ ] Add Framer Motion scroll triggers
- [ ] Configure stagger delays for boxes
- [ ] Add entrance animations to all elements
- [ ] Verify responsive behavior (mobile stack)

### Phase 5: Testing
- [ ] Run local build: `cd "Kareem Crown Pre-Portfolio Site Codebase" && npm run build`
- [ ] Fix any ESLint errors
- [ ] Verify no TypeScript errors
- [ ] Ensure build succeeds (exit code 0)

### Phase 6: Deployment
- [ ] Commit changes with descriptive message
- [ ] Push to branch `feature/modern-touch-manifesto-15066339748223857581`
- [ ] Verify Vercel deployment starts automatically

---

## QUALITY STANDARDS

### Visual Requirements
- [ ] Brand colors exactly as specified (#D4AF37, #0A0A0A, #F5F5F5)
- [ ] No unauthorized colors (purples, teals, random shades)
- [ ] Premium, luxury aesthetic throughout
- [ ] Consistent spacing and alignment
- [ ] Professional typography hierarchy

### Code Requirements
- [ ] Clean, readable TypeScript
- [ ] Proper React hooks usage
- [ ] Type-safe component props
- [ ] Semantic HTML structure
- [ ] Responsive Tailwind classes
- [ ] No console errors or warnings

### Build Requirements
- [ ] `npm run build` exits with code 0
- [ ] No ESLint errors
- [ ] No TypeScript errors
- [ ] All assets properly referenced

---

## TESTING COMMANDS

```bash
# Navigate to project
cd "/workspace/Kareem Crown Pre-Portfolio Site Codebase"

# Run build
npm run build

# Expected output:
# ✓ Compiled successfully
# ✓ Linting and checking validity of types
# ✓ Generating static pages (4/4)
# Build successful - exit code 0
```

---

## GIT WORKFLOW

```bash
# Stage changes
git add "Kareem Crown Pre-Portfolio Site Codebase/components/ModernTouchManifesto.tsx"

# Commit with descriptive message
git commit -m "feat: Implement dopamine-optimized video-first manifesto layout

- Two-column layout: Video (left sticky), Text (right staggered)
- Auto-playing customer journey video with GIF fallback
- Staggered cards 01-04 with gold highlighting
- Premium card styling: #0d0d0d bg, gold borders, 12px radius
- Pulsing CTA box with gold glow effect
- Brand-compliant colors (#D4AF37, #0A0A0A, #F5F5F5)
- Scroll-triggered Framer Motion animations"

# Push to branch
git push origin feature/modern-touch-manifesto-15066339748223857581

# Verify deployment triggers on Vercel
```

---

## COMMON ISSUES TO AVOID

1. **Duplicate Imports:** Ensure `ModernTouchManifesto` is imported only once in page.tsx
2. **Unescaped Apostrophes:** Use `&apos;` for all apostrophes in JSX text
3. **Missing Imports:** Don't forget Framer Motion imports (`motion`, `useInView`)
4. **Color Consistency:** Use CSS variables or consistent hex values throughout
5. **Video Permissions:** Video must be `muted` to autoplay in most browsers
6. **Build Testing:** Always run `npm run build` before committing

---

## SUCCESS CRITERIA

When complete, the user should see:

1. ✅ Hero section → Modern Touch Manifesto (with video) → Meet The Forge
2. ✅ Video playing automatically on the left (desktop)
3. ✅ Staggered text boxes flowing down the right side
4. ✅ Gold accents and premium branding throughout
5. ✅ CTA box with pulsing glow at bottom
6. ✅ Smooth scroll animations on entrance
7. ✅ No build errors
8. ✅ Successful Vercel deployment

---

## NOTES

- User is excited about dopamine-optimized layout
- Video-first approach validated as higher engagement
- Brand compliance is critical - no unauthorized colors
- Quality over speed - execute properly
- User will review upon return - make it perfect

---

**GO FORTH AND EXECUTE. Make it shine. The user is counting on you to deliver a world-class experience.**

🚀
