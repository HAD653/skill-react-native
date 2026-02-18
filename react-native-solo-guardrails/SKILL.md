---
name: react-native-solo-guardrails
description: Guardrails de production React Native + Expo Router pour un usage solo sur 2 à 5 ans. Utiliser ce skill pour concevoir une architecture d'app Expo/RN, auditer un codebase existant, corriger des risques de scalabilité/performance/sécurité, structurer les tests et la release discipline (EAS Update), préparer un upgrade SDK/RN, ou définir un plan d'implémentation pragmatique basé sur des règles priorisées.
---

# React Native Solo Guardrails

Appliquer des décisions stables pour une app Expo Router + React Native maintenable en solo.

## Exécuter le workflow

1. Classifier la demande dans une des catégories:
- architecture/scalabilité;
- audit/refactor;
- performance UX;
- tests/CI/CD;
- release OTA (EAS Update);
- sécurité stockage/config;
- upgrade Expo SDK / RN.
2. Lire uniquement la référence nécessaire dans `references/` (chargement progressif).
3. Lancer l'audit automatique si le repo est disponible:
```bash
bash scripts/rn_guardrails_audit.sh <project-root>
```
4. Prioriser les changements:
- corriger toutes les règles `CRITICAL`;
- corriger ensuite les `HIGH` à fort impact produit;
- traiter `MEDIUM/LOW` selon le contexte.
5. Livrer un résultat actionnable:
- soit un patch concret;
- soit une liste de findings classés par sévérité avec chemins de fichier;
- soit un plan d'implémentation en étapes.

## Choisir les références à charger

- Architecture, frontières, structure route-only: `references/golden-architecture.md`
- Règles priorisées 60 items: `references/rules-prioritized.md`
- Règles détaillées bad/good/pièges: `references/top-25-detailed-rules.md`
- Checklists exécution: `references/checklists.md`
- Compat Expo/RN et libs: `references/compatibility-matrix-2026-02-18.md`
- Stack recommandée, décisions clés, plan 7 jours: `references/baseline-and-plan.md`

## Appliquer les non-négociables

1. Garder `src/app/**` pour routes/layouts uniquement.
2. Garder les fichiers de route "thin": routing/wiring seulement, logique métier dans `features/**`.
3. Activer `strict: true` et imposer `tsc --noEmit` en CI.
4. Valider runtime toute donnée externe (API, deep links, storage).
5. Séparer server state (TanStack Query) et client state (store minimal).
6. Ne pas baser l'offline write critique uniquement sur les mutations persistées.
7. Définir `runtimeVersion` et un mapping channels/branches explicite pour EAS Update.
8. Stocker tokens/secrets avec SecureStore, jamais AsyncStorage.
9. Mesurer la perf en build release/profileable, pas en dev mode.
10. Exécuter `npx expo-doctor` régulièrement et corriger les warnings de compat.

## Produire la sortie attendue selon le besoin

- Demande "construire une base projet": appliquer `golden-architecture`, `baseline-and-plan`, `checklists`.
- Demande "review": lancer le script d'audit, compléter manuellement, renvoyer findings CRITICAL/HIGH en premier.
- Demande "upgrade": utiliser `compatibility-matrix` + `checklists` (upgrade one-step, doctor, rebuild, revalidation OTA).
- Demande "release": utiliser `checklists` + règles release de `rules-prioritized`.
- Demande "perf": appliquer règles perf (lists/images/animations/startup) et proposer protocole de mesure release.

## Respecter la fenêtre temporelle

Traiter les informations de versions comme valides à la date du rapport: 18 février 2026.
Si la demande contient "latest", "aujourd'hui", "version actuelle", revérifier avant de conclure.
