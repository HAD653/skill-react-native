#!/usr/bin/env bash
set -euo pipefail

ROOT="${1:-.}"
PASS_COUNT=0
WARN_COUNT=0

pass() {
  printf '[PASS] %s\n' "$1"
  PASS_COUNT=$((PASS_COUNT + 1))
}

warn() {
  printf '[WARN] %s\n' "$1"
  WARN_COUNT=$((WARN_COUNT + 1))
}

info() {
  printf '[INFO] %s\n' "$1"
}

if ! command -v rg >/dev/null 2>&1; then
  echo "rg (ripgrep) is required for this script."
  exit 1
fi

if [[ ! -d "$ROOT" ]]; then
  echo "Invalid project root: $ROOT"
  exit 1
fi

info "Audit root: $ROOT"

ROUTES_DIR=""
if [[ -d "$ROOT/src/app" ]]; then
  ROUTES_DIR="$ROOT/src/app"
  pass "Routes directory detected in src/app."
elif [[ -d "$ROOT/app" ]]; then
  ROUTES_DIR="$ROOT/app"
  warn "Routes directory is app/. Prefer src/app for a long-term baseline."
else
  warn "No routes directory found (expected src/app or app)."
fi

if [[ -n "$ROUTES_DIR" ]]; then
  BAD_DIRS="$(find "$ROUTES_DIR" -type d \( -name components -o -name hooks -o -name utils -o -name services -o -name lib \) 2>/dev/null || true)"
  if [[ -n "$BAD_DIRS" ]]; then
    warn "Non-route folders found under routes directory:\n$BAD_DIRS"
  else
    pass "No obvious non-route folders under routes directory."
  fi
fi

if [[ -d "$ROOT/src/features" ]]; then
  pass "Features directory detected."
  while IFS= read -r feature_dir; do
    if [[ ! -f "$feature_dir/index.ts" && ! -f "$feature_dir/index.tsx" ]]; then
      warn "Missing public API file (index.ts/index.tsx) in $(basename "$feature_dir")."
    fi
  done < <(find "$ROOT/src/features" -mindepth 1 -maxdepth 1 -type d | sort)
else
  warn "Missing src/features directory."
fi

if [[ -f "$ROOT/tsconfig.json" ]]; then
  if rg -q '"strict"\s*:\s*true' "$ROOT/tsconfig.json"; then
    pass "TypeScript strict mode enabled."
  else
    warn "TypeScript strict mode not found."
  fi
  if rg -q '"@/\*"\s*:\s*\[\s*"src/\*"\s*\]' "$ROOT/tsconfig.json"; then
    pass "TypeScript path alias @/* -> src/* detected."
  else
    warn "Missing @/* alias to src/* in tsconfig.json."
  fi
else
  warn "Missing tsconfig.json."
fi

if [[ -f "$ROOT/package.json" ]]; then
  if rg -q '"typecheck"\s*:' "$ROOT/package.json"; then
    pass "typecheck script detected in package.json."
  else
    warn "No typecheck script detected in package.json."
  fi
  if rg -q '"lint"\s*:' "$ROOT/package.json"; then
    pass "lint script detected in package.json."
  else
    warn "No lint script detected in package.json."
  fi
  if rg -q 'expo-doctor' "$ROOT/package.json"; then
    pass "expo-doctor command referenced in package scripts."
  else
    warn "expo-doctor is not referenced in package scripts."
  fi
else
  warn "Missing package.json."
fi

if rg -q 'runtimeVersion' "$ROOT/app.json" "$ROOT/app.config.ts" "$ROOT/app.config.js" "$ROOT/app.config.mjs" 2>/dev/null; then
  pass "runtimeVersion detected in app config."
else
  warn "runtimeVersion not found in app config."
fi

if [[ -f "$ROOT/eas.json" ]]; then
  pass "eas.json detected."
else
  warn "Missing eas.json."
fi

ASYNC_TOKEN_HITS="$(rg -n -i 'AsyncStorage.*(token|auth|secret|jwt)|(token|auth|secret|jwt).*AsyncStorage' "$ROOT/src" --glob '*.{ts,tsx,js,jsx}' 2>/dev/null || true)"
if [[ -n "$ASYNC_TOKEN_HITS" ]]; then
  warn "Potential token/secret usage with AsyncStorage:\n$ASYNC_TOKEN_HITS"
else
  pass "No obvious token/secret storage via AsyncStorage found."
fi

if rg -q 'SecureStore|expo-secure-store' "$ROOT/src" "$ROOT/package.json" 2>/dev/null; then
  pass "SecureStore usage/dependency detected."
else
  warn "No SecureStore usage detected."
fi

if rg -q 'onlineManager\.setEventListener|@react-native-community/netinfo|NetInfo' "$ROOT/src" 2>/dev/null; then
  pass "Network online/offline integration hints detected."
else
  warn "No obvious NetInfo + onlineManager integration detected."
fi

if rg -q 'jest-expo|@testing-library/react-native|maestro' "$ROOT/package.json" "$ROOT/.github/workflows" "$ROOT/eas.json" 2>/dev/null; then
  pass "Testing stack hints detected (Jest/RNTL/Maestro)."
else
  warn "No obvious Jest/RNTL/Maestro setup hints detected."
fi

printf '\nSummary: %s PASS, %s WARN\n' "$PASS_COUNT" "$WARN_COUNT"
exit 0

