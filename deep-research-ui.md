# Premium iOS Craft for React Native + Expo

## Table of contents

- Executive synthesis  
- Aesthetic strategy framework  
- iOS visual craft deep dive  
- Motion, micro-interactions, delight, and light gamification  
- iPhone-first, iPad-ready, and accessibility + beauty  
- React Native + Expo implementation playbook and performance-aware craft  
- Benchmarks, QA rubric, Codex skill blueprint, and the golden system  

## Executive synthesis

**Legend for claim types (used throughout):**  
- **[FACT]** Verified directly in sources.  
- **[INFERENCE]** Strong conclusion drawn from multiple sources or well-established platform behaviors.  
- **[RECOMMENDATION]** Opinionated default decision optimized for shipping premium iOS apps as a solo builder.

**Key sources and currency (links appear in citations; include “accessed” date for traceability):**

| Source | Why it matters to this skill | Date / currency |
|---|---|---|
| entity["company","Apple","technology company, cupertino"] Design pages (Design Resources, SF Symbols, UI Design Tips, Liquid Glass gallery, press release) | The “taste bar” + platform direction (Liquid Glass, concentricity, hit targets, SF Symbols evolution) | Apple press release: 2025-06-09; iOS/iPadOS 26 design kits news: 2025-07-18; pages accessed 2026-02-21. citeturn42view0turn43view0turn3view0turn25view0turn40view0turn41view0 |
| entity["company","Expo","react native platform, 650 industries"] docs (GlassEffect, Symbols, MeshGradient, BlurView, Image, Device, Router) | What you can actually ship in managed workflow for “premium iOS” (Liquid Glass, SF Symbols, gradients, imaging) | Docs accessed 2026-02-21; multiple pages show current bundled versions and availability constraints. citeturn30view0turn32view0turn31view0turn9search0turn9search5turn29view0turn10search8turn10search11 |
| React Native docs (AccessibilityInfo, Text maxFontSizeMultiplier, PlatformColor, useWindowDimensions, performance, FlatList optimization, New Architecture notes) | The “real constraints” of RN + how to stay fast and accessible while looking premium | Many pages updated late 2025 / early 2026; AccessibilityInfo last updated 2026-02-20. citeturn35view0turn34search1turn7search0turn28search0turn10search4turn6search0turn6search1 |
| entity["organization","Nielsen Norman Group","ux research firm"] on animation, microinteractions, gamification, aesthetic-usability effect | Evidence-based guardrails: when delight helps vs harms | 2014–2020+ articles; accessed 2026-02-21. citeturn5search1turn5search5turn5search0turn36search0turn5search8 |
| entity["organization","W3C","web standards body"] and Design Tokens Community Group spec | A defensible token architecture (portable and automatable) | Format Module 2025.10 published 2025-10-28. citeturn24search0turn11search3 |
| Apple App Store Connect accessibility evaluation criteria (Sufficient Contrast, Reduced Motion) | Practical “ship it” QA standards Apple expects teams to test against | Pages accessed 2026-02-21. citeturn37view0turn39view3 |
| Apple Design Awards + Liquid Glass design gallery | Concrete benchmarks (what Apple calls “delight”, “visuals & graphics”, and “interaction”) | ADA 2025 page accessed 2026-02-21; gallery accessed 2026-02-21. citeturn13view0turn14view2turn25view0 |

### Top 20 non-negotiable principles for beautiful React Native iOS apps

1. **Design for content-first “layers,” not for “components on a page.”** Modern iOS 26 design explicitly refocuses surfaces and controls as a layer that yields to content; tab bars shrink/expand based on scroll to keep focus on content. **[FACT]** citeturn42view0turn25view0  
2. **Treat “Liquid Glass” and translucency as a *capability*, not a default.** People may enable Reduce Transparency/Increase Contrast; some users report discomfort with intense glass effects, so the same UI must remain legible and calm without translucency. **[FACT]** citeturn37view0turn11news40turn11news39  
3. **In RN, “premium” = consistent tokens + ruthless elimination of one-off styling.** The fastest path to “expensive” feel is consistency (spacing, type, radii, shadows, motion), not novelty. **[INFERENCE]** grounded in design-systems practice + token specs. citeturn24search0turn24search1  
4. **Use system-native affordances wherever they buy “trust.”** Native navigation transitions, native tab bars (when suitable), native SF Symbols, native glass effects on iOS 26—these read as “real iOS.” **[FACT]** Expo Router supports native tabs; expo-symbols exposes SF Symbols; expo-glass-effect uses iOS native UIVisualEffectView. citeturn7search11turn7search19turn32view0turn30view0  
5. **Hit targets are non-negotiable: 44×44pt minimum.** This is explicitly stated in Apple’s “UI Design Dos and Don’ts.” **[FACT]** citeturn40view0  
6. **Prioritize legibility: text should be at least 11pt** (Apple’s baseline guidance), *then* style it. **[FACT]** citeturn40view0  
7. **Motion must be subtle, brief, and purposeful**—primarily feedback, state change, navigation metaphors, signifiers. **[FACT]** citeturn5search5turn5search1  
8. **Treat reduced motion as a first-class design mode, not an afterthought.** Apple’s evaluation criteria explicitly calls out parallax/depth simulation, multi-axis motion, spinning/vortex, and auto-advancing carousels as problematic triggers that should be disabled or replaced. **[FACT]** citeturn39view3turn35view0  
9. **Delight is “quiet competence,” not confetti everywhere.** Premium delight is often micro: a perfect haptic, a controlled gradient shift, a small symbol animation. **[INFERENCE]** consistent with Apple’s emphasis on “smallest details” and research on animation being unobtrusive. citeturn42view0turn5search5  
10. **Use illustrations and imagery with a single art direction.** Apple Design Awards descriptions repeatedly highlight “cohesive theme,” “consistent illustrations,” and craft details as part of visuals/graphics excellence. **[FACT]** citeturn14view2  
11. **One “signature moment” per core flow.** A premium product usually has one memorable interaction per flow (not per screen). **[INFERENCE]** supported by microinteraction framing (single-purpose microinteractions convey brand). citeturn5search1turn36search0  
12. **Don’t fight the iPhone thumb.** Critical actions should live in bottom reach zones; Apple’s gallery notes multiple apps shifting controls from top toolbars to bottom bars/popovers to keep actions in reach and unlock edge-to-edge content. **[FACT]** citeturn25view0turn42view0  
13. **Spend your uniqueness budget on 3 things: typography, color/material, and motion.** Everything else should be predictably usable. **[RECOMMENDATION]** (default differentiation strategy).  
14. **Avoid “web tells”**: hover states, dense type, overuse of hairlines, rigid grids, tiny tap targets, and “flat-only” shadows that don’t match iOS depth language. **[INFERENCE]** derived from Apple guidance + common failure patterns. citeturn40view0turn42view0  
15. **Prefer semantic colors and dynamic adaptation over fixed hex.** RN supports PlatformColor/DynamicColorIOS; Apple emphasizes system colors adapting to appearance and accessibility settings. **[FACT]** citeturn7search0turn35view0turn11search2  
16. **Lists are where products feel cheap or premium.** Use strong list performance primitives and keep list row visuals simple enough to scroll at 60 FPS. **[FACT]** RN targets 60 FPS; FlashList exists to solve list performance. citeturn10search4turn6search3  
17. **Prefer real device testing for “perceived quality.”** Glass, blur, haptics, text scaling, and scroll physics can’t be trusted fully in screenshots or emulators. **[INFERENCE]** supported by Apple evaluation criteria emphasizing real settings + Xcode inspection. citeturn37view0turn39view3  
18. **Build iPad compatibility as “layout capability,” not as separate screens.** Apple’s gallery emphasizes dynamic adaptation to window size (e.g., two-column inspector; refined spacing/targets). **[FACT]** citeturn25view0turn29view0  
19. **Exploit SF Symbols as a design system, not as icons.** SF Symbols 7 includes variable rendering and Draw animations and is explicitly designed to integrate with SF; it’s a motion + iconography system. **[FACT]** citeturn41view0turn32view0  
20. **A beautiful UI can mask usability problems** (aesthetic-usability effect), so your QA rubric must separately score “beauty” and “clarity/task success.” **[FACT]** citeturn36search0  

### “If you do only these things, do this” shortlist

**For a solo builder shipping production RN iOS apps, these are the highest leverage moves:**

- Build a small internal design system: tokens + 10–14 core components (Text, Button, Icon, Card, ListRow, Input, Sheet, Tabs, Toast, EmptyState, Progress, Avatar, Divider). **[RECOMMENDATION]** grounded in token standardization practice. citeturn24search0turn24search1  
- Use native iOS primitives when they directly map to perceived quality: **SF Symbols via expo-symbols**, iOS 26 glass via **expo-glass-effect**, high-quality images via **expo-image**, performant lists via **FlashList**. **[FACT]** citeturn32view0turn30view0turn9search0turn6search3  
- Treat accessibility toggles (Reduce Transparency, Reduce Motion, Bold Text, font scale) as *design variants* with explicit overrides in tokens. **[FACT]** Apple evaluation criteria recommends testing with Bold Text / Increase Contrast / Reduce Transparency and provides motion-trigger guidance; RN exposes those settings via AccessibilityInfo. citeturn37view0turn39view3turn35view0  
- Keep motion under control: one motion language (durations/easing/springs), never animate layout in JS when you can do it with Reanimated/layout transitions, and design a reduced-motion fallback. **[FACT]** Apple reduced-motion criteria + Reanimated reduced-motion hook. citeturn39view3turn34search8turn7search10  
- Make your “cheapness killers” a checklist you run on every screen (see rubric section). **[RECOMMENDATION]**

### Common failure modes that cause “cheap-looking” apps

- **Inconsistent spacing and typography** (random paddings, ad-hoc font sizes/weights). **[INFERENCE]**  
- **Too many effects at once** (blur + gradients + shadows + glass + parallax) leading to visual noise and/or motion discomfort. **[FACT]** Apple explicitly flags depth simulation, animated blur, multi-axis motion as triggers to disable under reduced motion; similar guidance appears in contrast testing regarding translucency. citeturn39view3turn37view0  
- **Tiny hit targets** and cramped tap spacing—kills trust instantly. **[FACT]** 44×44pt minimum. citeturn40view0  
- **Gray-on-black “aesthetic dark mode”** that fails low-vision contrast needs. **[FACT]** Apple’s sufficient contrast criteria calls this out as a common mistake. citeturn37view0  
- **List jank** (scroll hitching, flashing images, heavy row shadows). **[FACT]** React Native performance goal is 60 FPS; FlashList is positioned as a solution for performant lists. citeturn10search4turn6search3turn6search7  
- **Generic iconography** (mixed styles, mismatched stroke weights). **[INFERENCE]** mitigated by SF Symbols integration. citeturn41view0turn32view0  
- **Animation that doesn’t communicate state** (decorative, slow, or “floaty”), plus missing reduced-motion behavior. **[FACT]** citeturn5search5turn39view3  
- **A “template UI” vibe**: default component library look, default gradients, default empty states, default emoji confetti. **[INFERENCE]**  

## Aesthetic strategy framework

### How to define and maintain a distinctive visual direction

**Core idea:** *Distinctiveness is a constraint system.* You pick a small set of high-signal constraints, then enforce them with tokens, components, and QA. **[RECOMMENDATION]**

A practical framework that’s repeatable for a solo builder:

**Step 1: Write a one-paragraph “visual promise.”**  
Example format:  
- “This app should feel like: (3 adjectives).”  
- “It should *not* feel like: (3 adjectives).”  
- “Signature material: (glass / paper / ink / photography / playful UI).”  
- “Signature motion: (snappy / floaty / springy / minimal).”  
This prevents the common “every screen redesigned from scratch” failure mode. **[RECOMMENDATION]**

**Step 2: Choose your “uniqueness budget” (3 knobs).**  
A high-performing set of knobs for iOS apps (because they strongly influence visceral perception):  
- Typography voice (system SF-only vs pairing with a custom display font)  
- Material system (Liquid Glass / blur / solid surfaces / editorial paper)  
- Iconography + micro-motion (SF Symbols weights + symbol animations)  
**Why these knobs?** Apple’s platform direction is explicitly about material (Liquid Glass), typography (SF crafted to dynamically scale numerals on lock screen), and dynamic controls/navigation. **[FACT]** citeturn42view0turn41view0  

**Step 3: Lock color + materials into a small palette.**  
- 1 brand accent  
- 1 supportive accent (often a cooler/warmer companion)  
- semantic neutrals (background, elevated background, separator, label tiers)  
Apple explicitly frames contrast and translucency as settings people may adjust (Bold Text / Increase Contrast / Reduce Transparency), so your palette must survive those variants. **[FACT]** citeturn37view0turn35view0turn7search0  

**Step 4: Define “signature surfaces.”**  
Pick 1–2 surfaces that appear everywhere:  
- e.g., “Glass pill controls” + “soft card”  
or “Ink list rows” + “minimal separators.”  
Apple’s new design language emphasizes controls and navigation acting as a distinct layer above content, crafted from Liquid Glass and morphing as needed. **[FACT]** citeturn42view0turn25view0  

**Step 5: Codify in tokens and component standards.**  
This is the bridge from taste to consistent output (see implementation section). **[FACT]** Token standard exists and is designed for cross-tool exchange. citeturn24search0turn24search4  

### Style archetypes that work well for modern iOS apps

These archetypes are “iOS-compatible” because they align with iOS conventions while leaving space for uniqueness. **[RECOMMENDATION]**

1. **Premium Minimal + Glass**  
   - Visual: content-first, subtle translucency, strong typography hierarchy, low-chroma neutrals, one accent.  
   - Works especially well with iOS 26 design language (Liquid Glass controls, dynamic bars). **[FACT]** citeturn42view0turn25view0turn30view0  

2. **Editorial + Paper**  
   - Visual: generous whitespace, serif display font (sparingly), image-led layouts, calm motion.  
   - Great for reading, journaling, creators.  
   - Use iOS baseline readability rules (11pt minimum, good contrast). **[FACT]** citeturn40view0turn37view0  

3. **Playful Precision**  
   - Visual: tight system consistency + a single playful motif (character, sticker, illustrated accent).  
   - Apple Design Awards “Delight and Fun” winners highlight playful transformations and sensory sound/feedback details. **[FACT]** citeturn13view0turn14view2  

4. **Tool-like Pro App**  
   - Visual: dense but perfectly aligned, panel systems, popovers, two-column inspectors on iPad, keyboard-first affordances.  
   - Apple’s iPad guidance emphasizes keyboard shortcuts and pointer workflows for productivity. **[FACT]** citeturn45view0turn44view0turn25view0  

5. **Photography-first Commerce**  
   - Visual: edge-to-edge imagery, controls get out of the way, brand color integrates into content layer.  
   - Apple’s Liquid Glass gallery describes exactly these moves for a commerce/brand-photo app. **[FACT]** citeturn25view0turn42view0  

### How to avoid generic, template-like interfaces

A practical anti-template playbook:

- **Don’t start from a UI kit** as your visual baseline. Start from your token constraints, then design components to fit. **[RECOMMENDATION]**  
- **Use SF Symbols (and a consistent rendering mode)** instead of mixing random outline icon sets. Expo Symbols supports SF Symbols and symbol variants (monochrome/hierarchical/palette/multicolor) plus simple animation types. **[FACT]** citeturn32view0turn41view0  
- **Choose one “hero material”:**  
  - iOS 26+: GlassView (native liquid glass) for key surfaces only; it falls back to View on unsupported platforms. **[FACT]** citeturn30view0  
  - Otherwise: BlurView very selectively; be mindful of Android limitations/experimental support. **[FACT]** citeturn9search5turn9search1  
- **Make empty states branded but quiet**: one illustration style + one line of microcopy + one clear CTA. Microinteractions can “communicate brand” without being noisy. **[FACT]** citeturn5search1turn14view2  
- **Avoid the “AI gradient default.”** If you use gradients, tie them to brand palette and rhythm; Apple’s SF Symbols 7 even adds gradient rendering for symbols as a controlled system feature—suggesting gradients should be deliberate, not random decoration. **[INFERENCE]** from SF Symbols 7 gradient emphasis. citeturn41view0  

## iOS visual craft deep dive

This section is intentionally concrete and “implementation-shaped.”

### Typography systems for iOS in RN/Expo

**What iOS expects:** SF is the system typeface; SF Symbols is designed to integrate seamlessly with SF. **[FACT]** citeturn41view0turn3view0  

**Practical typographic rules that reliably look premium:**

**Rule set (copy-ready):**  
- **[RECOMMENDATION]** Default all body text to system font (SF), and only introduce a custom display font if you have a clear brand reason and you can QA it under Dynamic Type.  
- **[FACT]** Text should be at least 11pt for legibility baseline (Apple UI design tips). citeturn40view0  
- **[FACT]** Support font scaling and cap extremes per component using `maxFontSizeMultiplier` (RN Text supports this). citeturn34search1turn35view0  
- **[RECOMMENDATION]** Design a 2-axis type system: (size tier) × (role). Roles: Display, Title, Body, Caption, Button.  
- **[RECOMMENDATION]** Restrict weights to a small set (e.g., Regular, Medium, Semibold) and reserve Bold/Heavy for rare emphasis to avoid “loud” UI.

**A “golden” iOS-ish type scale (starting point, tune per product):**

| Role | Default size (pt) | Weight | Notes |
|---|---:|---|---|
| Display | 34–40 | Semibold | Only on 1–2 hero screens per flow |
| Title | 22–28 | Semibold | Screen titles, section headers |
| Body | 15–17 | Regular | Primary reading size |
| Caption | 12–13 | Regular/Medium | Metadata, helper text |
| Micro | 11 | Medium | Only if contrast is strong and spacing is generous |

**Why this works:** It respects Apple’s minimum legibility baseline and stays close to SF/SF Symbols alignment expectations. **[INFERENCE]** anchored in Apple legibility guidance + SF Symbols integration. citeturn40view0turn41view0  

### Color systems, contrast strategy, depth/elevation, and materials

**Contrast is not optional and is now operationalized by Apple as App Store accessibility evaluation criteria.** Apple explicitly recommends testing with Bold Text, Increase Contrast, Reduce Transparency enabled and references contrast ratios (e.g., 4.5:1) as common guidance. **[FACT]** citeturn37view0turn11search3  

**Rule set (copy-ready):**  
- **[FACT]** Ensure sufficient contrast in both light and dark; Apple calls out “gray-on-black” dark UI as a common mistake for low-vision. citeturn37view0  
- **[RECOMMENDATION]** Define tokens for background tiers: `bg.canvas`, `bg.surface`, `bg.elevated`, `bg.overlay`.  
- **[RECOMMENDATION]** Define tokens for text tiers: `text.primary`, `text.secondary`, `text.tertiary`, `text.inverse`.  
- **[FACT]** Use RN PlatformColor/DynamicColorIOS where it benefits you (semantic system colors). citeturn7search0turn7search3  

**Materials in 2026 iOS reality: Liquid Glass**

- entity["company","Apple","technology company, cupertino"] introduced Liquid Glass as “translucent,” reflecting/refracting surroundings, dynamically adapting between light/dark, and reacting to movement with specular highlights—used across controls/navigation and larger surfaces like tab bars. **[FACT]** citeturn42view0  
- Expo now provides **Expo GlassEffect**: React components rendering native iOS liquid glass effect using `UIVisualEffectView`; `GlassView` is only available on **iOS 26+** and falls back to `View` on unsupported platforms; there are known issues around opacity and interactive toggling. **[FACT]** citeturn30view0turn34search13  

**Practical decision table: which “glass” to use**

| Target | Default choice | Why | Caveats |
|---|---|---|---|
| iOS 26+ | `expo-glass-effect` `GlassView` | Native Liquid Glass effect | Avoid opacity < 1 on GlassView/parents; `isInteractive` can’t be toggled without remount. citeturn30view0 |
| iOS < 26 | `expo-blur` BlurView (selectively) | Closest material feel pre-26 | Android may be experimental / needs changes in SDK 55+. citeturn9search5turn9search1 |
| Android / cross-platform parity | Solid surfaces + subtle gradients | Predictable performance and legibility | Don’t force blur parity if it hurts performance or clarity. citeturn9search5turn37view0 |

### Spacing rhythm, layout proportions, and hierarchy

You will not get “premium” without a spacing rhythm. The iOS 26 direction is especially sensitive to spacing because content becomes more edge-to-edge while controls float as a layer. **[INFERENCE]** from Apple’s emphasis on redesigned toolbars/navigation and edge-to-edge content, plus gallery notes about moving elements off toolbars for more space. citeturn42view0turn25view0  

**Rule set (copy-ready):**  
- **[RECOMMENDATION]** Use a base spacing unit of 4pt, but express layout mostly in 8/12/16/20/24/32 steps.  
- **[RECOMMENDATION]** Pick one primary screen margin (usually 16pt) and never drift.  
- **[RECOMMENDATION]** Never mix “tight” and “loose” density on the same screen. If you need both, separate by surfaces (cards/sections).

**Hierarchy heuristics (high signal):**  
- One primary action per screen (or per viewport).  
- Two levels of emphasis only: primary and secondary.  
- Dividers: prefer whitespace first; use separators when scanning demands it. **[RECOMMENDATION]**

### Iconography, illustration, imagery direction

**SF Symbols as the default iOS iconography system:**  
- SF Symbols 7 includes 6,900+ symbols designed to integrate with SF, with weights/scales and animation capabilities (Draw, variable rendering, gradients). **[FACT]** citeturn41view0  
- Expo Symbols provides access to SF Symbols on iOS and includes fallback rendering on platforms where SF Symbols aren’t available; it’s currently in beta and subject to breaking changes. **[FACT]** citeturn32view0  

**Rule set (copy-ready):**  
- **[RECOMMENDATION]** In iOS-first apps, default to SF Symbols for 90% of UI icons unless your brand strongly demands a custom set.  
- **[RECOMMENDATION]** Choose one SF Symbols rendering mode for most UI (monochrome or hierarchical) and reserve palette/multicolor for special moments.  
- **[RECOMMENDATION]** If you use illustrations, constrain to one technique (flat, textured, 3D, line) and one palette family.

### Component polish details that increase perceived quality

This is where “premium” actually comes from day-to-day.

**Polish checklist (copy-ready):**  
- **Hit target correctness** (44×44pt). **[FACT]** citeturn40view0  
- **No blurry assets**: provide @2x/@3x. **[FACT]** citeturn40view0  
- **Image aspect ratio discipline**: never stretch. **[FACT]** citeturn40view0  
- **Text never overlaps** (line height/letter spacing adjustments as needed). **[FACT]** citeturn40view0  
- **Consistent corner radii** across the app (tokenized) and “concentric” feel where possible, aligning with iOS 26’s concentric hardware/software language. **[FACT]** Apple explicitly mentions controls fitting “perfectly concentric” with rounded corners. citeturn42view0turn25view0  
- **Touch feedback** on every press (visual + optional haptic). **[INFERENCE]** supported by microinteraction role in feedback/system status plus Apple design award praise for haptics. citeturn5search1turn14view2  

## Motion, micro-interactions, delight, and light gamification

### Motion principles for premium feel

**Evidence-based baseline:** Motion should be unobtrusive, brief, subtle, and used for feedback, state-change, navigation metaphors, and signifiers. **[FACT]** citeturn5search5turn5search1  

**Apple operationalizes motion safety:** Motion triggers like parallax/depth simulation, multi-axis motion, spinning/vortex, and auto-advancing carousels should be disabled or altered under Reduce Motion. **[FACT]** citeturn39view3turn35view0  

**Premium motion heuristics (copy-ready):**  
- **[RECOMMENDATION]** Default durations: 120–220ms for micro feedback; 240–420ms for navigation transitions; avoid >500ms unless it’s a deliberate “hero” moment.  
- **[RECOMMENDATION]** Favor springs for touch-driven transforms (press, drag, sheet snap) and timing curves for state fades.  
- **[RECOMMENDATION]** Never animate large blurs or heavy shadows inside scrolling lists. (Use static assets or simpler overlays.)  
- **[FACT]** If reduced motion is enabled, replace complex motion with dissolves, highlights, or color shifts rather than removing meaning-bearing transitions entirely. citeturn39view3  

### RN implementation patterns (Reanimated, gestures, layout transitions)

**Reduced motion detection:**  
- RN exposes `AccessibilityInfo.isReduceMotionEnabled()` and `isReduceTransparencyEnabled()` and emits change events. **[FACT]** citeturn35view0  
- Reanimated provides `useReducedMotion()` to query reduced motion (noting it’s synchronous vs `AccessibilityInfo`). **[FACT]** citeturn34search8  

**Gesture + animation architecture (production default):**  
- Use native gesture handling via react-native-gesture-handler to avoid limitations of the built-in responder system and gain performance/control. **[FACT]** citeturn7search2  
- Keep gesture-driven animations on the UI thread (Reanimated), minimize JS re-renders during gestures. **[INFERENCE]** consistent with known RN performance constraints and library intent. citeturn7search2turn10search4  

**Haptics:**  
- Expo provides `expo-haptics` for haptic feedback in RN apps. **[FACT]** citeturn0search3  
- Apple design award descriptions repeatedly praise haptics as a delightful detail (e.g., “cool haptics”, “use of haptics is a nice touch”). **[FACT]** citeturn14view2turn13view0  

### Interaction feedback patterns that feel premium

**Microinteraction structure (research-backed):** trigger → rules → feedback → loops/modes. **[FACT]** citeturn5search1  

**Premium feedback defaults (copy-ready):**  
- **Press:** slight scale-down + opacity shift + optional light haptic.  
- **Toggle:** animate thumb/track with a spring; avoid overshoot that reads “toy.”  
- **Success:** a single, quick “confirmation” moment: subtle color shift + a tiny symbol animation or checkmark morph.  
- **Error:** shake is often too aggressive; prefer a brief “nudge” + red outline + concise message.  
All are **[RECOMMENDATION]** aligned with motion being unobtrusive and with reduced-motion needs (use fades/highlights). citeturn5search5turn39view3  

### Anti-patterns that make motion feel cheap or laggy

- **Auto-advancing carousels** and perpetual motion without a stop control (also flagged by Apple reduced-motion criteria). **[FACT]** citeturn39view3turn5search5  
- **Multi-axis parallax** as decoration (often triggers discomfort; disable under Reduce Motion). **[FACT]** citeturn39view3  
- **Animating blur opacity via parent opacity** (Expo GlassEffect docs explicitly warn opacity < 1 can break rendering; use effect-specific animation). **[FACT]** citeturn30view0  
- **High-frequency “micro-bounces” everywhere** (novelty -> fatigue). **[RECOMMENDATION]**

### Delight, engagement, and light gamification that stays premium

**Evidence boundaries:**  
- Gamification works best when it is learner-/user-centered and supports real goals, not when it’s bolted on. **[FACT]** citeturn5search0turn5search7  
- Habit-forming patterns (reminders, streaks) appear in research on habit apps, but there are also concerns about dependency and motivation tradeoffs; extrinsic rewards can undermine intrinsic motivation depending on design. **[FACT]** citeturn5search3turn5search6turn5search14  

**Premium “non-gimmicky” patterns (with placement guidance):**

1. **Progress that reflects competence** (best at end of a meaningful action)  
   - Examples: “You completed X,” mastery levels, calm progress rings.  
   - Use progress indicators carefully; they reduce frustration in slow systems. **[FACT]** citeturn5search8  

2. **Streaks with “forgiveness”** (best on home/dashboard, not shoved into every screen)  
   - Keep it subtle; give grace days; avoid guilt-heavy copy.  
   - **[INFERENCE]** based on dependency concerns and intrinsic motivation research. citeturn5search3turn5search6  

3. **Collections and completion loops** (best for content-heavy apps)  
   - “Saved,” “Downloaded,” “Completed” states with small celebratory microinteractions.  
   - Avoid fireworks; prefer a tiny SF Symbol animation + haptic. **[RECOMMENDATION]** supported by SF Symbols animation capabilities and microinteraction feedback principles. citeturn41view0turn32view0turn5search1  

4. **Unlockable polish** (premium without childishness)  
   - Example: unlock themes, icons, small UI flourishes after consistent usage.  
   - Must remain optional and not degrade usability. **[RECOMMENDATION]**  

**Where to place delight moments in flows (default map):**  
- **First success** (first completed task)  
- **Return moment** (coming back after a day; gentle streak/summary)  
- **Milestone** (5/10/25 completions; tasteful)  
- **Rescue** (when user recovers from error; calming)  
All **[RECOMMENDATION]**, aligned with unobtrusive motion and user-centered gamification framing. citeturn5search5turn5search0  

## iPhone-first, iPad-ready, and accessibility + beauty

### iPhone-first, iPad-ready layout adaptation strategy

**Definition:** iPad-ready means your layout adapts to **window size changes** and input modes (touch, pointer, keyboard), not merely “bigger iPhone UI.” **[INFERENCE]** supported by Apple’s emphasis on pointer/keyboard workflows and gallery notes about dynamic adaptation to window size. citeturn44view0turn45view0turn25view0  

**Practical responsive rules (copy-ready):**

- **[FACT]** Use `useWindowDimensions()` as the preferred API for window size and respond to changes. citeturn28search0turn28search4  
- **[FACT]** Expo Device exposes `deviceType` enum including PHONE/TABLET (with caveats on Android). citeturn29view0  
- **[RECOMMENDATION]** Build screens from “regions” (header / content / actions) that can rearrange (stack → two-column) rather than scaling everything up.  
- **[RECOMMENDATION]** Define 2 density modes: “compact” (iPhone) and “comfortable” (iPad). Switch tokens, not ad-hoc styles.  
- **[RECOMMENDATION]** On iPad, prefer:  
  - two-column inspectors for complex tools (Apple gallery highlights this pattern),  
  - popovers/sheets instead of full-screen modals,  
  - keyboard shortcut discoverability for power features. citeturn25view0turn45view0  

**Pointer and keyboard considerations (iPad):**  
Apple’s iPadOS pointer system was designed to complement touch via adaptive precision, highlighting elements without obscuring them, and tuned behaviors like snapping/magnetism; this is a strong signal that iPad UIs should have generous hit areas and consistent interactive shapes. **[FACT]** citeturn44view0  

### Accessibility + beauty: how to preserve premium aesthetics while staying accessible

**Sufficient contrast is a shipping requirement, not a “nice-to-have.”** Apple’s App Store Connect evaluation criteria explicitly instructs testing with Bold Text, Increase Contrast, Reduce Transparency and mentions 4.5:1 as common minimum guidance. **[FACT]** citeturn37view0turn11search3  

**Reduced motion is a shipping requirement for motion-heavy apps.** Apple calls out motion triggers and recommends alternatives like dissolves/highlight fades/color shifts rather than removing meaning-bearing motion. **[FACT]** citeturn39view3  

**RN/Expo hooks you should wire into design tokens:**  
- Reduce Transparency: `AccessibilityInfo.isReduceTransparencyEnabled()` **[FACT]** citeturn35view0turn30view0  
- Reduce Motion: `AccessibilityInfo.isReduceMotionEnabled()` and Reanimated `useReducedMotion()` **[FACT]** citeturn35view0turn34search8turn39view3  
- Font scaling: `allowFontScaling` + `maxFontSizeMultiplier` on Text **[FACT]** citeturn34search1turn40view0  

**A11y checks integrated into design QA (copy-ready):**  
- Test with: Bold Text ON, Increase Contrast ON, Reduce Transparency ON. **[FACT]** citeturn37view0  
- Test with: Reduce Motion ON; verify you disable depth simulation and stop auto-advancing motion. **[FACT]** citeturn39view3  
- Test max font scale; ensure layout doesn’t clip and tap targets remain ≥44×44pt. **[FACT]** (44pt requirement) citeturn40view0turn28search0  

**Important nuance:** A visually gorgeous UI can make users *say* it’s usable even when it isn’t (aesthetic-usability effect). Your QA rubric must explicitly test tasks, not just aesthetics. **[FACT]** citeturn36search0  

## React Native + Expo implementation playbook and performance-aware craft

### Recommended UI stack and libraries by use case

This list assumes **Expo managed workflow preferred**, but it also notes where bare RN may be needed.

| Use case | Default recommendation | Why | Notes / tradeoffs |
|---|---|---|---|
| Navigation | Expo Router `Stack` + modals | File-based routing, iOS-like transitions | Native tabs are available but alpha in SDK 54+ (API may change). citeturn10search8turn10search11turn7search19turn7search11 |
| Native-feel tab bar | Expo Router native tabs | Uses native system tab bar | Alpha + subject to change. citeturn7search11turn7search19 |
| Animations | Reanimated + Gesture Handler | Smooth gesture-driven interactions | Reduced motion support via `useReducedMotion`. citeturn7search2turn34search8 |
| Bottom sheets | `@gorhom/bottom-sheet` | Widely used, performant sheets | Works with Expo; ensure gesture root view. citeturn10search2turn10search15 |
| iOS 26 glass | `expo-glass-effect` | Native Liquid Glass effect | iOS 26+ only; opacity caveat; check reduce transparency. citeturn30view0turn35view0 |
| Gradients | `expo-linear-gradient` + `expo-mesh-gradient` for hero moments | Controlled brand materials; MeshGradient exposes SwiftUI MeshGradient | MeshGradient is iOS/tvOS; masking disables child interactions. citeturn0search7turn31view0 |
| Icons | `expo-symbols` (SF Symbols) | iOS-native iconography + variants + simple animation | Beta; provide fallback for Android/web. citeturn32view0turn41view0 |
| Blur (pre-iOS 26 or selective) | `expo-blur` | Familiar iOS material effect | Android support may require changes; also can cause perf/graphical issues when experimental. citeturn9search1turn9search5 |
| Images | `expo-image` | Designed for speed, caching, placeholders, smooth transitions | Use BlurHash/ThumbHash for premium loading states. citeturn9search0 |
| Lists | FlashList | Designed for performance, especially list-heavy UIs | FlashList docs emphasize performance and new-arch readiness. citeturn6search3turn6search7 |
| Custom graphics | Skia (`@shopify/react-native-skia`) | High-performance custom drawing (charts, effects) | Adds bundle size; Expo templates exist. citeturn9search2turn9search6 |
| Keyboard polish | `react-native-keyboard-controller` | Consistent keyboard manager for iOS/Android | Expo docs emphasize “native feel”; last updated 2025-09-15. citeturn33view0 |

### Design token architecture for RN

**Why tokens:** The Design Tokens spec (DTCG) exists to exchange design decisions between tools and code; this is ideal for a Codex skill because rules can be automated and validated. **[FACT]** citeturn24search0turn24search4  

**Token categories you should have (minimum viable “premium”):**  
- Color (semantic + brand)  
- Typography (sizes/weights/line heights)  
- Spacing  
- Radii  
- Shadows/elevation  
- Motion (durations, easing, springs)  
- Layout (screen margins, max widths, iPad breakpoints)  
- Material (glass/blur intensities & fallbacks)  
- Haptics (which haptic for which event)

All **[RECOMMENDATION]**; they’re the smallest set that prevents visual drift.

**A “copy-ready” token schema (TypeScript-first):**
```ts
// tokens.ts (conceptual)
export const tokens = {
  color: {
    bg: {
      canvas: { light: "#FFFFFF", dark: "#000000" },
      surface: { light: "#F6F6F7", dark: "#111113" },
      elevated: { light: "#FFFFFF", dark: "#1A1A1D" },
    },
    text: {
      primary: { light: "#0B0B0D", dark: "#F5F5F7" },
      secondary: { light: "#3A3A42", dark: "#B7B7C0" },
      tertiary: { light: "#6B6B76", dark: "#8E8E99" },
    },
    brand: {
      accent: "#5B5BFF",
    },
    stroke: {
      hairline: { light: "rgba(0,0,0,0.08)", dark: "rgba(255,255,255,0.10)" },
    },
  },
  space: { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32 },
  radius: { sm: 10, md: 14, lg: 18, pill: 999 },
  type: {
    size: { micro: 11, caption: 13, body: 17, title: 24, display: 34 },
    weight: { regular: "400", medium: "500", semibold: "600" },
    lineHeight: { micro: 14, caption: 18, body: 22, title: 30, display: 40 },
  },
  motion: {
    duration: { fast: 140, base: 220, slow: 360 },
    spring: {
      // tune per product; keep a single "house spring"
      press: { damping: 18, stiffness: 220, mass: 1 },
      sheet: { damping: 22, stiffness: 260, mass: 1.1 },
    },
  },
} as const;
```

**Critical implementation note:** Use platform semantic colors when it boosts authenticity (e.g., PlatformColor) and keep your own tokens semantic (bg/text/stroke) rather than raw names. RN exposes PlatformColor and DynamicColorIOS; this supports system appearance integration. **[FACT]** citeturn7search0turn7search3  

### Component architecture patterns for scalable visual consistency

**The “Premium Core” component set (the set you should build first):**  
- `AppText` (centralize font scaling, max multiplier policy, colors)  
- `Icon` (expo-symbols on iOS; fallback elsewhere)  
- `Button` (press feedback + haptic mapping)  
- `Card` / `Surface` (solid / blur / glass variants)  
- `ListRow` (fast, simple, consistent density)  
- `Input` (keyboard polish + accessibility sizing)  
- `Sheet` (gorhom bottom sheet; tokenized snap points and radii)  
- `Toast` (quiet feedback; reduced motion compatible)  
- `Progress` (bars/rings; subtle)  

All **[RECOMMENDATION]**.

### Performance-aware design craft

**Budget reality:** React Native positions 60 FPS as a core goal for native feel. **[FACT]** citeturn10search4  

**Design decisions that commonly hurt performance (and how to avoid):**

- **Heavy row effects in lists** → keep list rows mostly flat; reserve blur/glass for headers or overlays. **[INFERENCE]** tied to list performance constraints and heavy rendering costs. citeturn6search3turn10search4turn9search5  
- **Overdraw from stacked transparency** → reduce layers; avoid parent opacity on glass; Expo GlassEffect explicitly warns about opacity < 1 causing incorrect rendering. **[FACT]** citeturn30view0  
- **Image loading jank** → use expo-image caching and placeholders (BlurHash/ThumbHash) to avoid flicker. **[FACT]** citeturn9search0  
- **FlatList misconfiguration** → RN provides detailed optimization knobs (initialNumToRender etc). **[FACT]** citeturn6search0  
- **Using FlatList when FlashList is warranted** → FlashList positions itself as a performant list replacement. **[FACT]** citeturn6search3turn6search7  

**Practical profiling guidance tied to design decisions (solo-builer friendly):**  
- **[RECOMMENDATION]** Every “premium” surface you add (blur, glass, shadow, gradient animation) should come with a “where does it live?” decision: (static header) or (scrolling list). Default: no expensive effects in list rows.  
- **[RECOMMENDATION]** Test on older devices and with Reduce Transparency ON (Apple notes it can improve readability and may affect how materials appear). citeturn37view0turn11news40  

## Benchmarks, QA rubric, Codex skill blueprint, and the golden system

image_group{"layout":"carousel","aspect_ratio":"16:9","query":["iOS 26 Liquid Glass app interface","Expo GlassView expo-glass-effect example screenshot","SF Symbols 7 draw animation examples","Lumy iOS app interface Liquid Glass"],"num_per_query":1}

### Benchmark teardowns

Instead of arbitrary “cool apps,” this teardown set is anchored in **Apple’s own** descriptions: Apple Design Awards 2025 + Apple’s Liquid Glass design gallery.

**Benchmark A: Lumy (minimalism + reach + system integration)**  
- Apple describes Lumy as “thoughtful minimalism,” keeping actions within easy reach, focusing on data, and offering quick access menus, floating panels, and fluid sliders. **[FACT]** citeturn25view0turn13view0  
**What makes it premium (translatable):**  
- **Controlled color palette** (rich blues; minimalist layout). **[FACT]** citeturn13view0turn25view0  
- **Action surfaces don’t compete with content** (controls within reach; data foreground). **[INFERENCE]** consistent with iOS 26 layered controls direction. citeturn42view0turn25view0  
**RN/Expo implementation guidance:**  
- Use `expo-glass-effect` for key action surfaces on iOS 26+ and fall back when Reduce Transparency is enabled via `AccessibilityInfo.isReduceTransparencyEnabled()`. **[FACT]** citeturn30view0turn35view0  
- For pre-26, use `expo-blur` sparingly; keep Android fallback solid. **[FACT]** citeturn9search5  

**Benchmark B: Crumbl (brand-photo commerce + content-first controls)**  
- Apple notes the app uses Liquid Glass to focus on brand photography and moves branding from the top toolbar into the content layer so content shines through controls. **[FACT]** citeturn25view0  
**RN/Expo translation:**  
- Treat brand color as **content-adjacent** (background gradients/hero areas), not as UI chrome.  
- Use token `brand.accent` primarily for CTA emphasis and small highlights, not for full headers. **[RECOMMENDATION]**  

**Benchmark C: Tide Guide (data visualization + glass effects in charts)**  
- Apple highlights redesigned submenus/popovers moving off the top toolbar and notes Liquid Glass effects as you interact with tide charts and graphs. **[FACT]** citeturn25view0  
**RN/Expo translation:**  
- Prefer popovers/sheets over pushing deep navigation for “controls for the current chart.” **[RECOMMENDATION]**  
- For chart visuals: consider Skia when you need bespoke, performant rendering. **[FACT]** citeturn9search2turn9search18  

**Benchmark D: “Denim” (mesh gradients + haptics + depth effects)**  
- Apple explicitly praises “smooth scroll transitions,” “mesh gradients,” “custom haptics,” and “cool depth effects.” **[FACT]** citeturn13view0  
**RN/Expo translation:**  
- Use `expo-mesh-gradient` for *one* signature hero surface (e.g., playlist cover background), not everywhere. **[FACT]** citeturn31view0  
- Map haptics to a small event taxonomy (press, success, warning) via `expo-haptics`. **[FACT]** citeturn0search3turn13view0  

**Benchmark E: Vocabulary (quiet excellence + consistent illustration + balanced type)**  
- Apple calls it a “subtle example of excellence,” with “charming, consistent illustrations,” modern/balanced typography and iconography, and haptics. **[FACT]** citeturn14view2  
**RN/Expo translation:**  
- Your “premium feel” can be quiet: invest in consistency and rhythm rather than flash.  
- Standardize icons using SF Symbols via expo-symbols; use consistent rendering mode. **[FACT]** citeturn32view0turn41view0turn14view2  

**Benchmark F: Linearity Curve (iPad adaptation + refined touch targets)**  
- Apple notes stronger iPad experience with a two-column inspector adapting to window size; on iPhone, touch targets/spacing/gestures refined for one-hand comfort. **[FACT]** citeturn25view0  
**RN/Expo translation:**  
- Use `useWindowDimensions()` to drive layout region switching and `expo-device` deviceType to bias defaults. **[FACT]** citeturn28search0turn29view0  
- On iPad: add pointer/keyboard affordances (hover highlights, keyboard shortcuts) where feasible; Apple stresses pointer + keyboard workflows as “next-level iPad.” **[FACT]** citeturn44view0turn45view0  

### Design QA / review rubric (0–100)

This rubric is designed to be used **per screen** during PR review or design QA. **[RECOMMENDATION]**  
Score each category, then sum. A premium screen reliably scores 85+.

**Typography and readability (0–20)**  
- 0–5: inconsistent sizes/weights; cramped; text below 11pt baseline. **[FACT]** (11pt guidance) citeturn40view0  
- 6–15: consistent scale; clear hierarchy; Dynamic Type doesn’t break layout. **[FACT]** (font scale via RN APIs) citeturn28search0turn34search1  
- 16–20: exceptional rhythm, scanning, and “quiet confidence.”

**Color, contrast, and materials (0–20)**  
- Must pass sufficient contrast expectations and remain legible with Bold Text / Increase Contrast / Reduce Transparency. **[FACT]** citeturn37view0turn35view0  
- Deduct for gray-on-black low-contrast dark UI. **[FACT]** citeturn37view0  
- Reward for tasteful use of glass/blur with accessible fallbacks. **[FACT]** citeturn30view0turn11news40  

**Spacing, alignment, and hierarchy (0–15)**  
- Deduct for “random padding,” misalignment, cramped density.  
- Reward for a strong spacing rhythm and content-first layout. **[INFERENCE]** based on iOS 26 content focus. citeturn42view0turn25view0  

**Components and interaction affordances (0–15)**  
- Hit targets ≥44×44pt. **[FACT]** citeturn40view0  
- Controls near the content they modify (Apple UI tips). **[FACT]** citeturn40view0  
- Deduct for ambiguous tappables.

**Motion and feedback (0–15)**  
- Motion is brief/subtle/purposeful. **[FACT]** citeturn5search5  
- Reduced Motion mode is safe (no parallax/vortex/auto-carousels; provide alternatives). **[FACT]** citeturn39view3turn35view0  

**Performance feel (0–10)**  
- Scrolling and transitions feel 60 FPS “native.” **[FACT]** RN performance goal. citeturn10search4  
- Lists use proper primitives (FlashList where needed). **[FACT]** citeturn6search3turn6search0  

**“AI-generated / generic / low-trust” red flags checklist (binary)**  
If any of these are true, the screen cannot score above 70 until fixed. **[RECOMMENDATION]**  
- Generic gradient header + generic rounded cards + generic icons (no brand voice).  
- Inconsistent typography scale or mixed icon styles.  
- Motion that is decorative or too bouncy; no reduced-motion fallback. **[FACT]** citeturn39view3turn5search5  
- Tiny tap targets or dense controls. **[FACT]** citeturn40view0  

### Skill-building blueprint for Codex skill creation

**Skill name candidates (shortlist):**  
- iOS Premium Craft (RN/Expo)  
- Liquid Glass iOS Craft for Expo  
- Expo iOS Visual Excellence  
- iOS-feel Design System Builder

**Final recommended skill name:** **iOS Premium Craft for Expo** **[RECOMMENDATION]**

**Description (copy-ready):**  
A Codex skill that designs and specifies world-class, iPhone-first iOS interfaces in React Native + Expo with premium visual craft, distinctive aesthetics, production-ready motion/microinteractions, accessibility-first materials (Liquid Glass/blur), and performance-aware implementation patterns.

**Trigger phrases / intents (examples):**  
- “Design a premium iOS screen for … in Expo.”  
- “Make this React Native UI feel like a high-end iOS app.”  
- “Apply a Liquid Glass material system with accessibility fallbacks.”  
- “Create a tokenized design system and component standards for my RN app.”  
- “Audit this screen for premium iOS feel and give fixes + code patterns.”

**Proposed SKILL.md structure (lean, actionable):**  
- Purpose + scope (iPhone-first, iPad-ready)  
- Non-negotiables checklist (top 20 principles)  
- Token spec (colors/type/space/radius/motion/material/haptics)  
- Component standards (required props, states, sizes)  
- Motion standards (durations/springs; reduced-motion rules)  
- Material standards (glass/blur/solid decision table; reduce transparency behavior)  
- iPad adaptation rules (window-size regions, pointer/keyboard readiness)  
- Accessibility QA (contrast + reduced motion + dynamic type)  
- Performance QA (lists, images, overlays)  
- Screen review rubric (0–100) + red flags  
- Benchmark references (screens + what to copy and what not to copy)

**Recommended `references/` files (with purpose):**  
- `references/apple-liquid-glass.md` — summarize Liquid Glass properties, content-first controls, concentricity, and scroll-responsive bars. citeturn42view0turn25view0  
- `references/expo-glass-effect.md` — usage, constraints (iOS 26+ only), opacity caveat, reduce transparency integration. citeturn30view0turn35view0  
- `references/expo-symbols.md` — SF Symbols usage, rendering modes, animations, fallbacks. citeturn32view0turn41view0  
- `references/accessibility-contrast-and-motion.md` — Apple evaluation criteria mapping to RN APIs. citeturn37view0turn39view3turn35view0  
- `references/benchmarks-apple-gallery.md` — tear-down notes from Liquid Glass gallery + ADA winners. citeturn25view0turn13view0turn14view2  
- `references/design-tokens-spec.md` — token format guidance + how to serialize tokens for codegen/linters. citeturn24search0turn24search4  

**Recommended `scripts/` to automate repetitive checks (solo-builer practical):**  
- `scripts/check-no-raw-colors.ts` — fail CI if non-token colors appear in styles (except in token files). **[RECOMMENDATION]**  
- `scripts/check-touch-target-min.ts` — static heuristics: warn on `height < 44` / `width < 44` for Pressable/Button primitives in your component library. **[RECOMMENDATION]** anchored in 44pt rule. citeturn40view0  
- `scripts/check-motion-reduced.ts` — ensure animations reference a `reduceMotion` flag path for certain components (carousels, parallax, glass fades). **[RECOMMENDATION]** aligned with Apple motion criteria. citeturn39view3  
- `scripts/check-typography-scale.ts` — alert on font sizes not in token scale. **[RECOMMENDATION]**  
- `scripts/smoke-a11y-modes.md` — a runbook script printed in CI logs: toggle Bold Text/Increase Contrast/Reduce Transparency/Reduce Motion and capture key screenshots. **[RECOMMENDATION]** aligned with Apple testing guidance. citeturn37view0turn39view3  

**Prioritized rule list (CRITICAL/HIGH/MEDIUM/LOW)**  
- **CRITICAL:** 44pt hit targets; sufficient contrast + dark-mode legibility; reduced motion behavior for motion triggers; token-only styling for core components; list performance (FlashList for heavy lists). citeturn40view0turn37view0turn39view3turn6search3  
- **HIGH:** SF Symbols consistency (expo-symbols); glass/blur fallbacks; image loading polish (expo-image). citeturn32view0turn30view0turn9search0  
- **MEDIUM:** iPad two-column adaptations; pointer/keyboard friendliness; haptics taxonomy. citeturn25view0turn44view0turn45view0turn13view0  
- **LOW:** Experimental shared-element transitions; “hero” Skia effects beyond core flows. citeturn10search7turn9search2  

**How this skill should interact with your existing guardrails skill**  
- Guardrails skill: enforces architecture/perf/release safety constraints.  
- This skill: defines the **visual system + UX craft defaults** (tokens/components/motion/a11y modes).  
**Contract (copy-ready):**  
- This skill must never propose visuals that violate performance budgets (e.g., heavy blur in lists) without offering a fallback. **[INFERENCE]** based on RN 60 FPS target + blur caveats. citeturn10search4turn9search5  
- Guardrails should validate that recommended libraries (glass/symbols/mesh gradient) are compatible with the current Expo SDK and your release workflow. **[FACT]** Expo changelog shows SDK cadence and versions. citeturn27view0  

### Final “Golden System” for React Native iOS in Expo

This is a complete, opinionated default you can implement and reuse across apps.

**Principles (the “house style”):**  
- Content-first layered UI (controls yield to content). **[FACT]** citeturn42view0turn25view0  
- One spacing rhythm, one type scale, one motion language. **[RECOMMENDATION]**  
- Materials are capability-based (glass if available, solid if not; always respect accessibility). **[FACT]** citeturn30view0turn37view0turn35view0  
- Delight is subtle, feedback-driven, and reduced-motion safe. **[FACT]** citeturn5search5turn39view3  

**Tokens (minimum set):**  
- Colors: semantic (bg/text/stroke) + brand accents; define high-contrast variants. **[FACT]** contrast evaluation guidance. citeturn37view0turn11search3  
- Typography: roles + scaling policy (`maxFontSizeMultiplier` per role). **[FACT]** citeturn34search1turn40view0  
- Space/radius: tokenized and consistent. **[RECOMMENDATION]**  
- Motion: durations + house spring; plus reduced-motion alternates. **[FACT]** citeturn39view3turn34search8  
- Materials: `surface.solid`, `surface.blur`, `surface.glass` with availability checks. **[FACT]** citeturn30view0turn9search5  
- Iconography: SF Symbols default with controlled variants. **[FACT]** citeturn41view0turn32view0  

**Component standards (defaults):**  
- Touch targets ≥ 44×44pt. **[FACT]** citeturn40view0  
- Buttons: states = default / pressed / disabled / loading. Feedback always present (visual; optional haptic). **[RECOMMENDATION]**  
- Inputs: never fixed height without considering font scale; prefer keyboard controller for “native feel” forms. **[FACT]** citeturn33view0turn28search0  
- Icons: use a single SF rendering mode for the app; only special-case palette/multicolor. **[RECOMMENDATION]** backed by SF Symbols modes and expo-symbols API. citeturn32view0turn41view0  

**Motion standards (defaults):**  
- Micro feedback: fast, subtle (no gimmicks). **[FACT]** citeturn5search5  
- Reduced motion: disable depth simulation and ongoing motion; replace with fades/highlights. **[FACT]** citeturn39view3  
- Glass: never animate parent opacity; use effect-specific animation props. **[FACT]** citeturn30view0  

**Review process (repeatable loop):**  
1. Run the 0–100 rubric on each screen. **[RECOMMENDATION]**  
2. Test A11y modes: Bold Text, Increase Contrast, Reduce Transparency, Reduce Motion. **[FACT]** citeturn37view0turn39view3turn35view0  
3. Test list performance on real devices; swap to FlashList where needed; tune list config. **[FACT]** citeturn6search3turn6search0turn10search4  
4. Compare against benchmark references (Apple gallery + ADA winners) to detect “template UI drift.” **[FACT]** citeturn25view0turn14view2turn13view0  

**Implementation defaults (Expo-managed, production-ready):**  
- Expo Router Stack + Modals (native-like). **[FACT]** citeturn10search8turn10search11  
- Reanimated + Gesture Handler. **[FACT]** citeturn7search2turn34search8  
- SF Symbols via expo-symbols (iOS) with fallback elsewhere. **[FACT]** citeturn32view0  
- iOS 26 glass via expo-glass-effect with accessibility gating + fallback to solid/blur. **[FACT]** citeturn30view0turn37view0turn35view0  
- Images via expo-image (cache + placeholders). **[FACT]** citeturn9search0  
- Lists via FlashList for heavy feeds. **[FACT]** citeturn6search3  
- Keyboard polish via react-native-keyboard-controller for forms. **[FACT]** citeturn33view0  

This golden system is designed to produce a consistent outcome: **premium iOS feel, distinctive but not gimmicky aesthetics, accessibility-safe materials, and performance that holds under real-world scrolling and motion constraints.** **[INFERENCE]** grounded in Apple’s 2025–2026 platform direction, Apple’s operational accessibility criteria, and the concrete Expo/RN feature set available as of 2026-02-21. citeturn42view0turn37view0turn30view0turn35view0turn6search3turn9search0