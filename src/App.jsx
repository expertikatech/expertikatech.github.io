import React, { useEffect } from 'react'
import Hero from './components/Hero'
import ProductIntro from './components/ProductIntro'
import Features from './components/Features'
import TechStack from './components/TechStack'
import Team from './components/Team'
import Demo from './components/Demo'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import { initScrollEffects } from './hooks/useScrollEffects'

/**
 * App.jsx
 * Главный компонент: собирает страницы и инициализирует эффекты скролла.
 */

export default function App(){
  useEffect(() => {
    // Инициализация анимаций/ScrollTrigger
    // Убедись, что DOM готов — вызываем после mount
    initScrollEffects()
  }, [])

  return (
    <>
      <Hero />
      <main>
        <ProductIntro />
        <Features />
        <TechStack />
        <Team />
        <Demo />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
