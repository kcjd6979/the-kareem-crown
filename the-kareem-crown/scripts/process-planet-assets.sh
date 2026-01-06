#!/bin/bash

# Planet Asset Processing Script
# Upscales, optimizes, and converts planet assets to webp

PLANETS_DIR="/workspace/the-kareem-crown/public/planets"
INPUT_DIR="/workspace/the-kareem-crown/user_input_files"

# Define planet assets to process
declare -A planet_files=(
    ["syn-orb"]="Syn_-_Synapse_Agent_Icon__1_-removebg-preview.png"
    ["midas-orb-1"]="Midas Mailer App Icon - Flux 4k.png"
    ["apex-orb"]="Apex Predator Pipeline Icon 4k.png"
    ["crown-orb"]="crowned 8 brushed metal gold letters 4k.png"
    ["griff-winged"]="griff winged 4k.png"
    ["midas-orb-2"]="FLUX - Midas Mailer Agent Icon .png"
    ["griff-starfire"]="griff starfire 4k.png"
    ["fetti-orb"]="fetti shield icon 4k.png"
)

echo "🚀 Processing Planet Assets..."
echo "================================"

for planet_id in "${!planet_files[@]}"; do
    input_file="${planet_files[$planet_id]}"
    input_path="$INPUT_DIR/$input_file"
    output_path="$PLANETS_DIR/planet-$planet_id.webp"
    
    if [ -f "$input_path" ]; then
        echo "📸 Processing: $input_file"
        
        # Get current dimensions
        dims=$(identify -format "%wx%h" "$input_path" 2>/dev/null)
        echo "   Original: $dims"
        
        # Upscale to minimum 2048px if smaller, or keep 4K if already larger
        # Then convert to optimized webp
        convert "$input_path" \
            -resize 2048x2048\> \
            -background transparent \
            -gravity center \
            -extent 2048x2048 \
            -quality 85 \
            -define webp:lossless=false \
            -define webp:quality=85 \
            -define webp:method=6 \
            "$output_path"
        
        # Get new dimensions
        new_dims=$(identify -format "%wx%h" "$output_path" 2>/dev/null)
        file_size=$(du -h "$output_path" | cut -f1)
        
        echo "   ✅ Output: $new_dims ($file_size)"
        echo "   📁 Saved: planet-$planet_id.webp"
        echo ""
    else
        echo "⚠️  File not found: $input_path"
        echo ""
    fi
done

echo "================================"
echo "✨ Planet asset processing complete!"
echo ""
echo "Generated files:"
ls -lh "$PLANETS_DIR"/*.webp 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}'
