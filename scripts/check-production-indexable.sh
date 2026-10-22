#!/usr/bin/env bash
# Post-publish check. Run after a production deploy:
#   bash scripts/check-production-indexable.sh
#
# https://timberandlove.com/ and https://www.timberandlove.com/ must not send
# an X-Robots-Tag noindex header and must not include a robots meta tag that
# says noindex. Exits non-zero when either host fails or cannot be fetched.
set -euo pipefail

urls=(
  "https://timberandlove.com/"
  "https://www.timberandlove.com/"
)

fail=0

for url in "${urls[@]}"; do
  body_file=$(mktemp)
  headers_file=$(mktemp)
  if ! curl -sS -D "$headers_file" -o "$body_file" -L --max-redirs 5 --max-time 30 "$url"; then
    echo "FAIL ${url} could not be fetched"
    fail=1
    rm -f "$body_file" "$headers_file"
    continue
  fi

  if grep -qiE '^x-robots-tag:.*noindex' "$headers_file"; then
    echo "FAIL ${url} sends an X-Robots-Tag noindex header"
    fail=1
  else
    echo "PASS ${url} has no X-Robots-Tag noindex header"
  fi

  if python3 - "$body_file" <<'PY'
import re
import sys

html = open(sys.argv[1], encoding="utf-8", errors="replace").read()
for tag in re.findall(r"<meta\b[^>]*>", html, flags=re.I):
    names = re.search(r"\b(?:name|property)\s*=\s*['\"]([^'\"]+)['\"]", tag, flags=re.I)
    content = re.search(r"\bcontent\s*=\s*['\"]([^'\"]+)['\"]", tag, flags=re.I)
    if not names or not content:
        continue
    if names.group(1).lower() in {"robots", "googlebot"} and "noindex" in content.group(1).lower():
        sys.exit(2)
sys.exit(0)
PY
  then
    echo "PASS ${url} has no noindex robots meta tag"
  else
    status=$?
    if [[ "$status" -eq 2 ]]; then
      echo "FAIL ${url} has a noindex robots meta tag"
    else
      echo "FAIL ${url} meta check could not run"
    fi
    fail=1
  fi

  rm -f "$body_file" "$headers_file"
done

exit "$fail"
