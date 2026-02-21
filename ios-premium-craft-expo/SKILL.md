---
name: ios-premium-craft-expo
description: Design and implement premium, iPhone-first interfaces for React Native and Expo with a distinctive visual system, tokenized styling, polished motion, accessibility-safe materials, and performance-aware execution. Use when asked to create a high-end iOS screen or component, upgrade an existing UI to feel premium, define design tokens and component standards, apply glass or blur materials with safe fallbacks, or audit and fix visual quality issues in a React Native Expo app.
---

# iOS Premium Craft for Expo

Build premium iOS-feel UI for React Native and Expo with strong visual intent and production-grade implementation.

## Execute Workflow

1. Classify the request:
- new screen or component build;
- visual polish of existing code;
- design system setup (tokens and components);
- motion or material integration;
- review or quality audit.
2. Load only the references needed for that request.
3. Implement or audit with the non-negotiables in this skill.
4. Run script checks when code is available.
5. Deliver actionable output:
- concrete code patch, or
- prioritized findings with file paths, or
- implementation plan with ordered steps.

## Load References Selectively

- `references/non-negotiables.md`: mandatory quality bar and severity levels.
- `references/design-tokens-spec.md`: token architecture and naming.
- `references/component-standards.md`: required states and size rules.
- `references/motion-materials-accessibility.md`: motion language, glass and blur policy, accessibility gates.
- `references/implementation-playbook.md`: stack choices and build workflow.
- `references/review-rubric.md`: scoring and audit protocol.

## Apply Non-Negotiable Defaults

1. Define a clear visual direction before coding.
2. Use a token-first approach for color, type, spacing, radius, motion, and materials.
3. Keep touch targets at least 44 by 44 points for interactive elements.
4. Keep text legible with a controlled typography scale and Dynamic Type safety.
5. Keep motion subtle and purposeful; provide reduced-motion behavior.
6. Keep translucency optional; provide solid or blur fallbacks for unsupported or accessibility-constrained contexts.
7. Keep contrast robust in light and dark themes, especially in dark mode.
8. Keep lists smooth; avoid heavy effects inside scrolling rows.
9. Keep iconography consistent; do not mix unrelated icon styles.
10. Keep component behavior deterministic across states: default, pressed, disabled, loading, focus where relevant.

## Build Protocol For New UI

1. Define a one-paragraph visual promise:
- three adjectives to pursue;
- three adjectives to avoid;
- one signature material direction;
- one signature motion direction.
2. Create or align tokens first.
3. Compose the screen from core components, not one-off styles.
4. Add one memorable interaction per flow, not per screen.
5. Validate accessibility and performance constraints before finalizing visuals.

## Audit Protocol

1. Score the screen with `references/review-rubric.md`.
2. Identify CRITICAL and HIGH findings first.
3. Provide exact fixes with file paths and expected impact.
4. Re-score after fixes to confirm improvement.

## Run Repeatable Checks

From the project root:

```bash
node ios-premium-craft-expo/scripts/check-no-raw-colors.js .
node ios-premium-craft-expo/scripts/check-touch-target-min.js .
node ios-premium-craft-expo/scripts/check-motion-reduced.js .
node ios-premium-craft-expo/scripts/check-typography-scale.js .
bash ios-premium-craft-expo/scripts/smoke-a11y-modes.sh .
```

## Output Contract

- For implementation requests: ship production-ready code, not only abstract advice.
- For review requests: report findings first, ordered by severity, with concrete file references.
- For style direction requests: provide a specific aesthetic direction and map it to tokens and components.
- For iOS-only requests: optimize for iPhone first, keep reasonable fallback behavior on Android without diluting iOS craft.

## Recency Rule

Treat platform and library guidance as time-sensitive.
If a request includes terms like latest, current, or today, verify current versions and compatibility before concluding.
