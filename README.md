# React Native Solo Guardrails

Skill de guardrails pour apps React Native + Expo Router, orienté solo-dev en production sur 2 à 5 ans.

## Objectif

Donner une méthode claire pour:
- structurer une architecture maintenable;
- auditer un codebase existant;
- prioriser les fixes critiques (scalabilité, perf, sécurité, tests, release);
- préparer les upgrades Expo SDK / React Native.

## Ce que contient le skill

- `SKILL.md`: workflow principal d'exécution.
- `scripts/rn_guardrails_audit.sh`: audit rapide automatisé du repo.
- `references/golden-architecture.md`: structure recommandée `src/app` route-only + frontières.
- `references/rules-prioritized.md`: 60 règles classées CRITICAL/HIGH/MEDIUM/LOW.
- `references/top-25-detailed-rules.md`: bad/good/pièges des règles les plus importantes.
- `references/checklists.md`: checklists pre-commit, release, upgrade, perf, a11y, sécurité.
- `references/compatibility-matrix-2026-02-18.md`: matrice Expo/RN/libs au 18 février 2026.
- `references/baseline-and-plan.md`: baseline stack, top décisions/erreurs, plan 7 jours.

## Usage rapide

Depuis un repo React Native/Expo:

```bash
bash scripts/rn_guardrails_audit.sh <project-root>
```

Puis traiter en priorité:
1. Toutes les règles `CRITICAL`.
2. Les règles `HIGH` à fort impact produit.
3. Le reste selon contexte.

## Quand utiliser ce skill

- Création d'une nouvelle base Expo Router.
- Revue architecture/qualité d'un projet existant.
- Préparation d'une release OTA (EAS Update).
- Préparation d'un upgrade SDK/RN.
- Mise en place d'une discipline tests/CI/CD.

## Limites

- Référence temporelle figée au 18 février 2026 pour les versions.
- Ne couvre pas en profondeur un système de responsive tablette/iPad (breakpoints, split-view) dédié.

