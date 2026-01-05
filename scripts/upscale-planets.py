#!/usr/bin/env python3
"""
Image Upscaler and Optimizer for Solar System Planets
- Upscales images to 2x resolution for crisp quality
- Converts to WebP for beast mode performance
- Optimizes for mobile-first lazy loading
"""

from PIL import Image
import os

def upscale_and_optimize(input_path, output_path, scale_factor=2, quality=85):
    """
    Upscale image and convert to optimized WebP format.
    
    Args:
        input_path: Path to input PNG file
        output_path: Path to output WebP file
        scale_factor: How much to upscale (2x for crisp quality)
        quality: WebP quality setting (85 is optimal for logos)
    """
    try:
        # Open the image
        img = Image.open(input_path)
        
        # Get original dimensions
        original_width, original_height = img.size
        print(f"📸 Processing: {os.path.basename(input_path)}")
        print(f"   Original size: {original_width}x{original_height}")
        
        # Calculate new dimensions (upscale by 2x for retina/high-DPI displays)
        new_width = original_width * scale_factor
        new_height = original_height * scale_factor
        
        print(f"   Upscaled size: {new_width}x{new_height}")
        
        # Upscale using LANCZOS (high-quality resampling)
        img_upscaled = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Save as WebP with optimization
        # WebP provides excellent compression for logos with transparency
        img_upscaled.save(
            output_path,
            'WEBP',
            quality=quality,
            method=6,  # Maximum compression effort
            lossless=False,  # Slight lossy for better compression, adjust if needed
        )
        
        # Get file sizes for comparison
        original_size = os.path.getsize(input_path)
        optimized_size = os.path.getsize(output_path)
        savings = ((original_size - optimized_size) / original_size) * 100
        
        print(f"   Original: {original_size/1024:.1f} KB")
        print(f"   Optimized: {optimized_size/1024:.1f} KB")
        print(f"   Size reduction: {savings:.1f}%")
        print(f"   ✅ Saved to: {output_path}\n")
        
        return True
        
    except Exception as e:
        print(f"❌ Error processing {input_path}: {e}")
        return False

def main():
    # Define our planetary assets
    planets = [
        {
            'input': '/workspace/the-kareem-crown/public/planet-mtm-monogram.png',
            'output': '/workspace/the-kareem-crown/public/planet-mtm-monogram.webp',
            'name': 'MTM Crown Monogram'
        },
        {
            'input': '/workspace/the-kareem-crown/public/planet-mtm-circuit.png',
            'output': '/workspace/the-kareem-crown/public/planet-mtm-circuit.webp',
            'name': 'MTM Circuit Stacked'
        }
    ]
    
    print("🚀 Starting image upscaling and optimization...\n")
    print("=" * 60)
    
    success_count = 0
    for planet in planets:
        if os.path.exists(planet['input']):
            if upscale_and_optimize(planet['input'], planet['output']):
                success_count += 1
        else:
            print(f"⚠️  File not found: {planet['input']}")
    
    print("=" * 60)
    print(f"✅ Successfully processed {success_count}/{len(planets)} images")
    print("\n📦 Ready for orbital animation!")

if __name__ == '__main__':
    main()
