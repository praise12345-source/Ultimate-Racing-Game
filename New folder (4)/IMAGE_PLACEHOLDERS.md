# Image Placeholders Guide

This document lists all the image placeholders in the game where you can insert your custom images.

## Image Directory Structure
Create an `images` folder in the root directory and place all your images there:
```
New folder (4)/
├── images/
│   ├── logo.png                    (Loading screen logo)
│   ├── menu-logo.png               (Main menu logo)
│   ├── menu-background.png         (Main menu background)
│   ├── car-preview.png             (Car preview on loading screen)
│   ├── sponsor1.png                (Sponsor logo 1)
│   ├── sponsor2.png                (Sponsor logo 2)
│   ├── sponsor3.png                (Sponsor logo 3)
│   ├── garage-background.png       (Garage page background)
│   ├── garage-header.png           (Garage page header)
│   ├── profile-background.png      (Profile page background)
│   ├── profile-header.png          (Profile page header)
│   ├── settings-background.png     (Settings page background)
│   └── settings-header.png         (Settings page header)
├── index.html
├── loading.html
├── ultimate_racing_game.html
└── ...
```

## Image Placeholders by File

### 1. `index.html` (Main Menu)
- **Line ~108**: `images/menu-background.png` - Background image for the main menu
  - Recommended size: 1920x1080px or larger
  - Should be semi-transparent or dark to maintain text readability
  
- **Line ~112**: `images/menu-logo.png` - Main game logo for the menu
  - Recommended size: 500-800px width
  - Should be PNG with transparency

### 2. `loading.html` (Loading Screen)
- **Line ~45**: `images/logo.png` - Game logo shown during loading
  - Recommended size: 400-600px width
  - Should be PNG with transparency
  
- **Line ~120**: `images/car-preview.png` - Car preview image during loading
  - Recommended size: 300-500px width
  - Shows a preview of a car from your game
  
- **Lines ~135-137**: `images/sponsor1.png`, `images/sponsor2.png`, `images/sponsor3.png` - Sponsor logos
  - Recommended size: 40px height, auto width
  - Place your sponsor/partner logos here

### 3. `garage.html` (Garage Page)
- **Line ~147**: `images/garage-background.png` - Background for garage page
  - Recommended size: 1920x1080px
  - Optional: Can be added to enhance the garage page
  
- **Line ~151**: `images/garage-header.png` - Header logo/image for garage page
  - Recommended size: 400-600px width
  - Optional: Header image/logo specific to the garage section

### 4. `profile.html` (Profile Page)
- **Line ~149**: `images/profile-background.png` - Background for profile page
  - Recommended size: 1920x1080px
  - Optional: Can be added to enhance the profile page
  
- **Line ~153**: `images/profile-header.png` - Header logo/image for profile page
  - Recommended size: 400-600px width
  - Optional: Header image/logo specific to the profile section

### 5. `settings.html` (Settings Page)
- **Line ~118**: `images/settings-background.png` - Background for settings page
  - Recommended size: 1920x1080px
  - Optional: Can be added to enhance the settings page
  
- **Line ~122**: `images/settings-header.png` - Header logo/image for settings page
  - Recommended size: 400-600px width
  - Optional: Header image/logo specific to the settings section

## Image Format Recommendations

- **Format**: PNG (for logos with transparency) or JPG (for backgrounds)
- **Logo images**: PNG with transparency, 72-150 DPI
- **Background images**: JPG or PNG, 72-150 DPI
- **File size**: Optimize images to keep loading times fast
  - Logos: < 500KB
  - Backgrounds: < 2MB
  - Car previews: < 1MB

## How to Add Images

1. Create the `images` folder in your project root directory
2. Add your images with the exact filenames listed above
3. The code will automatically use your images
4. If an image is missing, the code will gracefully fall back to text/emoji alternatives

## Notes

- All image tags include `onerror` handlers that hide the image if it fails to load
- The game will work perfectly fine without any images - they're optional enhancements
- You can use any image format (PNG, JPG, SVG, WebP) as long as the browser supports it
- For best results, use PNG for logos and JPG for backgrounds

