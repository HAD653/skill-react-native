# Non-Negotiables

## CRITICAL

1. Keep interactive targets at least 44 by 44 points.
2. Keep sufficient contrast in light and dark themes.
3. Implement reduced-motion behavior for animations and transitions.
4. Keep core styles tokenized; avoid hardcoded colors and one-off typography in product UI.
5. Keep heavy visual effects out of long or dense scroll lists.

## HIGH

1. Keep iconography consistent across the app.
2. Keep material behavior capability-based:
- iOS 26+: glass allowed in focused surfaces;
- older iOS and other platforms: blur or solid fallback.
3. Keep image rendering polished with caching and placeholders.
4. Keep pressed, disabled, and loading states explicit for key controls.

## MEDIUM

1. Keep iPad adaptability through responsive layout regions.
2. Keep pointer and keyboard readiness for productivity-style views.
3. Keep haptic usage mapped to intent instead of over-triggering.

## LOW

1. Use advanced hero effects only where value is clear.
2. Prefer subtle signature moments over broad decorative animation.

## Cheap-Looking Failure Modes

1. Random spacing and typography values.
2. Generic gradient-plus-card layouts with no visual identity.
3. Over-animated UI with no reduced-motion path.
4. Gray-on-black dark mode with weak legibility.
5. Mixed icon sets and inconsistent stroke styles.
6. Dense tap zones and small controls.

## Default Recovery Sequence

1. Fix all CRITICAL issues first.
2. Fix HIGH issues that directly impact trust and conversion.
3. Resolve MEDIUM issues for scalability and consistency.
4. Handle LOW issues after product-critical quality is stable.
