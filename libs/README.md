# Asset Path Fix Helper

This directory contains the asset path normalization helper for fixing 404 errors on GitHub Pages deployments.

## Problem

When deploying to GitHub Pages under a repository subpath (e.g., `https://username.github.io/repo-name/`), asset URLs can fail with 404 errors due to:

1. **Absolute paths** (e.g., `/models/heart.glb`) that resolve to the domain root instead of the repo root
2. **Double slashes** (e.g., `//heart.glb`) created by improper path concatenation
3. **Leading slashes** that break relative path resolution

## Solution

The `asset-path-fix.js` helper provides a `normalizeAssetPath()` function that:

- Removes leading slashes from paths to make them relative
- Removes trailing slashes from base paths
- Safely joins path segments without creating double slashes
- Preserves absolute URLs unchanged

## Usage

### In HTML files:

```html
<!-- Load the helper -->
<script src="libs/asset-path-fix.js"></script>

<script>
  // Use relative paths directly (recommended)
  const modelPath = 'models/heart_normal.glb';
  
  // Or use the helper for dynamic path construction
  const basePath = 'assets';
  const filename = 'models/heart.glb';
  const fullPath = normalizeAssetPath(basePath, filename);
  // Result: 'assets/models/heart.glb'
</script>
```

### Best Practices:

1. **Always use relative paths** without leading slashes
   - ✅ Good: `"models/heart.glb"`
   - ❌ Bad: `"/models/heart.glb"`
   - ❌ Bad: `"./models/heart.glb"` (works but unnecessary)

2. **Avoid leading dots** in relative paths (they're not needed)
   - ✅ Good: `"models/heart.glb"`
   - 🤔 Works: `"./models/heart.glb"` (but the `./` is redundant)

3. **Use the helper for dynamic path construction**
   - When concatenating base paths and filenames
   - When paths come from configuration or variables

## Testing

Open `asset-path-fix-test.html` in a browser to run the test suite and see examples of how the helper works.

## Files

- `asset-path-fix.js` - The helper library (IIFE that exposes `normalizeAssetPath` globally)
- `asset-path-fix-test.html` - Interactive test page with examples
- `README.md` - This file
