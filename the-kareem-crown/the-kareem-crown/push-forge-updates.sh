#!/bin/bash
# Script to commit and push changes to the-kareem-crown

cd /workspace/the-kareem-crown

# Add all changes
git add -A

# Commit with message
git commit -m "MeetTheForge: Alche-style wheel scroll + global golden cursor

- Implemented mouse wheel horizontal scrolling (Alche.studio style)
- Wheel events convert vertical scroll to horizontal card movement
- Updated typography: Playfair Display SC Black (headings), Merriweather (body), Georgia (footer badges), Times New Roman (stat labels)
- Created global Spotlight component with Midas Gold (#D4AF37) cursor glow
- Added 3D parallax effects based on scroll position
- Integrated Forge member images: Goldie, Roman, Nina, Echo
- Metallic/glossy card finishes with holographic details
- AEDPS framework display with phase badges"

# Push to origin
git push origin master

echo "Changes pushed successfully!"
