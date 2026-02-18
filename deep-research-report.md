# Dossier de Deep Research Expo Router + React Native en production pour deux à cinq ans

## Executive summary

**Date de référence (Europe/Paris)** : 18 février 2026. À cette date, **Expo SDK 54 est la dernière version stable** (Expo Go “latest” = SDK 54 ; package `expo` “latest” = 54.x), tandis que **SDK 55 est en bêta / `next`**. citeturn12search19turn12search18turn12search0  
Côté React Native, **0.84 (11 février 2026) est la version la plus récente** et fait d’**Hermes V1 le moteur par défaut** ; cela impacte le “baseline” de performance et le plan d’upgrade. citeturn7search22

### Livrable 1 — Top 20 décisions/patterns à suivre (avec grille d’évaluation)

> **Lecture rapide** : si tu appliques ces 20 décisions, tu obtiens généralement une base “solo-dev” qui tient mieux les refactors, les upgrades Expo/RN, et le passage New Architecture-only.

| Décision clé (résumé actionnable) | Impact | Coût | Risque | Solo friendliness (1–5) | Maintenance 2 ans | Compat New Arch | Sources + date |
|---|---:|---:|---:|---:|---|---|---|
| Mettre les routes **uniquement** dans `app/` (ou `src/app`), tout le reste hors routes | High | Low | Low | 5 | Easy | Yes | Expo Router “non-navigation components live outside app” (maj 22 juil 2025). citeturn10view2 |
| Choisir `src/app` par défaut (structure reconnue officiellement) | High | Low | Low | 5 | Easy | Yes | Expo Router “top-level src directory … src/app … only other structure recognized” (maj 22 juil 2025) + doc “src directory” (maj 30 déc 2025). citeturn10view2turn1search0 |
| Rendre les fichiers de route “thin” : 1 route = wiring UI + navigation + params, pas de logique métier | High | Med | Low | 4 | Moderate | Yes | App/_layout remplace App.tsx et sert à init/providers (docs layouts). citeturn10view2turn10view1 |
| Utiliser **Typed Routes** et accepter la génération de types (non versionnés par défaut) | High | Low | Low | 4 | Easy | Yes | Expo Router typed routes (maj 25 nov 2025). citeturn0search0 |
| Appliquer **TypeScript strict** (et le traiter comme “typecheck only”) | High | Med | Med | 4 | Moderate | Yes | TS `strict` (doc TSConfig) + RN TS “tsc for type checking” (pub ~déc 2025/2026). citeturn9search1turn9search6 |
| Valider au runtime les réponses API avec **entity["organization","Zod","typescript validation library"]** (parse/safeParse) | High | Med | Low | 4 | Easy | Yes | Zod “.parse validate input” (docs). citeturn9search4turn9search11 |
| Séparer **server state** (TanStack Query) et **client state** (store minimal) | High | Med | Med | 4 | Moderate | Yes | TanStack Query docs (onlineManager, persist) + guidance RN/Expo offline via NetInfo. citeturn6search0turn1search31turn6search23 |
| Connecter la détection réseau à TanStack Query via `onlineManager.setEventListener(NetInfo…)` | Med | Low | Low | 5 | Easy | Yes | OnlineManager snippet officiel. citeturn6search0 |
| Pour offline sérieux : préférer **SQLite** (persistance) + “outbox” (queue) plutôt que compter uniquement sur “offline mutations persisted” | High | High | Med | 3 | Moderate | Yes | Expo “Local-first architecture” (maj 28 jan 2026) : SQLite comme base ; TanStack persist limite ; discussions bug/contraintes sur persistance mutations. citeturn15view2turn1search7turn1search27 |
| Standardiser le stockage : tokens → SecureStore ; préférences non sensibles → AsyncStorage/SQLite | High | Low | Low | 5 | Easy | Yes | RN Security “don’t use async storage for token storage” + Expo SecureStore. citeturn4search4turn2search1 |
| Sur listes longues : adopter FlashList (ou équivalent) et respecter ses contraintes | High | Med | Med | 4 | Moderate | Yes | FlashList v2 “built for RN’s new architecture” (maj 11 fév 2026). citeturn13view2 |
| Sur animations complexes : adopter Reanimated 4 (New Arch only) | High | Med | Med | 4 | Moderate | Yes (New Arch req.) | Reanimated 4 “New Architecture only” + table compat. citeturn6search2turn6search35 |
| Profiling : mesurer en release/profileable, pas en `dev=true` | High | Low | Low | 5 | Easy | Yes | RN perf : dev mode fausse perf ; profiling guide (Instruments/Android Studio Profiler). citeturn13view0turn13view1 |
| Debugging moderne : basculer sur React Native DevTools et outils natifs (Xcode/Android Studio) | Med | Low | Low | 4 | Easy | Yes | RN DevTools doc (maj 16 déc 2025) + RN 0.83 nouveautés DevTools. citeturn7search1turn7search0 |
| Tests UI : adopter Testing Library et **éviter les “implementation details”** | High | Med | Low | 4 | Easy | Yes | Testing Library “avoid implementation details” (maj 22 jan 2026) + RN testing overview. citeturn2search3turn2search7 |
| E2E “solo-friendly” : commencer par Maestro sur EAS Workflows | Med | Med | Low | 4 | Moderate | Yes | Expo “Run E2E tests on EAS Workflows and Maestro” (févr 2026). citeturn3search11 |
| Releases OTA : utiliser EAS Update avec `runtimeVersion` strict, channels/branches clairs, rollouts/rollbacks | High | Med | Med | 4 | Moderate | Yes | Runtime versions (maj 5 déc 2025) + channels/branches (16 juin 2024) + rollouts (7 juil 2025) + rollbacks (3 mars 2025). citeturn8search2turn8search1turn0search9turn0search13 |
| Secrets : comprendre que “secrets EAS” ne sécurisent pas les valeurs **embarquées dans l’app** | High | Low | Low | 5 | Easy | Yes | EAS env vars : “Secrets do not provide additional security for values you embed in app”. (20 jan 2026) citeturn3search2 |
| Dépendances : exécuter `npx expo-doctor` régulière­ment (intégration React Native Directory) | High | Low | Low | 5 | Easy | Yes | Expo New Architecture + Doctor tooling (jan 2026) + Tools docs. citeturn5search1turn16search3 |
| Upgrade cadence : Expo SDK **incremental, one at a time** ; RN via Upgrade Helper si besoin | High | Med | Med | 4 | Moderate | Yes | Expo “upgrade incrementally” (maj 12 jan 2026) + RN upgrading docs (maj 16 déc 2025). citeturn16search2turn16search1 |

**Solo dev defaults (ce que tu devrais faire “par défaut”)** : `src/app` + feature-first très simple, TypeScript strict + validation runtime, TanStack Query pour server state, SecureStore pour tokens, FlashList/RN perf rules “high impact”, EAS Update discipliné (runtimeVersion + channels), Maestro E2E minimal, `expo-doctor` en gardien de compat. citeturn10view2turn9search1turn8search2turn3search11turn5search1

**Contradiction/point d’attention majeur (2026)** : le monde bascule vers “New Architecture only” (RN 0.82+ ; Expo SDK 55+), mais **SDK 54 reste stable et garde un mode Legacy possible**, ce qui peut créer des divergences (ex : libs “New Arch only” vs app encore en Legacy). Expo indique explicitement que **SDK 54 est la dernière release Expo avec support Legacy** et que **SDK 55 (RN 0.83) va être New Architecture only**. citeturn3search1turn14search7turn3search4

**Sources principales (dates)** : Expo New Architecture guide (23 jan 2026), Expo SDK 54 release notes (10 sept 2025), Expo SDK 55 beta (22 jan 2026), RN 0.84 (11 fév 2026), Expo Router core concepts (maj 22 juil 2025), EAS Update runtime versions (maj 5 déc 2025). citeturn14search7turn3search1turn12search0turn7search22turn10view2turn8search2

## Architecture et scalabilité

### Section A — Ce que disent les sources officielles sur Expo Router

**(Officiel)** Expo Router impose une règle structurante : **tout ce qui est “navigation” est un fichier dans `app/`** (ou `src/app`), et **les composants non-navigation doivent vivre hors `app/`**, sinon Expo Router tentera de les interpréter comme des routes. citeturn10view2  
**(Officiel)** Expo Router supporte explicitement **deux** structures : `app/` au root **ou** `src/app/` (c’est “the only other directory structure that Expo Router will recognize”). citeturn10view2turn1search4  
**(Officiel)** Le fichier `app/_layout.tsx` est la racine : il est rendu avant toute route, et sert à mettre l’init qui vivait avant dans `App.tsx` (chargement fonts, splash, providers, etc.). citeturn10view2turn10view1  
**(Officiel)** Les route groups `(tabs)` permettent d’organiser la navigation sans impacter l’URL ; les fichiers “+” (`+not-found`, `+middleware`, etc.) ont une sémantique spéciale (404, middleware, intents…). citeturn10view2turn10view3

### Section A — Golden approach “solo dev” : feature-first avec frontières simples

**(Opinion d’architecture, alignée avec les contraintes Expo Router)** :  
- garde `src/app/**` **strictement** “navigation & wiring” (routes + layouts) ;  
- mets tout le reste dans `src/features/**` et `src/shared/**` ;  
- impose une règle “imports” : `app → features/shared`, `features → shared`, `shared → shared`.  
Justification : Expo Router réclame la séparation route/non-route ; c’est donc une opportunité pour verrouiller des frontières modulaires sans sur-ingénierie. citeturn10view2turn1search4

**Pattern recommandé (scalable 10 → 100 écrans)** : **feature-first** (vertical slicing) avec sous-dossiers “léger” par feature : `ui/`, `api/`, `model/` (ou `domain/`), `lib/`, `index.ts`.  
- Avantage : le code “bouge ensemble” lors des refactors, et tu limites le couplage inter-features via public APIs.  
- Inconvénient : nécessite une discipline d’exports (index) et un minimum de règles ESLint.  
Ce compromis est particulièrement adapté en solo : faible overhead, forte lisibilité, et enforcement possible via règles d’imports (ex : `no-restricted-imports` / `no-restricted-paths` / boundaries). citeturn18search6turn18search2turn18search1

### Section A — Typage end-to-end : TypeScript strict + validation runtime

**(Officiel)** TypeScript `strict` active toute une famille de checks (garanties plus fortes). citeturn9search1turn9search30  
**(Officiel)** En React Native, le bundling transforme TS via Babel ; il est recommandé d’utiliser `tsc` essentiellement pour le **type checking**. citeturn9search6  
**(Opinion d’architecture)** Pour un produit qui vit 2–5 ans, la combinaison la plus robuste est :  
- `strict: true` + “typecheck en CI” (ne jamais laisser rouges s’accumuler),  
- validation runtime des inputs externes (réponses API, deep links, storage).  
Zod formalise ce besoin : un schéma valide au runtime et fournit une sortie typée. citeturn9search4turn9search11turn9search1

### Section A — Navigation scalable : Expo Router (typed routes, layouts, groups, modals)

**(Officiel)** Les layouts structurent les stacks/tabs/drawers au niveau dossier, et `app/_layout.tsx` est l’endroit où mettre les providers/init. citeturn10view1turn10view2  
**(Officiel)** “All pages have a URL” → deep linking universel ; les groupes `(…)` n’affectent pas l’URL. citeturn10view2  
**(Opinion d’architecture)** Ce qui rend la navigation scalable n’est pas “plus de logique dans Router”, mais l’inverse : centraliser l’init dans `app/_layout.tsx`, puis faire des “route files” minces qui délèguent à des écrans métiers dans `features/**`. (Le fait que Layout remplace `App.tsx` est justement un garde-fou : c’est une couche d’orchestration, pas un endroit pour entasser la logique produit.) citeturn10view2turn10view1

### Section A — State management durable : “server state vs client state” + offline réaliste

**(Officiel TanStack Query)** `onlineManager.setEventListener` a un snippet officiel qui montre l’intégration avec `@react-native-community/netinfo`. citeturn6search0turn6search23  
**(Officiel TanStack Query)** `persistQueryClient` décrit la persistance du cache (throttling des écritures, persisters sync/async). citeturn1search31  

**Contradiction / limite à connaître** : côté “offline mutations”, la doc et l’écosystème montrent que certains scénarios (notamment app tuée/restart) restent délicats ; des retours indiquent des pertes de mutation cache ou des comportements non attendus selon config et version. Recommandation : **ne pas baser un “offline-first sérieux” uniquement sur la promesse “persisted mutations”** sans POC robuste sur tes flows critiques. citeturn1search7turn1search27  

**(Officiel Expo, 2026)** Expo publie désormais une synthèse “local-first” : SQLite est une base de persistance adaptée, et tu peux combiner SQLite avec une couche de state/sync (TinyBase, Yjs, etc.), mais les outils sont encore jeunes et certains problèmes peuvent retomber sur toi. citeturn15view2  
**(Opinion d’architecture, solo-friendly)** Plan offline réaliste en 3 paliers :  
1) “Read-only offline + cache” (TanStack Query persisted + UX offline)  
2) “Write offline simple” (outbox SQLite + retry + idempotence serveur)  
3) “Local-first complet multi-device” (CRDT/Yjs/TinyBase/LiveStore) seulement si le produit l’exige vraiment. citeturn15view2turn1search31

**Sources principales (dates)** : Expo Router core concepts (maj 22 juil 2025), Expo Router layouts (maj ~2025), Expo Router notation (maj 11 nov 2025), TS strict (docs TSConfig), RN TypeScript (pub 2025/2026), TanStack onlineManager (docs), Expo local-first (maj 28 jan 2026). citeturn10view2turn10view1turn10view3turn9search1turn9search6turn6search0turn15view2

## Performance, UX et accessibilité

### Section B — Règles de performance “high impact” (ce que RN met en avant)

**(Officiel RN)** La perf se comprend via les **frames** : 60 FPS → ~16,67 ms par frame ; il faut distinguer **JS frame rate** (thread JS) et **UI frame rate** (thread main). RN explique que des renders coûteux sur le thread JS peuvent figer animations/touches ; et insiste : **dev mode dégrade fortement les perfs**, donc il faut tester en builds release. citeturn13view0  
**(Officiel RN)** Pour profiler sérieusement : iOS → Instruments ; Android → Android Studio Profiler/System Tracing ; et **désactiver le Development Mode**. citeturn13view1

### Section B — Lists/scroll : FlashList et virtualisation

**(Officiel FlashList v2)** FlashList met en avant : “Fast & performant… Swap from FlatList… Build for RN’s new architecture”, et documente explicitement la séparation v2 (new arch) vs v1 (old arch). citeturn13view2  
**(Opinion d’architecture)** Si ton app vise 2–5 ans, assume que les listes vont grossir : adopte FlashList tôt sur les écrans à forte densité (feed, recherche, catalogues). Le coût de migration tardive est souvent plus élevé (rendus, item measurement, key extractors, skeletons). citeturn13view2turn13view0

### Section B — Images/media : expo-image et politiques de cache

**(Officiel Expo Image)** La doc décrit le préchargement et le caching (mémoire/disque) via `prefetch(urls, cachePolicy)` et recommande d’utiliser une policy disque ou mémoire-disque selon les cas. citeturn2search0  
**(Opinion d’architecture)** Règle pratique : évite les images “non dimensionnées” et les “re-renders” qui changent l’URI à chaque render ; standardise un composant `AppImage` (placeholder, cacheKey, resizing) dans `shared/ui`. (Le gain est autant DX que perf : tu réduis les variantes de comportements.) citeturn2search0turn13view0

### Section B — Animations : Reanimated (et le fait que Reanimated 4 est “New Arch only”)

**(Officiel Reanimated)** Reanimated 4.x **ne supporte que la New Architecture** ; la doc de migration et la table de compat rendent cette contrainte explicite. citeturn6search2turn6search35  
**(Opinion d’architecture)** En 2026, c’est un signal fort : dès que tu choisis Reanimated 4, tu assumes New Architecture (ce qui est cohérent avec RN 0.82+ et Expo SDK 55+). La stratégie perf devient : garder animations/gestures hors thread JS le plus possible. citeturn6search2turn13view0

### Section B — Accessibilité : patterns et “testability” via Testing Library

**(Officiel RN)** La doc “Accessibility” rappelle le support VoiceOver/TalkBack et les props/accessibility APIs. citeturn2search2  
**(Officiel Testing Library)** Le principe “éviter les implementation details” est documenté et daté ; en RN, RN docs testing reprennent l’idée (préférer hooks/fonctions pour rendre les tests moins dépendants des internals). citeturn2search3turn2search7  
**(Opinion d’architecture)** Convergence utile : si tu écris des composants “a11y-first” (label/role/hint corrects), **tes tests UI deviennent plus robustes**, car Testing Library encourage les queries orientées “user”. C’est une boucle vertueuse a11y ↔ tests. citeturn2search2turn2search3

**Sources principales (dates)** : RN Performance Overview (maj 16 déc 2025), RN Profiling (maj 17 déc 2025), FlashList v2 (maj 11 fév 2026), Expo Image (versions/latest), Reanimated 4 (docs), RN Accessibility (maj 16 déc 2025), Testing Library (maj 22 jan 2026). citeturn13view0turn13view1turn13view2turn2search0turn6search35turn2search2turn2search3

## New Architecture et compatibilité long terme

image_group{"layout":"carousel","aspect_ratio":"16:9","query":["React Native New Architecture diagram JSI TurboModules Fabric","React Native DevTools screenshot performance panel","Expo New Architecture guide screenshot"],"num_per_query":1}

### Section C — État “OFFICIEL” React Native / Expo en 2026

**(Officiel RN)** RN 0.82 est présenté comme “la première version qui tourne entièrement sur la New Architecture”, et recommande aux apps non migrées de passer d’abord par RN 0.81 / Expo SDK 54 (dernières versions où Legacy est possible) pour faciliter la migration. citeturn3search9  
**(Officiel Expo)** Le guide Expo New Architecture (maj 23 jan 2026) dit explicitement :  
- **SDK 55+ : New Architecture toujours activée, impossible à désactiver** ;  
- **Expo Go : New Architecture uniquement** ;  
- **SDK 54 et avant : Legacy possible**, mais migration nécessaire avant SDK 55. citeturn14search7  
**(Officiel Expo SDK 54)** Expo précise que SDK 54 est la **dernière release** à inclure Legacy Architecture, et préfigure l’écosystème “New Arch only”. citeturn3search1  
**(Officiel RN)** RN 0.84 (11 fév 2026) met **Hermes V1 par défaut**, et continue la suppression du legacy. citeturn7search22

### Section C — Compat libs : la règle “future-proof” la plus fiable en 2026

**(Officiel RN + Expo)** La compat New Architecture est suivie via **React Native Directory**, et Expo Doctor s’y intègre pour valider les dépendances. C’est explicitement recommandé dans le guide Expo New Architecture. citeturn5search1turn14search7  
**(Officiel RN)** Le billet “New Architecture is here” évoque aussi la compatibilité libs et pointe vers reactnative.directory comme source de vérité pratique. citeturn5search31  

**(Opinion d’architecture)** Ta sélection de libs “future-proof” peut être réduite à 5 règles décisionnelles :  
1) **Support New Architecture explicite** (docs/README) ou statut “compatible” dans Directory  
2) Maintien et cadence : support “3 dernières minors RN” (signal courant dans libs majeures)  
3) Éviter les libs “interop-only” si une alternative New-Arch-first existe (surtout pour list/animation)  
4) Préférer Expo Modules / packages Expo quand possible (compat New Arch par défaut + CNG/config plugins)  
5) POC sur tes flows critiques (startup, nav, lists, auth, OTA, offline) avant d’engager un gros refactor. citeturn14search7turn3search1turn6search6turn13view2

### Section C — Matrice RN ↔ Expo et implications (février 2026)

**Fait vérifié** : Expo Go indique SDK 54 “latest”, et `expo` sur npm est en 54.x “latest”, donc **SDK 55 n’est pas stable** au 18 fév 2026. citeturn12search19turn12search18  
**Fait vérifié** : SDK 54 inclut RN 0.81 ; SDK 55 beta inclut RN 0.83.1. citeturn3search1turn12search0  
**Conséquence (opinion)** : en production court terme, ton “baseline stable” = SDK 54 / RN 0.81 ; en long terme, ton “target architecture” = SDK 55+ / RN 0.83+ (New Arch only). Il faut donc : (a) architecturer *comme si* New Arch était la norme, (b) garder un plan de migration pour le passage SDK 55 stable. citeturn14search7turn3search1turn12search0

**Sources principales (dates)** : Expo New Architecture (maj 23 jan 2026), Expo SDK 54 release notes (10 sept 2025), RN 0.82 (8 oct 2025), RN 0.84 (11 fév 2026), RN “About New Architecture / JSI” (maj 15 août 2025), RN “New Architecture is here” (23 oct 2024), Expo Go (SDK 54 latest), npm `expo` (54 latest). citeturn14search7turn3search1turn3search9turn7search22turn4search20turn5search31turn12search19turn12search18

## Qualité, tests, CI/CD et release engineering

### Section D — Tooling “indispensable” (solo, production)

**(Officiel Expo)** Expo Doctor diagnostique santé projet, compat dépendances (React Native Directory), app config sync, etc. citeturn16search3turn5search1  
**(Officiel Expo)** L’app config est au root ; il est déconseillé d’importer `app.json` directement dans le code (préférer `Constants.expoConfig`) et de mettre des secrets dedans. citeturn5search2  
**(Officiel Expo / EAS)** Les environment variables : EAS Build inline `EXPO_PUBLIC_` dans le bundle, et les secrets ne protègent pas ce qui finit embarqué dans l’app. citeturn3search18turn3search2

**(Opinion d’architecture)** “Minimal mais solide” en solo = 4 gardes-fous automatiques :  
1) `typecheck` (TS strict), 2) lint (style + boundaries), 3) tests unit/UI, 4) build check (au moins dev client). La pratique “un PR = un pipeline vert” est la meilleure réduction de charge mentale long terme. citeturn9search1turn16search3turn3search11

### Section D — Enforcer les frontières (lint)

**(Officiel ESLint)** `no-restricted-imports` permet d’interdire certains imports. citeturn18search6  
**(Officiel eslint-plugin-import)** `no-restricted-paths` permet de définir des “zones” interdites (empêcher import cross-boundary). citeturn18search2  
**(Officiel boundaries)** `eslint-plugin-boundaries` formalise l’idée “clean architecture via enforcement de frontières”. citeturn18search1turn18search9

**(Opinion d’architecture)** Pour une app (pas un monorepo Nx), le duo le plus simple est :  
- `no-restricted-imports` pour interdire `src/app/**` depuis `src/features/**`, etc.  
- et/ou `eslint-plugin-boundaries` si tu veux un DSL plus expressif. citeturn18search6turn18search1

### Section D — Stratégie de tests qui survit aux refactors

**(Officiel Expo)** Expo documente Jest via `jest-expo` pour unit/snapshot. citeturn3search15  
**(Officiel Testing Library)** éviter implementation details ; privilégier des tests “user-centric”. citeturn2search3  
**(Officiel React Navigation)** recommandations de test : “test the result, not the action”, éviter de mocker React Navigation. citeturn2search31  
**(Officiel Expo)** E2E sur EAS Workflows avec Maestro : guide dédié (févr 2026). citeturn3search11

**(Opinion d’architecture)** “Survit aux refactors” =  
- Domain logique pure (unit tests)  
- UI réactions/accessibility (RNTL)  
- 3–10 flows E2E Maestro (login, achat, offline, update, onboarding).  
Tu évites de tester l’implémentation interne de tes composants (moins de tests cassants). citeturn2search3turn3search15turn3search11

### Section D — EAS Update : stabilité, compat, rollback

**(Officiel Expo)** `runtimeVersion` garantit la compat native/build vs update ; si le native change, nouvelle build requise. citeturn8search2  
**(Officiel Expo)** Channels vs branches : channels sont dans le code natif (build-time), branches sont une liste ordonnée d’updates ; tu lies channel→branch. citeturn8search1  
**(Officiel Expo)** Il existe docs dédiées rollout/rollback/debug et traçage update/build. citeturn0search9turn0search13turn8search14turn8search30  
**(Officiel Expo)** Code signing E2E existe (plans payants). citeturn8search0turn8search31

**(Opinion d’architecture)** “Solo dev defaults” pour EAS Update :  
- 1 channel `production` + 1 channel `preview` ; branches = `main` (preview) + `release/x.y` (prod) ;  
- `runtimeVersion` = policy stable (souvent `appVersion` ou custom), et **lock** tant que pas de rebuild ;  
- rollouts pour réduire blast radius ; rollback doc comme procédure standard. citeturn8search1turn8search2turn0search9turn0search13

### Section D — Observabilité et sécurité : basiques non négociables

**(Officiel Expo)** Guide “Using Sentry” (intégration dashboard) et page “Monitoring services” listant Sentry. citeturn7search2turn7search9  
**(Officiel RN)** Guide “Security” : Async Storage = non chiffré ; ne pas l’utiliser pour token storage / secrets. citeturn2search37turn4search4  
**(Officiel Expo)** SecureStore chiffre et stocke en sécurité des paires clé/valeur ; attention aux tailles (iOS ~2 KB historiques). citeturn2search1  
**(Officiel EAS)** Les secrets n’ajoutent pas de sécurité à ce qui est embarqué dans l’app. citeturn3search2

**Sources principales (dates)** : Expo Doctor / Tools (jan 2026), Expo config (22 juil 2025), EAS env vars (20 jan 2026), Expo Jest (8 juil 2025), Expo Maestro E2E (févr 2026), EAS Update runtime versions (5 déc 2025), channels/branches (16 juin 2024), rollouts/rollbacks/debug (2025–2026), RN Security (16 déc 2025), Expo SecureStore (versions/latest), Expo Sentry guide (20 déc 2025). citeturn16search3turn5search2turn3search2turn3search15turn3search11turn8search2turn8search1turn8search14turn2search37turn2search1turn7search2

## Monorepo et partage de code

### Section E — Est-ce recommandé en solo ?

**(Officiel Expo)** Expo a un guide “Work with monorepos” (maj 12 jan 2026) et indique un support “first-class” via workspaces (Bun, npm, pnpm, Yarn…). citeturn5search0  
**(Opinion d’architecture)** En solo, un monorepo est recommandé si (et seulement si) :  
- tu as **au moins 2 apps** (consumer + admin, mobile + web) ou  
- tu extrais des packages réellement réutilisés (design system, SDK client, “core”).  
Sinon, le coût (tooling, Metro resolution, CI plus complexe) dépasse souvent le gain. citeturn5search0turn5search7

### Section E — Dépendances natives et CNG (pièges fréquents)

**(Officiel Expo)** CNG / `npx expo prebuild --clean` est présenté comme la voie la plus sûre : `--clean` supprime et régénère les dossiers natifs ; certains plugins ne sont pas idempotents, donc `--clean` est recommandé “in most cases”. citeturn5search7  
**(Officiel Expo)** Les config plugins existent pour personnaliser la génération native. citeturn5search4turn5search2  
**(Opinion d’architecture)** En monorepo :  
- éviter les versions divergentes de `expo`/`react-native` (une seule “truth” au niveau app) ;  
- isoler les packages “pure TS” (pas de natif) ;  
- si tu crées des packages qui touchent au natif, traite-les comme des modules Expo (config plugin + docs internes) pour rester compatible New Architecture. citeturn5search4turn14search7turn5search0

**Sources principales (dates)** : Expo monorepos (12 jan 2026), CNG/prebuild clean (6 jan 2026), config plugins (10 sept 2025). citeturn5search0turn5search7turn5search4

## Livrables actionnables

### Livrable 2 — Golden Architecture

#### Arborescence recommandée (Expo Router + `src/` + feature modules)

```txt
.
├─ app.json / app.config.ts
├─ eas.json
├─ package.json
├─ tsconfig.json
├─ src/
│  ├─ app/                      # ROUTES ONLY (Expo Router)
│  │  ├─ _layout.tsx             # init + providers
│  │  ├─ (tabs)/_layout.tsx
│  │  ├─ (tabs)/index.tsx
│  │  ├─ (auth)/login.tsx
│  │  ├─ +not-found.tsx
│  │  └─ +middleware.ts          # optional (auth/redirect)
│  ├─ features/
│  │  ├─ auth/
│  │  │  ├─ api/                 # client, queries, DTO schemas
│  │  │  ├─ model/               # domain state, use-cases
│  │  │  ├─ ui/                  # screens/components for auth
│  │  │  └─ index.ts             # public API (exports)
│  │  ├─ feed/...
│  │  └─ settings/...
│  ├─ shared/
│  │  ├─ ui/                     # design system primitives
│  │  ├─ lib/                    # utilities (date, money, etc.)
│  │  ├─ config/                 # env parsing, feature flags
│  │  └─ types/                  # cross-feature TS types only
│  ├─ services/
│  │  ├─ api/                    # HTTP client, auth headers
│  │  ├─ analytics/              # wrapper, event schema
│  │  └─ monitoring/             # error reporting
│  └─ test/                      # test helpers, factories
└─ ...
```

**Justification (officiel)** : Expo Router exige que `app/` (ou `src/app`) contienne les routes et recommande de placer le reste du code ailleurs. citeturn10view2turn1search4

#### Conventions d’import

**(Officiel TS)** Utiliser `baseUrl` + `paths` pour des aliases stables (évite `../../..`). citeturn18search4turn18search0  
**(Opinion)** Convention simple : `@/` → `src/`, puis `@/features/auth` n’est importable que via `features/auth/index.ts`.

Exemple `tsconfig.json` (extrait) :

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

#### Règles de frontières (“qui peut importer quoi”)

**Règle de dépendances (à enforce via ESLint)** :  
- `src/app/**` peut importer `src/features/**`, `src/shared/**`, `src/services/**`  
- `src/features/**` peut importer `src/shared/**` + `src/services/**` + **sa propre feature**  
- `src/shared/**` ne peut importer que `src/shared/**`  
- Interdiction d’import cross-feature direct (`features/A` → `features/B`) sauf via API publique stable (event/contract) dans `shared/` ou `services/`.

**Mécanismes d’enforcement (officiel tooling)** : `no-restricted-imports`, `import/no-restricted-paths`, `eslint-plugin-boundaries`. citeturn18search6turn18search2turn18search1

#### Exemple “route file thin vs fat”

**Bad (fat route)**

```tsx
// src/app/(auth)/login.tsx
export default function LoginRoute() {
  // API calls, Zod schemas, state, side-effects, navigation... (trop)
  // ...
  return null;
}
```

**Good (thin route)**

```tsx
// src/app/(auth)/login.tsx
import { LoginScreen } from "@/features/auth";

export default function LoginRoute() {
  return <LoginScreen />;
}
```

**Pourquoi** : Expo Router veut `app/` comme couche navigation (routes/layouts), tandis que les composants non-route doivent vivre ailleurs. citeturn10view2turn10view1

### Livrable 3 — Liste de règles “skill rules” priorisées (60 règles)

> Format : `<priorité> <préfixe>-<nom> — règle courte`

#### CRITICAL (15)

1. **CRITICAL architecture-routes-only** — `src/app/**` = routes/layouts uniquement. citeturn10view2  
2. **CRITICAL architecture-src-app-only** — si `src/` existe, routes dans `src/app` (structure supportée). citeturn10view2turn1search4  
3. **CRITICAL routing-root-layout-is-init** — init/providers uniquement dans `app/_layout.tsx`, pas dans des routes arbitraires. citeturn10view2turn10view1  
4. **CRITICAL routing-thin-routes** — chaque route délègue à un screen feature (pas de logique métier en route). citeturn10view2  
5. **CRITICAL data-runtime-validation** — toute donnée externe (API, deep link, storage) validée runtime (Zod ou équivalent). citeturn9search4  
6. **CRITICAL ts-strict-typecheck-ci** — `strict: true` + `typecheck` obligatoire en CI. citeturn9search1  
7. **CRITICAL state-server-vs-client** — server state via TanStack Query ; global store minimal. citeturn6search0turn1search31  
8. **CRITICAL offline-dont-trust-persisted-mutations-alone** — offline writes critiques via outbox/SQLite, pas uniquement “persist mutations”. citeturn1search7turn15view2  
9. **CRITICAL release-runtimeVersion-required** — EAS Update : `runtimeVersion` doit être défini et stable. citeturn8search2  
10. **CRITICAL release-channels-branches-disciplined** — channels build-time ; branches update-time ; mapping documenté. citeturn8search1  
11. **CRITICAL release-rollout-or-dont-ship-risky** — features risquées → rollout progressif. citeturn0search9  
12. **CRITICAL release-rollback-playbook** — rollback procedure écrite et testée. citeturn0search13  
13. **CRITICAL security-no-tokens-in-asyncstorage** — tokens/secrets jamais en AsyncStorage. citeturn4search4  
14. **CRITICAL security-securestore-for-secrets** — secrets/tokens via SecureStore (taille limitée). citeturn2search1  
15. **CRITICAL compat-expo-doctor-gate** — `npx expo-doctor` régulier ; corriger warnings New Arch. citeturn16search3turn5search1  

#### HIGH (20)

16. **HIGH architecture-public-api-only** — chaque feature expose un `index.ts` et interdit les imports internes. citeturn18search6turn18search2  
17. **HIGH architecture-no-cross-feature-imports** — pas d’import direct feature→feature. citeturn18search2  
18. **HIGH routing-use-route-groups** — organiser `(tabs)`, `(auth)` ; ne pas laisser `app/` flat. citeturn10view2turn10view3  
19. **HIGH routing-plus-files-are-special** — respecter `+not-found`, `+middleware`, etc. citeturn10view3  
20. **HIGH routing-typed-routes-on** — typed routes activé, types générés acceptés. citeturn0search0  
21. **HIGH ts-no-import-appjson** — config via `Constants.expoConfig` plutôt que `import app.json`. citeturn5search2  
22. **HIGH ts-path-aliases** — alias TS stables (baseUrl/paths). citeturn18search4turn18search0  
23. **HIGH data-http-client-centralized** — un seul client HTTP (headers auth, retry, logging). citeturn13view0turn2search37  
24. **HIGH data-zod-dto-per-endpoint** — schéma Zod par endpoint (pas “any”). citeturn9search4  
25. **HIGH state-query-key-conventions** — conventions de keys TanStack Query (préfixes par feature). citeturn1search19  
26. **HIGH state-onlineManager-netinfo** — connecter NetInfo à onlineManager. citeturn6search0turn6search23  
27. **HIGH perf-flashlist-for-feeds** — FlashList sur feeds/listes longues. citeturn13view2  
28. **HIGH perf-measure-release** — perf mesurée en release/profileable, pas dev mode. citeturn13view0turn13view1  
29. **HIGH perf-images-cache-policy** — standardiser cachePolicy/prefetch sur images critiques. citeturn2search0  
30. **HIGH perf-avoid-js-thread-block** — pas de calcul lourd sur thread JS pendant interactions. citeturn13view0  
31. **HIGH testing-testing-library-principles** — tests orientés usage ; éviter internals. citeturn2search3turn2search7  
32. **HIGH testing-expo-jest-baseline** — Jest + jest-expo en baseline. citeturn3search15  
33. **HIGH testing-maestro-smoke-e2e** — 3–10 flows Maestro via EAS Workflows. citeturn3search11  
34. **HIGH release-env-vars-strategy** — `EXPO_PUBLIC_` + secrets EAS ; doc clarifiée. citeturn3search18turn3search2  
35. **HIGH observability-sentry-baseline** — crash + perf monitoring via Sentry (ou équivalent) configuré tôt. citeturn7search2turn7search9  

#### MEDIUM (15)

36. **MEDIUM architecture-service-layer** — `services/**` pour wrappers analytics/logging. citeturn7search9  
37. **MEDIUM routing-screen-options-one-place** — options de screens proches du layout parent (éviter duplication). citeturn9search2turn10view1  
38. **MEDIUM data-persist-query-cache** — persister cache queries (pas forcément mutations). citeturn1search31  
39. **MEDIUM offline-ux-banner** — bannière offline + mode dégradé clair. citeturn15view2turn6search23  
40. **MEDIUM perf-devtools-panel** — utiliser DevTools performance panel / profiling workflow. citeturn7search0turn13view1  
41. **MEDIUM perf-startup-splash-fonts** — init fonts/splash dans root layout, optimiser. citeturn10view1  
42. **MEDIUM a11y-query-by-a11y** — tests UI ciblent labels/roles (a11y). citeturn2search2turn2search3  
43. **MEDIUM security-config-public-check** — `npx expo config --type public` pour vérifier fuite config. citeturn5search2  
44. **MEDIUM release-update-traceability** — log update ID/build ID (debug). citeturn8search30turn8search14  
45. **MEDIUM release-asset-selection** — asset selection pour OTA plus petits (tester). citeturn8search6  
46. **MEDIUM compat-upgrade-one-step** — upgrades Expo “one at a time”. citeturn16search2turn12search8  
47. **MEDIUM compat-rn-upgrade-helper** — utiliser Upgrade Helper RN pour diffs. citeturn16search1turn16search4  
48. **MEDIUM monorepo-only-if-multi-app** — monorepo seulement si vrai besoin. citeturn5search0  
49. **MEDIUM monorepo-cng-clean** — `prebuild --clean` en CI si CNG. citeturn5search7  
50. **MEDIUM state-client-store-selectors** — selectors partout (éviter rerenders stores). citeturn4search2turn4search3  

#### LOW (10)

51. **LOW release-code-signing-enterprise** — activer code signing E2E si threat model le justifie. citeturn8search0turn8search31  
52. **LOW tooling-biome-eval** — évaluer Biome (perf, monorepo) si tu veux simplifier ESLint/Prettier. citeturn18search3turn18search11  
53. **LOW ui-theme-tokens** — tokens design system (couleurs, spacing) dans `shared/ui`. citeturn13view0  
54. **LOW routing-native-intent** — `+native-intent` si intégrations deep links atypiques. citeturn10view3  
55. **LOW data-localization-i18n** — `expo-localization` + lib i18n. citeturn17search3turn17search7  
56. **LOW perf-bytecode-diffing** — surveiller Hermes bytecode diffing (SDK 55 beta). citeturn12search0  
57. **LOW compat-reanimated-versions** — surveiller compat RN versions / Reanimated table. citeturn6search35  
58. **LOW compat-gesture-handler-versions** — suivre table versions GH. citeturn6search32  
59. **LOW storage-mmkv-only-when-needed** — MMKV seulement si besoin de sync + perf (New Arch req.). citeturn4search13turn4search1  
60. **LOW docs-keep-skill-updated** — revalider les “latest” à chaque upgrade Expo SDK. citeturn16search2turn12search8  

### Livrable 4 — Top 25 règles détaillées (bad/good + pièges)

> Pour limiter la longueur, chaque règle a un exemple compact. Les règles sont celles qui font le plus la différence sur 2–5 ans.

#### architecture-routes-only (CRITICAL)

- **But** : empêcher le “router spaghetti”.  
- **Bad** : composants utilitaires dans `src/app/**` → traités comme routes.  
- **Good** : `src/app` = routes ; `src/features`/`src/shared` = code.  
- **Piège** : renommer un dossier “components” sous `app/` → devient route.  
citeturn10view2

#### routing-root-layout-is-init (CRITICAL)

- **Bad** : init fonts/splash/providers dispersée.  
- **Good** : init centralisée dans `app/_layout.tsx`.  
- **Exception** : layouts nested peuvent avoir init locale (ex : tabs provider), mais toujours “navigation-first”.  
citeturn10view1turn10view2

#### routing-thin-routes (CRITICAL)

- **Bad**
```tsx
// route = logique métier
```
- **Good**
```tsx
import { Screen } from "@/features/x";
export default () => <Screen />;
```
- **Piège** : mettre du state global “par facilité” dans une route.  
citeturn10view2

#### routing-typed-routes-on (HIGH)

- **Bad** : strings `router.push("/user/" + id)` partout.  
- **Good** : route types générés, usage cohérent.  
- **Piège** : croire que les types sont “source of truth” alors qu’ils sont générés ; documenter le workflow.  
citeturn0search0

#### architecture-public-api-only (HIGH)

- **Bad**
```ts
import { internal } from "@/features/auth/model/internal";
```
- **Good**
```ts
import { useAuth } from "@/features/auth";
```
- **Piège** : barrel exports trop larges = cycles ; garder l’API petite.  
citeturn18search6turn18search2

#### ts-strict-typecheck-ci (CRITICAL)

- **Bad** : strict off, errors ignorées.  
- **Good** : `strict: true` + job CI `tsc --noEmit`.  
- **Piège** : migrer brutalement ; possible d’activer progressivement, mais viser `strict`.  
citeturn9search1turn9search30

#### data-runtime-validation (CRITICAL)

- **Bad**
```ts
const data: User = await res.json(); // confiance aveugle
```
- **Good**
```ts
const json = await res.json();
const data = UserSchema.parse(json);
```
- **Piège** : oublier validation sur données storage/deep links.  
citeturn9search4turn9search11

#### state-server-vs-client (CRITICAL)

- **Bad** : tout dans un store global.  
- **Good** : TanStack Query pour serveur ; store client pour UI state seulement.  
- **Piège** : “mettre cache API dans store” → duplications/invalidation difficile.  
citeturn1search31turn6search0

#### state-onlineManager-netinfo (HIGH)

- **Bad** : app croit être online, refetch erratique.  
- **Good**
```ts
onlineManager.setEventListener(setOnline =>
  NetInfo.addEventListener(s => setOnline(!!s.isConnected))
);
```
- **Piège** : `isInternetReachable` peut être `null`/instable selon device ; tester.  
citeturn6search0turn6search9turn6search5

#### offline-dont-trust-persisted-mutations-alone (CRITICAL)

- **Bad** : supposer survie des mutations offline après kill app.  
- **Good** : outbox SQLite + retry + idempotence server.  
- **Piège** : complexité conflits ; documenter stratégie.  
citeturn1search7turn15view2turn14search0

#### perf-measure-release (HIGH)

- **Bad** : optimiser en `dev=true`.  
- **Good** : profiler en release/profileable.  
- **Piège** : Perf Monitor in-app = guide seulement ; préférer outils natifs pour mesures exactes.  
citeturn13view0turn13view1turn7search4

#### perf-flashlist-for-feeds (HIGH)

- **Bad** : `ScrollView` pour 2000 items.  
- **Good** : FlashList, item sizing, keyExtractor stable.  
- **Piège** : v2 vs v1 selon architecture (old vs new).  
citeturn13view2turn3search1

#### perf-images-cache-policy (HIGH)

- **Bad** : recharger images à chaque mount, pas de cache policy.  
- **Good** : `prefetch` + cachePolicy standard.  
- **Piège** : comportements edge cases ; tester “uri undefined” & cacheKey.  
citeturn2search0turn2search8

#### perf-reanimated-new-arch-only (HIGH)

- **Bad** : adopter Reanimated 4 sans plan New Arch.  
- **Good** : Reanimated 4 uniquement si New Arch assumée.  
- **Piège** : compat RN versions = table officielle.  
citeturn6search2turn6search35

#### testing-testing-library-principles (HIGH)

- **Bad** : tester state interne, méthodes, impl.  
- **Good** : tester ce que l’utilisateur voit/fait.  
- **Piège** : snapshots “massifs” fragiles ; limiter.  
citeturn2search3turn2search7turn3search15

#### testing-expo-jest-baseline (HIGH)

- **But** : tests rapides pour domain & utils.  
- **Piège** : trop moquer RN → tests inutiles.  
citeturn3search15turn2search7

#### testing-maestro-smoke-e2e (HIGH)

- **But** : 3–10 tests E2E assurant que “l’app marche”.  
- **Piège** : sélecteurs instables ; utiliser accessibilité.  
citeturn3search11turn2search2

#### release-runtimeVersion-required (CRITICAL)

- **Bad** : OTA envoyées à des builds incompatibles.  
- **Good** : runtimeVersion = contrat compat native/update.  
citeturn8search2

#### release-channels-branches-disciplined (CRITICAL)

- **Bad** : confondre channels et branches.  
- **Good** : channel = build-time ; branch = update list ; mapping explicite.  
citeturn8search1

#### release-rollout-or-dont-ship-risky (CRITICAL)

- **But** : réduire blast radius.  
citeturn0search9

#### release-rollback-playbook (CRITICAL)

- **But** : rollback immédiat doc + testé.  
citeturn0search13

#### security-no-tokens-in-asyncstorage (CRITICAL)

- **Bad** : tokens en AsyncStorage (non chiffré).  
- **Good** : SecureStore.  
citeturn4search4turn2search1

#### security-secrets-not-embedded (HIGH)

- **Bad** : penser qu’un secret EAS protège une clé embarquée.  
- **Good** : secret côté build seulement ; rien de sensible dans bundle.  
citeturn3search2turn3search18

#### compat-expo-doctor-gate (CRITICAL)

- **But** : détecter libs incompatibles New Arch et config drift.  
citeturn16search3turn14search7

### Livrable 5 — Checklists

#### Pre-commit checklist (solo dev)

- `pnpm lint` / `npm run lint` (style + frontières) citeturn18search6turn18search2  
- `pnpm typecheck` (`tsc --noEmit`) citeturn9search1turn9search6  
- Tests rapides (unit/UI) citeturn3search15turn2search3  
- `npx expo-doctor` (au moins hebdo, ou avant release/upgrade) citeturn16search3turn5search1  

#### Pre-release checklist

- Build release sur iOS/Android et smoke test (pas Expo Go) citeturn13view0turn14search7  
- Vérifier `runtimeVersion` et mapping channels/branches citeturn8search2turn8search1  
- Vérifier logs d’update/build (traceability) citeturn8search14turn8search30  
- Crash/perf monitoring actif (baseline) citeturn7search2turn7search9  
- A11y smoke : VoiceOver/TalkBack sur 3 écrans clés citeturn2search2  

#### Upgrade checklist (Expo SDK / RN)

- Upgrade Expo **one version at a time** citeturn16search2turn12search8  
- Lire notes SDK (breaking changes) + exécuter `npx expo install --fix` si demandé citeturn16search29turn3search1  
- `npx expo-doctor` et corriger incompat libs New Arch citeturn16search3turn14search7  
- Si bare/native : utiliser “native project upgrade helper” ou RN Upgrade Helper citeturn16search23turn16search1turn16search4  
- Refaire builds dev + release ; revalider EAS Update (runtimeVersion) citeturn8search2turn8search14  

#### Perf checklist (lists/images/animations/startup)

- Mesurer en release/profileable citeturn13view0turn13view1  
- Lists : FlashList sur gros écrans citeturn13view2  
- Images : prefetch + cachePolicy standard citeturn2search0  
- Animations : Reanimated 4 (si New Arch), éviter JS thread jank citeturn6search35turn13view0  
- Startup : réduire init dans root layout, pas de travail lourd sync citeturn10view1turn13view0  

#### A11y checklist

- Chaque élément interactif : label/role/hint pertinents citeturn2search2  
- Tests RNTL : queries orientées accessibilité citeturn2search3turn2search11  
- Vérifier “large text” / dynamic type (manuel) citeturn2search2  

#### Security checklist

- Tokens/secrets : SecureStore, jamais AsyncStorage citeturn4search4turn2search1  
- App config : pas de secrets (et vérifier public config) citeturn5search2  
- EAS secrets : comprendre limites (valeurs embarquées ≠ protégées) citeturn3search2  
- OTA : runtimeVersion strict ; code signing si besoin enterprise citeturn8search2turn8search0  

### Livrable 6 — Compatibility matrix

#### Expo SDK ↔ React Native (état vérifié au 18 fév 2026)

| Expo SDK | Statut | RN ciblé | Legacy possible ? | New Arch obligatoire ? | Sources |
|---|---|---|---|---|---|
| 54 | stable (“latest”) | 0.81 | Oui (dernier SDK avec Legacy) | Non (mais recommandé) | Expo SDK 54 notes (10 sept 2025) + Expo Go “SDK 54 latest” + guide New Arch. citeturn3search1turn12search19turn14search7 |
| 55 | beta/next (pas stable) | 0.83.1 | Non | Oui (SDK 55+ New Arch only) | Expo SDK 55 beta (22 jan 2026) + guide New Arch. citeturn12search0turn14search7 |

#### Libs clés ↔ compat New Architecture / bridgeless

| Lib / domaine | Statut compat New Arch | Notes 2026 | Sources |
|---|---|---|---|
| Reanimated 4 | Yes (New Arch only) | impose New Arch ; table de compat RN versions | citeturn6search2turn6search35 |
| Gesture Handler | Yes | support New Arch depuis 2.3.0, v3 cible RN 0.82+ | citeturn6search11turn6search21turn6search32 |
| FlashList v2 | Yes (New Arch-first) | v2 “built for new architecture”; v1 pour old arch | citeturn13view2 |
| Expo packages `expo-*` | Yes | Expo : `expo-*` support New Arch depuis SDK 53 | citeturn14search7 |
| SecureStore | Yes | stockage chiffré ; limites taille | citeturn2search1turn14search7 |
| AsyncStorage (community) | Partial/Interop | non chiffré ; dépendances via interop si besoin | citeturn4search4turn3search1 |
| MMKV v3 | Yes (New Arch req.) | nécessite TurboModules ; pas de remote debugging Chrome | citeturn4search13turn4search1 |
| expo-updates / EAS Update | Yes | runtimeVersion + channels/branches + debug/rollouts | citeturn8search2turn8search1turn8search14 |
| NetInfo | Yes | intégrer onlineManager | citeturn6search23turn6search0 |
| React Native DevTools | Yes | outil moderne depuis RN 0.76 | citeturn7search1turn7search24 |

### Livrable 7 — Recommended baseline stack (avec alternatives)

**Baseline “solo dev defaults” (2026, Expo SDK 54 stable → path vers SDK 55)**

- **Navigation** : Expo Router (routes dans `src/app`, typed routes). citeturn10view2turn0search0  
- **Server state** : TanStack Query + onlineManager(NetInfo) + persistQueryClient (queries). citeturn6search0turn1search31turn6search23  
- **Client state** : store minimal (Zustand ou Jotai) + selectors (éviter rerenders). citeturn4search2turn4search3  
- **Validation** : Zod (DTO API + inputs externes). citeturn9search4turn9search11  
- **Forms** : React Hook Form + resolvers (Zod). citeturn17search5turn17search0  
- **Storage** :  
  - tokens : SecureStore citeturn2search1  
  - non-sensible small : AsyncStorage (ou SQLite si structure) citeturn4search4turn14search0  
  - perf : MMKV si besoin (New Arch) citeturn4search13  
- **Offline sérieux** : SQLite + outbox (si write offline critique). citeturn15view2turn14search0  
- **Lists** : FlashList v2 (feeds). citeturn13view2  
- **Animations** : Reanimated 4 (si New Arch assumée). citeturn6search35turn14search7  
- **Testing** : Jest (unit) + Testing Library (UI) + Maestro (E2E). citeturn3search15turn2search3turn3search11  
- **Observability** : entity["company","Sentry","error monitoring company"] (crash + perf) via intégration Expo. citeturn7search2turn7search6  
- **CI/CD** : pipeline sur entity["company","GitHub","code hosting company"] (typecheck/lint/tests/build) + EAS Build/Update. citeturn3search5turn8search25turn16search3  
- **i18n** : `expo-localization` + (react-i18next / i18n-js, selon préférence). citeturn17search3turn17search7  

**Sources principales (dates)** : Expo Router core concepts (maj 22 juil 2025), Expo New Architecture (maj 23 jan 2026), Expo Upgrade SDK (maj 12 jan 2026), EAS Update runtime versions (maj 5 déc 2025), Maestro E2E (févr 2026), FlashList (maj 11 fév 2026), Reanimated 4 (docs), RN security (maj 16 déc 2025). citeturn10view2turn14search7turn16search2turn8search2turn3search11turn13view2turn6search35turn4search4

## Décisions, erreurs et plan en sept jours

### Top 10 décisions (les plus importantes)

1) **Structurer `src/app` route-only** et déplacer tout le reste hors routes. citeturn10view2turn1search4  
2) **Forcer des frontières d’imports** (features/shared) avec lint. citeturn18search6turn18search2  
3) **TypeScript strict + typecheck CI**. citeturn9search1turn9search6  
4) **Validation runtime** des données externes (Zod). citeturn9search4turn9search11  
5) **TanStack Query = server state** + onlineManager(NetInfo). citeturn6search0turn6search23  
6) **Plan offline réaliste** (SQLite + outbox si nécessaire). citeturn15view2turn14search0  
7) **EAS Update discipliné** (runtimeVersion + channels/branches + rollback). citeturn8search2turn8search1turn0search13  
8) **Sécu** : tokens/secrets exclusivement SecureStore. citeturn4search4turn2search1  
9) **Perf : mesurer en release**, profiler avec outils natifs. citeturn13view0turn13view1  
10) **Préparer le saut SDK 55 (New Arch only)** dès maintenant (choix libs, doctor). citeturn14search7turn3search1turn16search3  

### Top 10 erreurs à éviter

1) Mettre des composants “helpers” dans `app/` → routes fantômes. citeturn10view2  
2) Laisser la logique métier vivre dans les routes/layouts. citeturn10view1turn10view2  
3) Reporter l’enforcement des imports (ça dérive vite). citeturn18search6turn18search2  
4) Faire de l’offline “magique” en dépendant uniquement des mutations persistées. citeturn1search7turn15view2  
5) Stocker des tokens en AsyncStorage (non chiffré). citeturn4search4  
6) Optimiser la perf en mode dev et conclure “c’est lent”. citeturn13view0  
7) Migrer SDK d’un coup (skip versions) sans isoler les breakages. citeturn16search2  
8) Utiliser des libs “Legacy only” alors que l’écosystème passe New Arch only. citeturn3search1turn6search2turn13view2  
9) Confondre channels et branches EAS Update (déploiements imprévisibles). citeturn8search1  
10) Ne pas outiller la validation compat (`expo-doctor`) avant d’aller en prod. citeturn16search3turn5search1  

### Plan d’implémentation en sept jours (solo dev)

**Jour 1 — Structure & Router** : migrer vers `src/app` + déplacer tout non-route hors `app`. Activer typed routes. citeturn10view2turn1search4turn0search0  
**Jour 2 — Frontières & imports** : introduire `index.ts` par feature + règles ESLint (`no-restricted-imports`/`no-restricted-paths`). citeturn18search6turn18search2  
**Jour 3 — Typage & runtime validation** : `strict: true`, job `typecheck`, Zod sur 1–3 endpoints critiques. citeturn9search1turn9search4  
**Jour 4 — Data layer** : TanStack Query + onlineManager(NetInfo) + conventions query keys. citeturn6search0turn6search23turn1search19  
**Jour 5 — Release discipline** : définir `runtimeVersion` + channels/branches + rollback doc. citeturn8search2turn8search1turn0search13  
**Jour 6 — Tests** : Jest baseline + 10–20 tests UI (Testing Library) + 1 flow Maestro. citeturn3search15turn2search3turn3search11  
**Jour 7 — Perf & observability** : profiler un écran list + images ; intégrer monitoring (Sentry) ; passer `expo-doctor` et corriger warnings. citeturn13view1turn13view2turn2search0turn7search2turn16search3