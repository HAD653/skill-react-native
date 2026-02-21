# React Native Skills Workspace

This repository contains two complementary Codex skills for React Native + Expo.

## Skills

### 1) `react-native-solo-guardrails`

Production guardrails for solo builders (2 to 5 year horizon) on React Native + Expo Router.

Main focus:
- architecture and maintainability;
- scalability, performance, security, tests, release discipline;
- Expo SDK and React Native upgrade readiness.

Key assets:
- `react-native-solo-guardrails/SKILL.md`
- `react-native-solo-guardrails/scripts/rn_guardrails_audit.sh`
- `react-native-solo-guardrails/references/*`

### 2) `ios-premium-craft-expo`

Premium iOS-first visual craft skill for React Native + Expo.

Main focus:
- distinctive, high-end iOS UI direction;
- tokenized design system (color, type, spacing, motion, materials);
- polished motion, accessibility-safe fallbacks, performance-aware UI implementation;
- visual QA and repeatable quality checks.

Key assets:
- `ios-premium-craft-expo/SKILL.md`
- `ios-premium-craft-expo/scripts/*`
- `ios-premium-craft-expo/references/*`

## Deep Research Sources

These two research documents were used to build the skills:

1. `deep-research-report.md`
2. `deep-research-ui.md`

## Quick Usage

Use the skills by name in your prompt:

```text
$react-native-solo-guardrails review my Expo Router architecture and give prioritized fixes.
$ios-premium-craft-expo redesign this screen to feel premium iOS and provide production-ready code.
```

Run the guardrails audit script:

```bash
bash react-native-solo-guardrails/scripts/rn_guardrails_audit.sh <project-root>
```

Run visual quality scripts:

```bash
node ios-premium-craft-expo/scripts/check-no-raw-colors.js .
node ios-premium-craft-expo/scripts/check-touch-target-min.js .
node ios-premium-craft-expo/scripts/check-motion-reduced.js .
node ios-premium-craft-expo/scripts/check-typography-scale.js .
bash ios-premium-craft-expo/scripts/smoke-a11y-modes.sh .
```
