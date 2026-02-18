# Checklists Opérationnelles

## Pre-commit (solo dev)

- Lancer `lint` (style + frontières d'import).
- Lancer `typecheck` (`tsc --noEmit`).
- Lancer tests rapides unit/UI.
- Lancer `npx expo-doctor` (au moins hebdo, et avant release/upgrade).

## Pre-release

- Générer une build release iOS/Android et faire un smoke test (pas Expo Go).
- Vérifier `runtimeVersion`.
- Vérifier mapping channels/branches.
- Vérifier traçabilité build/update (IDs + logs).
- Vérifier monitoring crash/perf actif.
- Faire un smoke accessibilité sur 3 écrans clés.

## Upgrade Expo SDK / RN

- Upgrader Expo une version à la fois.
- Lire release notes SDK/RN et appliquer correctifs demandés.
- Lancer `npx expo install --fix` si requis.
- Lancer `npx expo-doctor` et corriger incompatibilités.
- Utiliser Upgrade Helper RN si projet natif/bare.
- Refaire dev build + release build puis revalider OTA.

## Performance

- Mesurer en release/profileable uniquement.
- Appliquer FlashList sur écrans à forte densité.
- Standardiser prefetch/cachePolicy images.
- Eviter calculs lourds sur thread JS pendant interactions.
- Optimiser startup dans `app/_layout.tsx` (pas de travail sync lourd).

## Accessibilité

- Définir label/role/hint pertinents sur éléments interactifs.
- Ecrire tests UI avec queries orientées accessibilité.
- Vérifier large text/dynamic type manuellement.

## Sécurité

- Stocker tokens/secrets avec SecureStore uniquement.
- Ne jamais stocker tokens en AsyncStorage.
- Ne pas exposer de secrets dans app config/bundle.
- Comprendre limites des EAS secrets (build-time, pas protection runtime client).
- Garder `runtimeVersion` strict; évaluer code signing selon threat model.

