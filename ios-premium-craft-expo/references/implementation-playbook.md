# Implementation Playbook

## Recommended Stack

1. Expo Router for navigation structure.
2. Reanimated and Gesture Handler for responsive motion and gestures.
3. Expo Image for image loading and caching.
4. FlashList for heavy feed-style lists.
5. Expo Symbols for iOS-native iconography where appropriate.
6. Glass or blur surfaces only where they improve hierarchy and identity.

## Build A New Screen

1. Define the visual promise and primary user action.
2. Map layout skeleton with tokenized spacing only.
3. Compose with existing core components.
4. Apply tokenized color and typography.
5. Add motion and interaction feedback.
6. Add accessibility-safe fallbacks for motion and materials.
7. Run script checks and fix issues before finishing.

## Upgrade Existing Screen

1. Run the review rubric first.
2. Remove one-off styles and migrate to tokens.
3. Normalize component states and spacing rhythm.
4. Add one signature interaction if missing.
5. Re-test in accessibility and performance-sensitive contexts.

## Performance-Aware Craft Rules

1. Keep list rows visually simple under frequent reuse.
2. Keep image loading asynchronous with placeholders.
3. Keep blur and gradient layers limited in scrolling zones.
4. Prefer native-driven animation paths for smooth interaction.

## Deliverable Modes

1. Code patch mode:
- implement concrete files and logic.
2. Review mode:
- findings first with severity and file references.
3. Plan mode:
- step-by-step rollout with clear acceptance checks.
