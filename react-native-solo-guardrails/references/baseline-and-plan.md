# Baseline Recommandée et Plan

## Baseline stack (solo dev)

- Navigation: Expo Router (`src/app`, typed routes).
- Server state: TanStack Query + onlineManager(NetInfo) + persistance queries.
- Client state: store minimal (ex: Zustand/Jotai) + selectors.
- Validation: schémas runtime pour toutes les données externes.
- Forms: React Hook Form + resolver validation.
- Storage:
- tokens/secrets: SecureStore;
- non sensible: AsyncStorage ou SQLite selon structure;
- MMKV seulement si besoin de perf sync spécifique.
- Offline write critique: SQLite + outbox + retry + idempotence serveur.
- Lists: FlashList sur écrans volumineux.
- Animations complexes: Reanimated 4 si New Architecture assumée.
- Testing: Jest (unit) + Testing Library (UI) + Maestro (E2E smoke).
- Observabilité: monitoring crash/perf configuré tôt.
- CI/CD: typecheck + lint + tests + build check + EAS Build/Update.

## Top 10 décisions

1. Mettre `src/app` en route-only.
2. Forcer frontières d'import via lint.
3. Activer TypeScript strict + CI typecheck.
4. Valider runtime les entrées externes.
5. Isoler server state dans TanStack Query.
6. Traiter offline avec outbox si flux critique.
7. Discipliner EAS Update (`runtimeVersion`, channels, branches, rollback).
8. Stocker tokens uniquement en SecureStore.
9. Mesurer la perf en release avec outils natifs.
10. Préparer migration New Architecture dès les choix de libs.

## Top 10 erreurs à éviter

1. Laisser des composants non-route dans `app/`.
2. Mettre logique métier dans routes/layouts.
3. Reporter enforcement des frontières d'import.
4. Croire que persisted mutations suffit pour offline sérieux.
5. Stocker tokens en AsyncStorage.
6. Juger la perf en dev mode.
7. Sauter des versions SDK pendant upgrade.
8. Choisir des libs non prêtes pour New Architecture.
9. Confondre channels et branches EAS Update.
10. Ignorer `expo-doctor` avant release.

## Plan en 7 jours

- Jour 1: migrer structure `src/app` route-only + typed routes.
- Jour 2: poser frontières imports + API publique de features.
- Jour 3: activer strict + CI typecheck + validation runtime sur endpoints critiques.
- Jour 4: structurer data layer TanStack Query + onlineManager(NetInfo).
- Jour 5: formaliser release discipline (`runtimeVersion`, channels/branches, rollback).
- Jour 6: poser baseline tests (unit + UI + 1 flow Maestro).
- Jour 7: profiler listes/images, activer monitoring, lancer `expo-doctor`.

