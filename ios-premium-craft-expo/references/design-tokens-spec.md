# Design Tokens Spec

## Table of Contents

1. Purpose
2. Token Families
3. Naming Rules
4. Suggested Structure
5. Token Usage Rules
6. Recommended Source Layout
7. Enforcement

## Purpose

Create a token system that keeps visual quality consistent and maintainable across screens.

## Token Families

1. `color`
2. `typography`
3. `space`
4. `radius`
5. `shadow`
6. `motion`
7. `material`
8. `icon`

## Naming Rules

1. Use semantic names, not intentless names:
- good: `color.text.primary`
- bad: `color.gray700`
2. Use stable role-based keys:
- `primary`, `secondary`, `inverse`, `muted`, `critical`, `success`, `warning`.
3. Keep platform variants explicit:
- `material.surface.glass.ios26`
- `material.surface.blur.legacy`
- `material.surface.solid.default`

## Suggested Structure

```json
{
  "color": {
    "bg": {
      "canvas": "#0B0D10",
      "surface": "#12161B",
      "elevated": "#1A2028"
    },
    "text": {
      "primary": "#F7FAFC",
      "secondary": "#B7C0CC",
      "inverse": "#0B0D10"
    },
    "accent": {
      "primary": "#42C9A8",
      "secondary": "#5C8DFF"
    }
  },
  "typography": {
    "size": {
      "micro": 11,
      "caption": 12,
      "bodyS": 15,
      "bodyM": 16,
      "bodyL": 17,
      "titleS": 20,
      "titleM": 22,
      "titleL": 28,
      "displayS": 34,
      "displayM": 40
    },
    "weight": {
      "regular": "400",
      "medium": "500",
      "semibold": "600"
    }
  },
  "space": {
    "xs": 4,
    "sm": 8,
    "md": 12,
    "lg": 16,
    "xl": 24,
    "xxl": 32
  },
  "radius": {
    "sm": 8,
    "md": 12,
    "lg": 16,
    "pill": 999
  },
  "motion": {
    "duration": {
      "fast": 120,
      "normal": 180,
      "slow": 260
    },
    "spring": {
      "damping": 20,
      "stiffness": 220
    }
  }
}
```

## Token Usage Rules

1. Read tokens through a single adapter layer.
2. Do not reference literal values in feature components unless there is a documented exception.
3. Keep accessibility variants in token maps:
- contrast-enhanced;
- reduced-transparency;
- reduced-motion.
4. Keep dark and light parity for semantic roles.

## Recommended Source Layout

```text
src/theme/tokens.ts
src/theme/semantic.ts
src/theme/material.ts
src/theme/motion.ts
src/theme/typography.ts
```

## Enforcement

Use `scripts/check-no-raw-colors.js` and `scripts/check-typography-scale.js` to catch drift.
