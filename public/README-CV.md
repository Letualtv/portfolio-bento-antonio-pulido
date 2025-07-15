# 📄 INSTRUCCIONES PARA EL CV

## Ubicación del CV
Para que funcione la descarga del CV, coloca tu archivo PDF en la carpeta `public/` con el nombre `cv-antonio-pulido.pdf`

## Ruta completa
```
c:\Users\IESA\Desktop\otros proyectos\Porfolio\portfolio-bento\public\cv-antonio-pulido.pdf
```

## Especificaciones del archivo
- **Formato**: PDF
- **Nombre**: `cv-antonio-pulido.pdf` (exactamente así)
- **Peso**: Recomendado menos de 5MB para descarga rápida
- **Versión**: Asegúrate de que sea la versión más actualizada

## ¿Cómo funciona?
1. El usuario hace clic en "Descargar CV"
2. El sistema busca el archivo en `/public/cv-antonio-pulido.pdf`
3. Si existe, inicia la descarga automática
4. Si no existe, muestra un mensaje informativo

## Nombre del archivo descargado
Cuando el usuario descargue tu CV, se guardará como:
`CV-Antonio-Pulido-FullStack-Developer.pdf`

## Información actualizada de perfiles
✅ **LinkedIn**: https://www.linkedin.com/in/antoniopulidof/
✅ **GitHub**: https://github.com/Letualtv
✅ **IESA-CSIC**: https://www.iesa.csic.es/directorio/antonio-pulido/
✅ **Email**: antonio.pulido@iesa.csic.es

## Alternativa si usas otro nombre
Si prefieres usar otro nombre para tu CV, actualiza la línea en HeroSection.vue:
```javascript
link.href = '/tu-nombre-de-cv.pdf'
```
