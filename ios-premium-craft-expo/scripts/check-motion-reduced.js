#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const targetRoot = path.resolve(process.argv[2] || ".");
const codeExtensions = new Set([".ts", ".tsx", ".js", ".jsx"]);
const ignoredDirs = new Set([
  ".git",
  "node_modules",
  "ios/build",
  "android/build",
  "android/app/build",
  "dist",
  "build",
  "coverage",
  ".expo",
]);

const animationPattern =
  /\b(withTiming|withSpring|Animated\.timing|Animated\.spring|LayoutAnimation|entering=|exiting=|useSharedValue|MotiView|MotiText|MotiPressable|interpolate)\b/;
const reducedMotionPattern =
  /\b(useReducedMotion|reduceMotion|isReduceMotionEnabled|getReduceMotion|AccessibilityInfo\.isReduceMotionEnabled|shouldReduceMotion)\b/;

function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) continue;
      walk(fullPath, out);
      continue;
    }
    if (!entry.isFile()) continue;
    if (!codeExtensions.has(path.extname(entry.name))) continue;
    out.push(fullPath);
  }
  return out;
}

function main() {
  if (!fs.existsSync(targetRoot)) {
    console.error(`Target path does not exist: ${targetRoot}`);
    process.exit(2);
  }

  const files = walk(targetRoot);
  const findings = [];

  for (const file of files) {
    const relPath = path.relative(targetRoot, file);
    const source = fs.readFileSync(file, "utf8");
    if (source.includes("motion-check-ignore")) continue;

    const hasAnimation = animationPattern.test(source);
    if (!hasAnimation) continue;

    const hasReducedMotionPath = reducedMotionPattern.test(source);
    if (!hasReducedMotionPath) {
      findings.push(relPath);
    }
  }

  if (findings.length === 0) {
    console.log("PASS: animation files include reduced-motion signals.");
    process.exit(0);
  }

  console.log("FAIL: animation usage without reduced-motion signal.");
  for (const file of findings) {
    console.log(file);
  }
  console.log(
    "Add reduce-motion handling or annotate intentional exceptions with motion-check-ignore."
  );
  process.exit(1);
}

main();
