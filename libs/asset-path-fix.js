/**
 * Asset Path Fix Helper
 * 
 * This helper library ensures that asset URLs are properly normalized to work
 * correctly on GitHub Pages and other hosting environments where the site may
 * be deployed under a subpath (e.g., https://username.github.io/repo-name/).
 * 
 * Problem: Concatenating base paths and filenames without normalization can
 * produce double slashes (e.g., "//heart_normal.glb") or absolute paths that
 * break when the site is under a subpath.
 * 
 * Solution: Use relative paths (without leading slashes) and normalize path
 * segments to prevent double slashes.
 */

(function(global) {
  'use strict';

  /**
   * Normalizes an asset path by properly joining base and path segments.
   * 
   * @param {string} base - The base path (can be empty, relative, or with trailing slash)
   * @param {string} path - The asset path to append
   * @returns {string} A normalized path without double slashes
   * 
   * Examples:
   *   normalizeAssetPath('', 'models/heart.glb') → 'models/heart.glb'
   *   normalizeAssetPath('assets', 'models/heart.glb') → 'assets/models/heart.glb'
   *   normalizeAssetPath('assets/', 'models/heart.glb') → 'assets/models/heart.glb'
   *   normalizeAssetPath('assets/', '/models/heart.glb') → 'assets/models/heart.glb'
   *   normalizeAssetPath('', '/models/heart.glb') → 'models/heart.glb'
   *   normalizeAssetPath('https://example.com/file.glb', '') → 'https://example.com/file.glb'
   */
  function normalizeAssetPath(base, path) {
    // If path is empty or undefined, return base
    if (!path) {
      return base || '';
    }

    // If base is empty or undefined, just clean up the path
    if (!base) {
      // Remove leading slashes to make it relative
      return path.replace(/^\/+/, '');
    }

    // If path is an absolute URL (starts with http:// or https://), return it unchanged
    if (/^https?:\/\//i.test(path)) {
      return path;
    }

    // If base is an absolute URL, return it unchanged
    if (/^https?:\/\//i.test(base)) {
      return base;
    }

    // Remove trailing slashes from base
    base = base.replace(/\/+$/, '');

    // Remove leading slashes from path
    path = path.replace(/^\/+/, '');

    // Join with a single slash
    return base ? base + '/' + path : path;
  }

  // Expose the function globally
  global.normalizeAssetPath = normalizeAssetPath;

  // Also export for module systems if available
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { normalizeAssetPath };
  }

})(typeof window !== 'undefined' ? window : this);
