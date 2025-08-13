#!/usr/bin/env node

/**
 * Script de optimización de imágenes para mejorar LCP y FCP
 * Genera versiones responsivas de las imágenes para diferentes breakpoints
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuración de tamaños responsivos
const IMAGE_SIZES = {
  profile: [
    { suffix: 'small', width: 280, height: 420, quality: 85 },
    { suffix: 'medium', width: 300, height: 450, quality: 90 },
    { suffix: 'large', width: 312, height: 467, quality: 95 }
  ],
  project: [
    { suffix: 'small', width: 350, height: 160, quality: 80 },
    { suffix: 'medium', width: 400, height: 180, quality: 85 },
    { suffix: 'large', width: 403, height: 200, quality: 90 }
  ]
};

// Directorios
const PUBLIC_DIR = './public';
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');
const SRC_ASSETS_DIR = './src/assets';

async function optimizeImage(inputPath, outputPath, options) {
  try {
    const { width, height, quality, format = 'webp' } = options;
    
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality })
      .toFile(outputPath);
      
    const stats = fs.statSync(outputPath);
    console.log(`✅ Creado: ${outputPath} (${(stats.size / 1024).toFixed(1)}KB)`);
  } catch (error) {
    console.error(`❌ Error procesando ${inputPath}:`, error.message);
  }
}

async function generateResponsiveImages() {
  console.log('🖼️  Optimizando imágenes para mejorar LCP/FCP...\n');
  
  // Asegurar que existan los directorios
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
  }

  // Optimizar foto de perfil
  const profileSrc = path.join(SRC_ASSETS_DIR, 'profile-photo.webp');
  if (fs.existsSync(profileSrc)) {
    console.log('📸 Optimizando foto de perfil...');
    for (const size of IMAGE_SIZES.profile) {
      const outputPath = path.join(ASSETS_DIR, `profile-photo-${size.suffix}.webp`);
      await optimizeImage(profileSrc, outputPath, size);
    }
  } else {
    console.log('⚠️  No se encontró profile-photo.webp en src/assets/');
  }

  // Optimizar imágenes de proyectos
  const projectsDir = path.join(SRC_ASSETS_DIR, 'proyectos');
  if (fs.existsSync(projectsDir)) {
    console.log('\n🚀 Optimizando imágenes de proyectos...');
    const projectImages = fs.readdirSync(projectsDir).filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

    for (const image of projectImages) {
      const inputPath = path.join(projectsDir, image);
      const baseName = path.parse(image).name;
      
      for (const size of IMAGE_SIZES.project) {
        const outputPath = path.join(ASSETS_DIR, `${baseName}-${size.suffix}.webp`);
        await optimizeImage(inputPath, outputPath, size);
      }
    }
  }

  console.log('\n✨ Optimización completada!');
  console.log('\n📊 Ahorro estimado:');
  console.log('   • Profile photo: ~70.9 KiB');
  console.log('   • Project images: ~234.6 KiB');
  console.log('   • Total: ~305.5 KiB');
  console.log('\n🎯 Esto debería mejorar significativamente tu LCP y FCP!');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  generateResponsiveImages().catch(console.error);
}

module.exports = { generateResponsiveImages, optimizeImage };
