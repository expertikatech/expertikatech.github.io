import React from 'react'

/**
 * Hero.jsx
 * Главный экран — логотип, слоган, фон-видеоролик (размытый).
 * Пометки для замены:
 *   - /assets/logo.png  -> заменить логотип (public/assets/logo.png)
 *   - /assets/cover-video.mp4 -> заменить видео (public/assets/cover-video.mp4)
 *
 * Видео размыт и затемнён, чтобы текст был читаем.
 */

export default function Hero() {
  return (
    <header className="hero">
      {/* Фоновое видео. Путь: public/assets/cover-video.mp4 */}
      <video className="bg-video" autoPlay muted loop playsInline>
        <source src="/assets/cover-video.mp4" type="video/mp4" />
        {/* Если видео отсутствует — можно поставить картинку в фоне */}
      </video>

      <div className="overlay" aria-hidden></div>

      <div className="inner container">
        <img src="/assets/logo.png" alt="Expertika TalkTrack logo" style={{height:64, marginBottom:20}}/>
        <h1 className="h1" style={{color:'#fff', textShadow:'0 6px 24px rgba(8,10,20,0.6)'}}>Стратегическое преимущество в каждом совещании</h1>
        <p className="p" style={{color:'rgba(255,255,255,0.92)', maxWidth:720, margin:'16px auto 24px', fontWeight:300}}>
          ИИ-модератор, который фиксирует, анализирует и превращает диалог в управленческое решение. От записи и транскрибации до готового отчёта — всё локально, безопасно и мгновенно.
        </p>
        <div style={{display:'flex', gap:12, justifyContent:'center'}}>
          <a className="btn" href="#demo">Посмотреть демо</a>
          <a className="btn" href="#contacts" style={{background:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.12)'}}>Запросить демо</a>
        </div>
      </div>
    </header>
  )
}
