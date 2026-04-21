#!/usr/bin/env bash
# Run the Nuxt dev server on :3000 (hot reload).
# Non-Docker; expects `./install.sh` to have been run first.
#
# Usage: ./run.sh   (from anywhere — cds into the repo first)
set -euo pipefail

cd "$(dirname -- "${BASH_SOURCE[0]}")"

# Keep the window open after exit (success, error, or Ctrl+C) so errors stay visible.
trap 'code=$?; echo ""; read -n 1 -s -r -p "Exited (code $code) — press any key to close..."; echo ""' EXIT

pnpm dev
