#!/bin/bash
# Script to commit and push changes to the-kareem-crown submodule

cd /workspace/the-kareem-crown

# Add all changes
git add -A

# Commit with message
git commit -m "Hero section: Clean logo with Midas Gold glow from brand bible

- Replaced logo with new clean WebP asset (kc-logo-hero.webp)
- Updated drop-shadow to use official Midas Gold #D4AF37
- Fixed .gitignore to properly track public assets"

# Push to origin
git push origin master

echo "Changes pushed successfully!"
