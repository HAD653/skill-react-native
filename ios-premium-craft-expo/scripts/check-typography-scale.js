#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const targetRoot = path.resolve(process.argv[2] || ".");
const extraAllowArg = process.argv.find((arg) => arg.startsWith("--allow="));
const extraAllow = extraAllowArg
  ? extraAllowArg
      .replace("--allow=", "")
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => !Number.isNaN(n))
  : [];

const allowedSizes = new Set([
  11, 12, 13, 14, 15, 16, 17, 20, 22, 24, 28, 34, 40, ...extraAllow,
]);
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
const ignoreFilePattern =
  /(token|tokens|theme|typography|font-scale|design-system|styles\.config)\./i;
const fontSizePattern = /fontSize\s*:\s*(\d+(?:\.\d+)?)/g;

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

function getLineNumber(source, index) {
  return source.slice(0, index).split("\n").length;
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
    if (ignoreFilePattern.test(relPath)) continue;

    const source = fs.readFileSync(file, "utf8");
    if (source.includes("typography-scale-ignore")) continue;

    for (const match of source.matchAll(fontSizePattern)) {
      const value = Number(match[1]);
      if (allowedSizes.has(value)) continue;
      const index = match.index || 0;
      const line = getLineNumber(source, index);
      const lineText = source.split("\n")[line - 1] || "";
      if (lineText.includes("typography-scale-ignore")) continue;

      findings.push({
        file: relPath,
        line,
        value,
        snippet: lineText.trim(),
      });
    }
  }

  if (findings.length === 0) {
    console.log("PASS: no out-of-scale font sizes detected.");
    process.exit(0);
  }

  console.log("FAIL: out-of-scale font sizes detected.");
  for (const finding of findings.slice(0, 200)) {
    console.log(
      `${finding.file}:${finding.line} fontSize=${finding.value} ${finding.snippet}`
    );
  }
  if (findings.length > 200) {
    console.log(`...and ${findings.length - 200} more findings`);
  }
  console.log(
    `Allowed sizes: ${Array.from(allowedSizes).sort((a, b) => a - b).join(", ")}`
  );
  process.exit(1);
}

main();
