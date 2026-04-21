#!/bin/bash
# Source-of-truth copy of the server-side deploy script.
#
# The actual script that runs on deploy lives at /root/deploy.sh on the VPS
# and is locked to the GitHub Actions deploy key via `command="..."` in
# /root/.ssh/authorized_keys.
#
# When this file changes, copy it to the server:
#   scp ops/deploy.sh root@104.247.163.162:/root/deploy.sh
#   ssh root@104.247.163.162 'chmod +x /root/deploy.sh'
set -euo pipefail

REPO_URL='https://github.com/gokhanercan/nlptoolkit.git'
REPO_DIR='/opt/nlptoolkit'
BRANCH='master'
IMAGE='nlptoolkit:latest'
CONTAINER='nlptoolkit'
HOST_PORT='3000'

log() { echo "[deploy] $*"; }

if [ ! -d "$REPO_DIR/.git" ]; then
    log "First run - cloning $REPO_URL to $REPO_DIR"
    git clone "$REPO_URL" "$REPO_DIR"
fi

cd "$REPO_DIR"
log "git fetch + reset --hard origin/$BRANCH"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"
log "HEAD: $(git rev-parse --short HEAD) -- $(git log -1 --pretty=%s)"

log "docker build"
docker build -t "$IMAGE" .

log "swap container"
docker rm -f "$CONTAINER" 2>/dev/null || true
docker run -d --name "$CONTAINER" --restart=unless-stopped -p "${HOST_PORT}:3000" "$IMAGE" >/dev/null

docker ps --filter "name=$CONTAINER" --format '{{.Names}} | {{.Status}} | {{.Ports}}'
log "done"
