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
  ".next",
]);

const ignoreFilePattern =
  /(token|tokens|theme|palette|semantic-colors|design-system|styles\.config)\./i;
const rawColorPattern =
  /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b|rgba?\s*\(|hsla?\s*\(/g;

function isIgnoredDir(dirName) {
  return ignoredDirs.has(dirName);
}

function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (isIgnoredDir(entry.name)) continue;
      walk(fullPath, out);
      continue;
    }
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name);
    if (!codeExtensions.has(ext)) continue;
    out.push(fullPath);
  }
  return out;
}

function getLineNumber(source, index) {
  return source.slice(0, index).split("\n").length;
}

function scanFile(filePath) {
  const relPath = path.relative(targetRoot, filePath);
  if (ignoreFilePattern.test(relPath)) return [];

  const text = fs.readFileSync(filePath, "utf8");
  const findings = [];

  for (const match of text.matchAll(rawColorPattern)) {
    const index = match.index || 0;
    const lineNumber = getLineNumber(text, index);
    const line = text.split("\n")[lineNumber - 1] || "";

    if (line.includes("no-raw-colors-check-ignore")) continue;
    if (line.includes("PlatformColor(") || line.includes("DynamicColorIOS(")) continue;

    findings.push({
      file: relPath,
      line: lineNumber,
      value: match[0],
      snippet: line.trim(),
    });
  }

  return findings;
}

function main() {
  if (!fs.existsSync(targetRoot)) {
    console.error(`Target path does not exist: ${targetRoot}`);
    process.exit(2);
  }

  const files = walk(targetRoot);
  let findings = [];

  for (const file of files) {
    findings = findings.concat(scanFile(file));
  }

  if (findings.length === 0) {
    console.log("PASS: no raw colors detected outside token or theme files.");
    process.exit(0);
  }

  console.log("FAIL: raw color usage detected.");
  for (const finding of findings.slice(0, 200)) {
    console.log(
      `${finding.file}:${finding.line} raw="${finding.value}" ${finding.snippet}`
    );
  }
  if (findings.length > 200) {
    console.log(`...and ${findings.length - 200} more findings`);
  }
  process.exit(1);
}

main();
