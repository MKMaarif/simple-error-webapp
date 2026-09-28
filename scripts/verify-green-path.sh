#!/usr/bin/env bash
# Green-path no-op smoke test for the verifier
#
# This script confirms the basic project scaffolding is correct
# without exercising any of the intentionally-buggy features.
# Exit 0 = green path (infrastructure is healthy).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "=== Verifier Green-Path Smoke Test ==="
echo "Project root: $PROJECT_DIR"

# 1. Project metadata is readable
if [[ ! -f "$PROJECT_DIR/package.json" ]]; then
  echo "FAIL: package.json not found"
  exit 1
fi
echo "OK: package.json exists"

# 2. Next.js config is present
if [[ ! -f "$PROJECT_DIR/next.config.ts" ]]; then
  echo "FAIL: next.config.ts not found"
  exit 1
fi
echo "OK: next.config.ts exists"

# 3. Expected source directories exist
for dir in app lib; do
  if [[ ! -d "$PROJECT_DIR/$dir" ]]; then
    echo "FAIL: $dir/ directory not found"
    exit 1
  fi
  echo "OK: $dir/ directory exists"
done

# 4. CI workflow definition exists
if [[ ! -f "$PROJECT_DIR/.github/workflows/ci.yml" ]]; then
  echo "FAIL: .github/workflows/ci.yml not found"
  exit 1
fi
echo "OK: CI workflow exists"

echo ""
echo "All green-path checks passed — infrastructure is healthy."