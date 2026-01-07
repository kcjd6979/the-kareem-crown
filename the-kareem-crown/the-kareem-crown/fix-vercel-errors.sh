#!/bin/bash
# Fix Vercel deployment errors

cd /workspace/the-kareem-crown

# Add all changes
git add -A

# Commit with descriptive message
git commit -m "fix: update Next.js to 14.2.15 (CVE security fix) + remove invalid JSON comment

- Updated Next.js from 14.2.3 to 14.2.15 (patches CVE vulnerabilities)
- Updated React from 18.2.0 to 18.3.1
- Updated eslint-config-next to match Next.js version
- Removed JSON comment from vercel.json (causing parse errors)
- Fixes React Server Components CVE vulnerabilities"

# Push to origin
git push origin master

echo "Fixes pushed! Vercel will auto-deploy."
