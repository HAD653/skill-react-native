# Top 25 Règles Détaillées

## TOC

1. architecture-routes-only
2. routing-root-layout-is-init
3. routing-thin-routes
4. routing-typed-routes-on
5. architecture-public-api-only
6. ts-strict-typecheck-ci
7. data-runtime-validation
8. state-server-vs-client
9. state-onlineManager-netinfo
10. offline-dont-trust-persisted-mutations-alone
11. perf-measure-release
12. perf-flashlist-for-feeds
13. perf-images-cache-policy
14. perf-reanimated-new-arch-only
15. testing-testing-library-principles
16. testing-expo-jest-baseline
17. testing-maestro-smoke-e2e
18. release-runtimeVersion-required
19. release-channels-branches-disciplined
20. release-rollout-or-dont-ship-risky
21. release-rollback-playbook
22. security-no-tokens-in-asyncstorage
23. security-secrets-not-embedded
24. compat-expo-doctor-gate
25. architecture-no-cross-feature-imports

## 1) architecture-routes-only

- But: empêcher le router spaghetti.
- Bad: placer des helpers/components dans `src/app/**`.
- Good: garder `src/app/**` route/layout only.
- Piège: un dossier `components` dans `app/` devient une route.

## 2) routing-root-layout-is-init

- Bad: disperser init fonts/splash/providers.
- Good: centraliser init globale dans `app/_layout.tsx`.
- Exception: autoriser init locale dans layouts imbriqués si navigation-first.

## 3) routing-thin-routes

- Bad: route qui contient API/state/business logic.
- Good: route qui importe un screen feature et rend uniquement ce screen.
- Piège: poser du state global dans une route "par facilité".

## 4) routing-typed-routes-on

- Bad: manipuler des strings de route partout.
- Good: activer typed routes et utiliser les types générés.
- Piège: oublier que les types sont générés; documenter le workflow.

## 5) architecture-public-api-only

- Bad: importer des fichiers internes `features/x/model/internal`.
- Good: importer uniquement `features/x`.
- Piège: faire des barrels trop larges et créer des cycles.

## 6) ts-strict-typecheck-ci

- Bad: `strict` désactivé et erreurs accumulées.
- Good: `strict: true` + CI `tsc --noEmit`.
- Piège: migration brutale sans plan; migrer progressif mais viser strict.

## 7) data-runtime-validation

- Bad: caster le JSON API directement en type TS.
- Good: parser avec schéma runtime (ex: Zod) avant usage.
- Piège: oublier storage et deep links.

## 8) state-server-vs-client

- Bad: tout mettre dans un store global.
- Good: TanStack Query pour serveur, store minimal pour UI locale.
- Piège: dupliquer cache API dans store client.

## 9) state-onlineManager-netinfo

- Bad: état online incohérent -> refetch erratique.
- Good: brancher NetInfo à `onlineManager.setEventListener`.
- Piège: comportements device spécifiques (`isInternetReachable`).

## 10) offline-dont-trust-persisted-mutations-alone

- Bad: dépendre uniquement des persisted mutations.
- Good: mettre une outbox SQLite + retry + idempotence serveur.
- Piège: ignorer stratégie de résolution de conflits.

## 11) perf-measure-release

- Bad: conclure sur les perfs en dev mode.
- Good: profiler en build release/profileable.
- Piège: se limiter au perf monitor embarqué.

## 12) perf-flashlist-for-feeds

- Bad: `ScrollView` sur grosses listes.
- Good: FlashList + keyExtractor stable + sizing clair.
- Piège: confusion FlashList v1/v2 selon architecture.

## 13) perf-images-cache-policy

- Bad: rechargements image répétés sans policy.
- Good: standardiser `prefetch` + cachePolicy.
- Piège: ignorer cas edge (`uri` invalide, cacheKey).

## 14) perf-reanimated-new-arch-only

- Bad: choisir Reanimated 4 sans assumer New Architecture.
- Good: l'utiliser seulement avec target New Architecture claire.
- Piège: ignorer table de compat version RN.

## 15) testing-testing-library-principles

- Bad: tester state interne/implémentation.
- Good: tester comportement observable utilisateur.
- Piège: snapshots massifs fragiles.

## 16) testing-expo-jest-baseline

- But: sécuriser domain logic et utilitaires rapidement.
- Piège: mocker excessivement RN et perdre la valeur test.

## 17) testing-maestro-smoke-e2e

- But: couvrir flux vitaux avec 3 à 10 tests E2E.
- Piège: sélecteurs non stables; préférer a11y labels.

## 18) release-runtimeVersion-required

- Bad: pousser OTA vers builds incompatibles.
- Good: traiter `runtimeVersion` comme contrat de compat.

## 19) release-channels-branches-disciplined

- Bad: confondre channel et branch.
- Good: documenter mapping build-time channel -> update branch.

## 20) release-rollout-or-dont-ship-risky

- But: réduire blast radius avant full rollout.

## 21) release-rollback-playbook

- But: rollback immédiat avec procédure documentée/testée.

## 22) security-no-tokens-in-asyncstorage

- Bad: stocker tokens en AsyncStorage.
- Good: stocker tokens en SecureStore.

## 23) security-secrets-not-embedded

- Bad: croire qu'un secret EAS protège une valeur embarquée.
- Good: garder secrets côté serveur/build, jamais bundle client.

## 24) compat-expo-doctor-gate

- But: détecter drift de compat dépendances/config.
- Good: exécuter doctor avant release/upgrade.

## 25) architecture-no-cross-feature-imports

- Bad: importer direct `features/A` dans `features/B`.
- Good: passer par API publique stable (shared/services/contracts).

