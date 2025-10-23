import React from 'react'

/**
 * TechStack.jsx
 * Кратко про инфраструктуру и техническую сторону.
 * Здесь — тезисно: локальная установка, интеграции, API, SDK, варианты развёртывания.
 */

export default function TechStack(){
  return (
    <section className="section" id="tech">
      <div className="container">
        <h2 className="h2">Про инфраструктуру и безопасность</h2>
        <p className="p" style={{maxWidth:900}}>
          Expertika TalkTrack — это on-prem решение, которое разворачивается в закрытом контуре заказчика. Нет внешних API, данные не покидают периметр.
          Поддерживаемые интеграции: таск-менеджеры, календарь, корпоративные хранилища — через локальные коннекторы и API.
        </p>

        <div style={{marginTop:20, display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
          <div className="feature-card">
            <h3 className="h2" style={{fontSize:18}}>Развёртывание</h3>
            <p className="p">Docker / K8s — варианты для разного масштаба инфраструктуры.</p>
          </div>
          <div className="feature-card">
            <h3 className="h2" style={{fontSize:18}}>Интеграции</h3>
            <p className="p">Возможность передачи задач в Jira, Trello, internal task systems (через локальные коннекторы).</p>
          </div>
          <div className="feature-card">
            <h3 className="h2" style={{fontSize:18}}>Конфиденциальность</h3>
            <p className="p">Политика «no-cloud by default», данные под полным контролем заказчика.</p>
          </div>
          <div className="feature-card">
            <h3 className="h2" style={{fontSize:18}}>Настраиваемый анализ</h3>
            <p className="p">Шаблоны отчётов и правила анализа — настраиваются под специфику встреч.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
