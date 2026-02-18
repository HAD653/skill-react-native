# Golden Architecture (Expo Router + RN)

## Arborescence recommandée

```txt
.
├─ app.json / app.config.ts
├─ eas.json
├─ package.json
├─ tsconfig.json
├─ src/
│  ├─ app/                      # ROUTES ONLY
│  │  ├─ _layout.tsx            # init + providers
│  │  ├─ (tabs)/_layout.tsx
│  │  ├─ (tabs)/index.tsx
│  │  ├─ (auth)/login.tsx
│  │  ├─ +not-found.tsx
│  │  └─ +middleware.ts         # optionnel
│  ├─ features/
│  │  ├─ auth/
│  │  │  ├─ api/
│  │  │  ├─ model/
│  │  │  ├─ ui/
│  │  │  └─ index.ts            # API publique
│  │  ├─ feed/...
│  │  └─ settings/...
│  ├─ shared/
│  │  ├─ ui/
│  │  ├─ lib/
│  │  ├─ config/
│  │  └─ types/
│  ├─ services/
│  │  ├─ api/
│  │  ├─ analytics/
│  │  └─ monitoring/
│  └─ test/
└─ ...
```

## Convention d'imports

- Utiliser `@/*` vers `src/*`.
- Importer une feature uniquement via `features/<name>/index.ts`.
- Eviter les imports internes cross-feature.

Exemple `tsconfig.json`:

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

## Frontières d'import

- `src/app/**` peut importer `features`, `shared`, `services`.
- `src/features/**` peut importer `shared`, `services`, et sa propre feature.
- `src/shared/**` peut importer uniquement `shared`.
- Interdire `features/A -> features/B` en direct.

Utiliser l'un de ces mécanismes:
- `no-restricted-imports`
- `import/no-restricted-paths`
- `eslint-plugin-boundaries`

## Routes thin vs fat

Bad:

```tsx
// src/app/(auth)/login.tsx
export default function LoginRoute() {
  // appels API + logique métier + side effects
  return null;
}
```

Good:

```tsx
// src/app/(auth)/login.tsx
import { LoginScreen } from "@/features/auth";

export default function LoginRoute() {
  return <LoginScreen />;
}
```

