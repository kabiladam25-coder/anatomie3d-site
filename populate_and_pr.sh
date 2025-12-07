#!/usr/bin/env bash
set -euo pipefail

# Usage: ./populate_and_pr.sh
# Préconditions:
# - Être dans la racine du dépôt cloné kabiladam25-coder/anatomie3d-site
# - git remote origin configuré et accès push
# - gh CLI installé et authentifié (optionnel, utile pour créer/merger la PR automatiquement)

BRANCH="add/placeholder-models"
SAMPLE_URL="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb"
MODELS_DIR="models"
TMP_SAMPLE="$MODELS_DIR/_sample.glb"
PR_TITLE="Add placeholder GLB models (Avocado) to models/"
PR_BODY=$(cat <<'EOF'
This PR adds placeholder GLB files (copies of the Avocado sample) into the models/ directory
so the site no longer returns 404 for expected model paths.

These are placeholders. Replace them later with real anatomical models.
EOF
)

FILES=(
  "heart_normal.glb"
  "heart_pathologie.glb"
  "lungs_pathologie.glb"
  "lungs_normal.glb"
  "muscles.glb"
  "organs.glb"
  "brain_pathology.glb"
  "skeleton.glb"
)

echo "1) Creating branch ${BRANCH}..."
git fetch origin
git checkout -b "$BRANCH"

echo "2) Downloading sample GLB..."
mkdir -p "$MODELS_DIR"
curl -L --fail -o "$TMP_SAMPLE" "$SAMPLE_URL"

echo "3) Duplicating sample into placeholder files..."
for f in "${FILES[@]}"; do
  cp -f "$TMP_SAMPLE" "$MODELS_DIR/$f"
  echo "  -> $MODELS_DIR/$f"
done
rm -f "$TMP_SAMPLE"

echo "4) Committing files..."
git add "$MODELS_DIR"
git commit -m "Add placeholder GLB models (Avocado) to models/"

echo "5) Pushing branch to origin..."
git push --set-upstream origin "$BRANCH"

if command -v gh >/dev/null 2>&1; then
  echo "6) Creating PR via gh..."
  gh pr create --title "$PR_TITLE" --body "$PR_BODY" --base main --head "$BRANCH" || true
  # Try to find PR number and merge
  PR_NUMBER=$(gh pr list --head "$BRANCH" --json number -q '.[0].number' || true)
  if [[ -n "$PR_NUMBER" ]]; then
    echo "Merging PR #$PR_NUMBER..."
    gh pr merge "$PR_NUMBER" --merge --delete-branch --body "Merge placeholder models for testing."
    echo "PR merged and branch deleted (if permitted)."
  else
    echo "PR created but could not auto-detect number. Please finish PR merge via GitHub UI."
  fi
else
  echo "gh CLI not found. Please create a PR manually from branch $BRANCH to main and merge it."
fi

echo ""
echo "Finished. Wait ~1–2 minutes then verify Pages:"
echo " - Demo: https://kabiladam25-coder.github.io/anatomie3d-site/demo.html"
echo " - Site: https://kabiladam25-coder.github.io/anatomie3d-site/"
