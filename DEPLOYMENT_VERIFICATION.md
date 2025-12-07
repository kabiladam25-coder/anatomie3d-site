# Post-Deployment Verification Checklist

Use this checklist to verify the asset URL fixes are working correctly after deployment to GitHub Pages.

## Prerequisites
- [ ] PR has been merged to main branch
- [ ] GitHub Pages has finished deploying (check Actions tab)

## Verification Steps

### 1. Check Homepage (index.html)
- [ ] Visit: `https://kabiladam25-coder.github.io/anatomie3d-site/`
- [ ] Open Browser DevTools → Network tab
- [ ] Look for requests to GLB files
- [ ] Verify status is **200 OK** (not 404)
- [ ] Check URL format is correct:
  - ✅ Should be: `https://kabiladam25-coder.github.io/anatomie3d-site/models/heart_normal.glb`
  - ❌ Should NOT be: `https://kabiladam25-coder.github.io/models/heart_normal.glb` (missing repo name)
  - ❌ Should NOT contain: `//` (double slashes)
- [ ] Verify 3D heart model displays correctly
- [ ] Test "Normal" tab - should load `models/heart_normal.glb`
- [ ] Test "Pathologie" tab - should load `models/heart_pathologie.glb`

### 2. Check Anatomy Page (anatomie.html)
- [ ] Visit: `https://kabiladam25-coder.github.io/anatomie3d-site/anatomie.html`
- [ ] Open Browser DevTools → Network tab
- [ ] Verify GLB files load with 200 status
- [ ] Check 3D model displays correctly
- [ ] Test both tabs (Normal/Pathologie)

### 3. Check Fixed Example (anatomie-coeur_fixed.html)
- [ ] Visit: `https://kabiladam25-coder.github.io/anatomie3d-site/anatomie-coeur_fixed.html`
- [ ] Open Browser DevTools → Console
- [ ] Should see: `Test HEAD models/heart_normal.glb true`
- [ ] Should see: `GLB chargé : models/heart_normal.glb`
- [ ] Should NOT see: 404 errors
- [ ] Verify both 3D model and image texture load

### 4. Test Helper Library
- [ ] Visit: `https://kabiladam25-coder.github.io/anatomie3d-site/libs/asset-path-fix-test.html`
- [ ] Verify all 10 tests pass (green checkmarks)
- [ ] Check test summary shows: "Passed: 10 | Failed: 0"

### 5. Browser Console Checks
Open console on each page and verify:
- [ ] No 404 errors for model files
- [ ] No JavaScript errors
- [ ] No warnings about failed resource loads

## Expected URLs (Correct Format)

When viewing Network tab, GLB files should load from:
```
https://kabiladam25-coder.github.io/anatomie3d-site/models/heart_normal.glb
https://kabiladam25-coder.github.io/anatomie3d-site/models/heart_pathologie.glb
```

## Common Issues & Solutions

### Issue: Still seeing 404 errors
**Solution:** 
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check that the `models/` directory contains the actual GLB files
- Verify GitHub Pages is serving from the correct branch

### Issue: Double slashes in URLs (//)
**Solution:**
- This shouldn't happen with the fixes, but if it does, verify the HTML uses paths without leading slashes
- Example: Use `"models/file.glb"` not `"/models/file.glb"`

### Issue: Models not displaying
**Solution:**
- Check console for errors
- Verify Three.js and GLTFLoader are loading correctly
- Check model files are actually in the `models/` directory

## Manual Testing Alternative

If you don't have the actual GLB files yet:

1. Create empty placeholder files:
```bash
mkdir -p models
touch models/heart_normal.glb
touch models/heart_pathologie.glb
```

2. Commit and push to verify paths resolve correctly (you'll see 200 responses even though files are empty)

3. The Network tab will show 200 responses instead of 404, confirming paths are correct

## Success Criteria

✅ All checks passed when:
- All GLB file requests return 200 status
- No double slashes (//) in any URLs
- 3D models display correctly on all pages
- Console shows no 404 errors
- Helper library tests all pass

## Need Help?

If issues persist:
1. Check the `ASSET_FIX_SUMMARY.md` for detailed explanation of changes
2. Review the `libs/README.md` for usage guidelines
3. Verify the actual model files exist in the `models/` directory
4. Check GitHub Pages settings are correct (serving from main branch, root folder)
