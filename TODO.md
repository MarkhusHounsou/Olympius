# TODO: Fix GitHub Pages deployment for Olympius

## Steps
- [x] 1. Analyze project structure and identify root cause (basePath 404 issue)
- [x] 2. Update `app.json` to set `web.baseUrl` to `/Olympius/`
- [x] 3. Update `package.json` `deploy` script to build web export before deploying
- [x] 4. Add `public/404.html` for SPA-friendly routing
- [x] 5. Build the web export and verify output
- [x] 5b. Create `scripts/fix-basepath.js` to fix absolute asset paths (Expo SDK 53 doesn't apply baseUrl to bundle)
- [x] 5c. Update `server.js` to serve app under `/Olympius/` base path with SPA fallback
- [x] 5d. Verify local server serves all paths with HTTP 200
- [ ] 6. Deploy to gh-pages
- [ ] 7. Verify deployment
