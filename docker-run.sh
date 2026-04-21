#!/usr/bin/env bash
# Build the Docker image and run the app on :3000.
# Foreground: Ctrl+C stops the container; it is auto-removed on exit.
#
# Usage: ./docker-run.sh   (from anywhere — cds into the repo first)
set -euo pipefail

cd "$(dirname -- "${BASH_SOURCE[0]}")"

trap 'code=$?; echo ""; read -n 1 -s -r -p "Exited (code $code) — press any key to close..."; echo ""' EXIT

IMAGE="nlptoolkit"
NAME="nlptoolkit"

echo "==> docker build -t ${IMAGE} ."
docker build -t "${IMAGE}" .

# Remove any previous foreground/detached container with the same name.
docker rm -f "${NAME}" >/dev/null 2>&1 || true

echo "==> docker run -p 3000:3000 (Ctrl+C to stop)"
docker run --rm --name "${NAME}" -p 3000:3000 "${IMAGE}"
