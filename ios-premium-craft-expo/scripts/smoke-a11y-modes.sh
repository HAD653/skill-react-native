#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="${1:-.}"

echo "Accessibility smoke checklist"
echo "Project root: ${PROJECT_ROOT}"
echo "Timestamp: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo
echo "Run these checks on at least one iPhone-sized device and one large display if available."
echo
echo "1) Text scaling"
echo "- Increase text size and verify no clipped labels in critical flows."
echo
echo "2) Bold text"
echo "- Enable bold text and verify hierarchy remains clear."
echo
echo "3) Increase contrast"
echo "- Verify key content and actions remain obvious in both light and dark."
echo
echo "4) Reduce transparency"
echo "- Validate glass or blur surfaces fall back to readable solid materials."
echo
echo "5) Reduce motion"
echo "- Verify heavy motion patterns are reduced or replaced with subtle transitions."
echo
echo "6) Touch targets"
echo "- Validate primary actions remain easy to tap in dense or list-heavy screens."
echo
echo "Suggested evidence to capture:"
echo "- One screenshot per mode for home, primary flow, paywall or upgrade, and settings."
