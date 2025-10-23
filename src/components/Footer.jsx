import React from 'react'

/**
 * Footer.jsx
 * Контакты и прочая "херня".
 * Обнови почту/телефон/ссылки.
 */

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container" style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:20, flexWrap:'wrap'}}>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <img src="/assets/logo.png" alt="logo" style={{height:36}} />
          <div style={{fontSize:14, color:'var(--muted)'}}>Expertika TalkTrack — продукт НОРД</div>
        </div>

        <div style={{textAlign:'right'}}>
          <div style={{fontWeight:700, color:'var(--heading)'}}>Контакты</div>
          <div style={{fontSize:14, color:'var(--muted)'}}>hello@expertika.example</div>
          <div style={{fontSize:12, color:'var(--muted)'}}>© {new Date().getFullYear()} НОРД</div>
        </div>
      </div>
    </footer>
  )
}
