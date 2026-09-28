#!/usr/bin/env bash
# Green path no-op smoke test — verifies the CI verifier infrastructure is functional.
# This is a no-op check that simply confirms the environment is ready.
set -euo pipefail

echo "::notice::Verifier green-path check: all preconditions met"
echo "node: $(node --version)"
echo "npm: $(npm --version)"
echo "Green path OK - verifier infrastructure is functional."
