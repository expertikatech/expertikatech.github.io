import React from 'react'

/**
 * CTA.jsx
 * Триггер-призыв: попробовать продукт, запросить демо, написать нам.
 */

export default function CTA(){
  return (
    <section className="section" id="cta">
      <div className="container" style={{textAlign:'center'}}>
        <h2 className="h2">Готовы управлять встречами осознанно?</h2>
        <p className="p" style={{maxWidth:800, margin:'8px auto 20px'}}>
          Запросите демо или напишите нам — покажем работоспособность в вашем окружении и поможем с развёртыванием.
        </p>

        <div style={{display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap'}}>
          <a className="btn" href="#contacts">Запросить демо</a>
          <a className="btn" href="mailto:hello@expertika.example" style={{background:'transparent', color:'var(--heading)', border:'1px solid rgba(69,62,122,0.12)'}}>Написать нам</a>
        </div>
      </div>
    </section>
  )
}
