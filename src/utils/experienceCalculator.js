/**
 * Calcula la experiencia profesional desde una fecha específica
 */
export function calculateExperience() {
  const startDate = new Date('2024-03-01') // Inicio de prácticas en Fundación MEDAC
  const currentDate = new Date()
  
  // Experiencia total: 
  // - Prácticas MEDAC: Marzo-Junio 2024 (4 meses)
  // - IESA-CSIC: Octubre 2024 - Actualidad
  // Calculamos desde marzo para obtener experiencia total acumulada
  const yearsDiff = currentDate.getFullYear() - startDate.getFullYear()
  const monthsDiff = currentDate.getMonth() - startDate.getMonth()
  let totalMonths = yearsDiff * 12 + monthsDiff
  
  // Ajustar por el gap de Julio-Septiembre (sin contar estos 3 meses)
  if (totalMonths > 4) {
    totalMonths = totalMonths - 3 // Restar el gap entre trabajos
  }
  
  // Si son menos de 12 meses, devolver meses
  if (totalMonths < 12) {
    return {
      value: `${totalMonths}+`,
      unit: 'meses',
      unitEn: 'months'
    }
  }
  
  // Si es más de un año, calcular años con decimales
  const years = Math.floor(totalMonths / 12)
  const remainingMonths = totalMonths % 12
  
  if (remainingMonths === 0) {
    return {
      value: `${years}+`,
      unit: 'años',
      unitEn: 'years'
    }
  } else if (remainingMonths < 6) {
    return {
      value: `${years}+`,
      unit: 'años',
      unitEn: 'years'
    }
  } else {
    return {
      value: `${years}.2+`,
      unit: 'años',
      unitEn: 'years'
    }
  }
}

/**
 * Obtiene el texto formateado de experiencia
 */
export function getExperienceText(language = 'es') {
  const exp = calculateExperience()
  
  if (language === 'en') {
    return {
      value: exp.value,
      label: `Years of experience`
    }
  }
  
  // Español
  if (exp.unit === 'meses') {
    return {
      value: exp.value,
      label: 'Meses de experiencia'
    }
  } else {
    return {
      value: exp.value,
      label: 'Años de experiencia'
    }
  }
}
