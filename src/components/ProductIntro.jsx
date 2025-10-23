import React from 'react'

/**
 * ProductIntro.jsx
 * Блок — "Инфа о продукте": проблемы и цели.
 * Тексты взяты из презентации — ты потом поправишь содержимое.
 */

export default function ProductIntro() {
  return (
    <section className="section" id="product">
      <div className="container">
        <h2 className="h2">Каждое совещание без четкой фиксации — это риск</h2>
        <p className="p" style={{maxWidth:860}}>
          Ключевые мысли из презентации: <strong className="accent">утрата стратегических идей</strong>, решения без ответственности, финансовые потери.
          Expertika TalkTrack устраняет эти проблемы: фиксирует речь, выделяет задачи и ответственных и формирует готовый, стилистически выверенный протокол.
        </p>

        <div style={{marginTop:30}} className="features-grid">
          <div className="feature-card">
            <h3 className="h2" style={{fontSize:18}}>Утрата идей</h3>
            <p className="p">Ключевые идеи и гениальные мысли без фиксации теряются — мы их сохраняем.</p>
          </div>
          <div className="feature-card">
            <h3 className="h2" style={{fontSize:18}}>Решения без ответственности</h3>
            <p className="p">Фиксация задач и ответственных — никаких «мы вроде договорились».</p>
          </div>
          <div className="feature-card">
            <h3 className="h2" style={{fontSize:18}}>Финансовые потери</h3>
            <p className="p">Меньше повторных обсуждений — экономия времени руководителей и бюджета.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
