# Motion, Materials, Accessibility

## Motion Defaults

## Timing

1. micro feedback: 80 to 140 ms
2. simple state transitions: 140 to 220 ms
3. navigation or structural transitions: 220 to 320 ms

## Principles

1. Keep motion purposeful and tied to state change.
2. Keep easing and spring configuration consistent across the app.
3. Keep one motion language; do not mix unrelated animation styles.

## Reduced Motion Rules

1. Disable or simplify depth-heavy motion.
2. Replace parallax and perpetual motion with opacity or color transitions.
3. Keep essential feedback even in reduced-motion mode.
4. Gate animation-heavy components behind a reduced-motion check path.

## Material Policy

Treat materials as capability-based, not mandatory.

1. iOS 26 and up:
- glass can be used on key surfaces;
- keep effects subtle and avoid stacking too many translucent layers.
2. Older iOS:
- use selective blur or solid elevated surfaces.
3. Android and non-iOS contexts:
- prefer solid and gradient surfaces with clear contrast.

## Material Safety Rules

1. Keep text legible on any translucent background.
2. Provide a reduced-transparency fallback.
3. Avoid heavy blur in large lists or repeated rows.
4. Avoid parent opacity animation patterns that visually degrade material behavior.

## Accessibility Gates

Validate these modes for key screens:
1. larger text scale
2. bold text behavior
3. increased contrast behavior
4. reduced transparency behavior
5. reduced motion behavior

## Interaction Feedback

1. Keep touch feedback immediate.
2. Use haptics sparingly for meaningful state transitions:
- success;
- warning;
- confirmation;
- destructive actions.
3. Do not add haptics for trivial taps.
