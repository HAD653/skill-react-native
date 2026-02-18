# Compatibility Matrix (Référence: 18 février 2026)

## Expo SDK <-> React Native

| Expo SDK | Statut | RN ciblé | Legacy possible | New Arch obligatoire |
|---|---|---|---|---|
| 54 | stable (latest au 18/02/2026) | 0.81 | Oui (dernier SDK avec Legacy) | Non |
| 55 | beta/next au 18/02/2026 | 0.83.1 | Non | Oui |

## Libs clés et New Architecture

| Lib / domaine | Compat New Arch | Notes |
|---|---|---|
| Reanimated 4 | Oui (New Arch only) | Exiger target New Arch explicite |
| Gesture Handler | Oui | Suivre table de version selon RN cible |
| FlashList v2 | Oui (New Arch-first) | Utiliser v1 pour old arch |
| `expo-*` packages | Oui | Support New Arch côté Expo |
| SecureStore | Oui | Stockage chiffré, limites de taille |
| AsyncStorage | Partiel/interops | Non chiffré |
| MMKV v3 | Oui (New Arch requis) | TurboModules requis |
| expo-updates / EAS Update | Oui | `runtimeVersion` + channels/branches |
| NetInfo | Oui | Intégrer à onlineManager |
| RN DevTools | Oui | Workflow moderne de debug/perf |

## Implication pratique

- Baseline stable court terme du rapport: Expo SDK 54 / RN 0.81.
- Target long terme: SDK 55+ / RN 0.83+ (New Architecture only).
- Sélectionner les dépendances comme si New Architecture était la norme.

