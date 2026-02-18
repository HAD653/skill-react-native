# Règles Priorisées (60)

## CRITICAL (15)

1. `architecture-routes-only`: `src/app/**` = routes/layouts uniquement.
2. `architecture-src-app-only`: si `src/` existe, placer les routes dans `src/app`.
3. `routing-root-layout-is-init`: centraliser init/providers dans `app/_layout.tsx`.
4. `routing-thin-routes`: déléguer le rendu à `features/**`, pas de logique métier en route.
5. `data-runtime-validation`: valider runtime toute donnée externe (API/deep link/storage).
6. `ts-strict-typecheck-ci`: activer `strict: true` + `typecheck` CI obligatoire.
7. `state-server-vs-client`: server state via TanStack Query; store global minimal.
8. `offline-dont-trust-persisted-mutations-alone`: offline write critique via outbox/SQLite.
9. `release-runtimeVersion-required`: définir `runtimeVersion` et le maintenir stable.
10. `release-channels-branches-disciplined`: documenter mapping channel -> branch.
11. `release-rollout-or-dont-ship-risky`: rollout progressif sur features risquées.
12. `release-rollback-playbook`: préparer une procédure rollback testée.
13. `security-no-tokens-in-asyncstorage`: ne jamais stocker de token dans AsyncStorage.
14. `security-securestore-for-secrets`: stocker secrets/tokens via SecureStore.
15. `compat-expo-doctor-gate`: exécuter `npx expo-doctor` et corriger warnings.

## HIGH (20)

16. `architecture-public-api-only`: exposer chaque feature via `index.ts`.
17. `architecture-no-cross-feature-imports`: interdire imports directs cross-feature.
18. `routing-use-route-groups`: organiser `(tabs)`, `(auth)`, etc.
19. `routing-plus-files-are-special`: respecter sémantique `+not-found`, `+middleware`, etc.
20. `routing-typed-routes-on`: activer typed routes et accepter la génération de types.
21. `ts-no-import-appjson`: utiliser `Constants.expoConfig` au lieu d'importer `app.json`.
22. `ts-path-aliases`: standardiser `baseUrl` + `paths`.
23. `data-http-client-centralized`: un seul client HTTP (auth, retry, logs).
24. `data-zod-dto-per-endpoint`: définir un schéma DTO runtime par endpoint.
25. `state-query-key-conventions`: conventions de query keys par feature.
26. `state-onlineManager-netinfo`: connecter NetInfo à `onlineManager`.
27. `perf-flashlist-for-feeds`: utiliser FlashList pour listes longues.
28. `perf-measure-release`: mesurer perf en release/profileable.
29. `perf-images-cache-policy`: standardiser prefetch/cachePolicy images.
30. `perf-avoid-js-thread-block`: éviter calculs lourds sur thread JS en interaction.
31. `testing-testing-library-principles`: tests orientés usage, pas internals.
32. `testing-expo-jest-baseline`: établir Jest + jest-expo.
33. `testing-maestro-smoke-e2e`: garder 3 à 10 flows Maestro.
34. `release-env-vars-strategy`: clarifier stratégie `EXPO_PUBLIC_` et secrets EAS.
35. `observability-sentry-baseline`: intégrer monitoring crash/perf tôt.

## MEDIUM (15)

36. `architecture-service-layer`: isoler wrappers dans `services/**`.
37. `routing-screen-options-one-place`: centraliser options de screens proche layout.
38. `data-persist-query-cache`: persister cache des queries.
39. `offline-ux-banner`: afficher état offline + mode dégradé explicite.
40. `perf-devtools-panel`: utiliser workflow DevTools/profiler.
41. `perf-startup-splash-fonts`: optimiser init startup dans root layout.
42. `a11y-query-by-a11y`: utiliser queries a11y dans tests UI.
43. `security-config-public-check`: lancer `npx expo config --type public`.
44. `release-update-traceability`: tracer update ID/build ID.
45. `release-asset-selection`: optimiser sélection d'assets OTA.
46. `compat-upgrade-one-step`: upgrader Expo SDK une version à la fois.
47. `compat-rn-upgrade-helper`: utiliser RN Upgrade Helper pour diffs.
48. `monorepo-only-if-multi-app`: monorepo seulement si besoin réel multi-app.
49. `monorepo-cng-clean`: utiliser `prebuild --clean` avec CNG en CI.
50. `state-client-store-selectors`: appliquer selectors partout côté store client.

## LOW (10)

51. `release-code-signing-enterprise`: activer code signing selon threat model.
52. `tooling-biome-eval`: évaluer Biome selon besoins.
53. `ui-theme-tokens`: centraliser tokens design system.
54. `routing-native-intent`: utiliser `+native-intent` pour cas deep links atypiques.
55. `data-localization-i18n`: structurer i18n via expo-localization + lib i18n.
56. `perf-bytecode-diffing`: surveiller impacts Hermes bytecode diffing.
57. `compat-reanimated-versions`: suivre table de compat Reanimated.
58. `compat-gesture-handler-versions`: suivre table de compat Gesture Handler.
59. `storage-mmkv-only-when-needed`: introduire MMKV seulement si gain justifié.
60. `docs-keep-skill-updated`: revalider les versions à chaque cycle upgrade.

