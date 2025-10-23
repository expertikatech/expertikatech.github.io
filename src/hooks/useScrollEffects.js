/**
 * useScrollEffects.js
 * Хук отвечает за регистрация анимаций GSAP ScrollTrigger.
 * Здесь — базовые эффекты: появление секций, лёгкий параллакс для видео, акценты.
 *
 * Установка: gsap и ScrollTrigger уже в package.json.
 *
 * Примечание: мы экспортируем функцию initScrollEffects, которую вызываем из App.jsx
 * после монтирования компонента.
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initScrollEffects() {
  // Плавный вход для всех секций
  gsap.utils.toArray('.section').forEach((section) => {
    gsap.from(section, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })
  })

  // Лёгкий параллакс для фона видео в Hero
  const heroVideo = document.querySelector('.hero .bg-video')
  if (heroVideo) {
    gsap.to(heroVideo, {
      scale: 1.12,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6
      }
    })
  }

  // Подсветка заголовков при входе
  gsap.utils.toArray('.h2').forEach((h) => {
    gsap.from(h, {
      y: 12,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: h,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    })
  })

  // Можно добавить другие ScrollTriggers для отдельных блоков (например,
  // анимированные диаграммы, прогресс-бары и т. п.)
}
