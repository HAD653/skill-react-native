# Component Standards

## Global Rules

1. Expose explicit states for all interactive components.
2. Keep touch targets at least 44 by 44 points.
3. Bind all component styling to semantic tokens.
4. Keep visual rhythm consistent with shared spacing and radius scales.

## Button

Required states:
1. default
2. pressed
3. disabled
4. loading

Required properties:
1. `variant`: primary, secondary, tertiary, destructive
2. `size`: sm, md, lg
3. `leadingIcon` or `trailingIcon` optional
4. `isLoading` boolean
5. `isDisabled` boolean

Rules:
1. Keep min height 44.
2. Keep label from truncating in normal width ranges.
3. Keep pressed feedback immediate and obvious.

## IconButton

Rules:
1. Keep tap area at least 44 by 44 even if glyph is 18 to 24.
2. Keep icon style family consistent with the app icon system.
3. Keep states explicit: default, pressed, disabled, selected if toggle.

## Input

Rules:
1. Keep value, error, helper, and placeholder states explicit.
2. Keep focus state clearly visible in low and high contrast modes.
3. Avoid fixed rigid heights that break under font scaling.
4. Keep error messaging concise and close to the field.

## ListRow

Rules:
1. Keep left and right accessory alignment consistent.
2. Keep row density predictable across sections.
3. Keep expensive visual effects out of long scroll lists.
4. Keep active, selected, and disabled states explicit when relevant.

## Sheet or Modal Surface

Rules:
1. Keep hierarchy obvious between background, sheet container, and foreground actions.
2. Keep drag affordances and close affordances easy to discover.
3. Keep blur or glass effects subtle and fallback-safe.

## Tab or Segmented Control

Rules:
1. Keep selected state unmistakable.
2. Keep spacing and animation consistent with the motion language.
3. Keep labels readable without truncation in common locales.

## EmptyState

Rules:
1. Keep one primary CTA.
2. Keep one concise explanatory line.
3. Keep illustration style aligned with the product art direction.
