#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const targetRoot = path.resolve(process.argv[2] || ".");
const threshold = 44;
const codeExtensions = new Set([".tsx", ".jsx", ".ts", ".js"]);
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

const touchComponentPattern =
  /<(Pressable|TouchableOpacity|TouchableHighlight|TouchableWithoutFeedback|Button)\b[\s\S]{0,260}?style=\{\{[\s\S]{0,260}?(minHeight|minWidth|height|width)\s*:\s*(\d+(?:\.\d+)?)/g;
const styleBlockPattern = /([A-Za-z0-9_]+)\s*:\s*\{[\s\S]{0,260}?\}/g;
const sizePattern = /(minHeight|minWidth|height|width)\s*:\s*(\d+(?:\.\d+)?)/g;
const touchKeyPattern = /(button|press|touch|cta|pill|tab|segment|chip)/i;

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

function scanInlineTouchables(source, relPath) {
  const findings = [];
  for (const match of source.matchAll(touchComponentPattern)) {
    const value = Number(match[3]);
    if (Number.isNaN(value) || value >= threshold) continue;

    const line = getLineNumber(source, match.index || 0);
    findings.push({
      file: relPath,
      line,
      rule: match[2],
      value,
      note: "Inline style on touchable component appears below 44.",
    });
  }
  return findings;
}

function scanStyleBlocks(source, relPath) {
  const findings = [];
  for (const blockMatch of source.matchAll(styleBlockPattern)) {
    const styleName = blockMatch[1];
    if (!touchKeyPattern.test(styleName)) continue;

    const blockText = blockMatch[0];
    for (const sizeMatch of blockText.matchAll(sizePattern)) {
      const value = Number(sizeMatch[2]);
      if (Number.isNaN(value) || value >= threshold) continue;

      const absoluteIndex = (blockMatch.index || 0) + (sizeMatch.index || 0);
      const line = getLineNumber(source, absoluteIndex);
      findings.push({
        file: relPath,
        line,
        rule: sizeMatch[1],
        value,
        note: `Style "${styleName}" appears to define a tap target below 44.`,
      });
    }
  }
  return findings;
}

function scanFile(filePath) {
  const relPath = path.relative(targetRoot, filePath);
  const source = fs.readFileSync(filePath, "utf8");
  if (source.includes("touch-target-check-ignore")) return [];

  return [
    ...scanInlineTouchables(source, relPath),
    ...scanStyleBlocks(source, relPath),
  ];
}

function main() {
  if (!fs.existsSync(targetRoot)) {
    console.error(`Target path does not exist: ${targetRoot}`);
    process.exit(2);
  }

  const files = walk(targetRoot);
  let findings = [];
  for (const file of files) findings = findings.concat(scanFile(file));

  if (findings.length === 0) {
    console.log("PASS: no touch-target issues detected by static heuristics.");
    process.exit(0);
  }

  console.log(`FAIL: possible touch-target values below ${threshold}.`);
  for (const finding of findings.slice(0, 200)) {
    console.log(
      `${finding.file}:${finding.line} ${finding.rule}=${finding.value} ${finding.note}`
    );
  }
  if (findings.length > 200) {
    console.log(`...and ${findings.length - 200} more findings`);
  }
  process.exit(1);
}

main();
