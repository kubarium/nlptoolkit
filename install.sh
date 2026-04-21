#!/usr/bin/env bash
# Install pnpm (if missing) and this project's dependencies.
#
# Usage: ./install.sh   (from anywhere — cds into the repo first)
set -euo pipefail

cd "$(dirname -- "${BASH_SOURCE[0]}")"

trap 'code=$?; echo ""; read -n 1 -s -r -p "Exited (code $code) — press any key to close..."; echo ""' EXIT

if ! command -v pnpm >/dev/null 2>&1; then
    echo "==> pnpm not found, installing pnpm@latest-10 globally via npm"
    npm install -g pnpm@latest-10
fi

echo "==> pnpm install"
pnpm install

echo "==> done — run ./run.sh to start the dev server"
