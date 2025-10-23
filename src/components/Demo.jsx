import React from 'react'

/**
 * Demo.jsx
 * Мини-демонстрация: продублированный видеоролик (опционально)
 * Пометка: при желании можно заменить превью на iframe с модальным плеером.
 * Видео-путь: /assets/demo-video.mp4 (public/assets/demo-video.mp4)
 */

export default function Demo(){
  return (
    <section className="section" id="demo">
      <div className="container">
        <h2 className="h2">Мини-демонстрация</h2>
        <p className="p" style={{maxWidth:820}}>Краткий ролик показывает, как TalkTrack транскрибирует разговор и формирует отчет.</p>

        <div style={{marginTop:24}} className="video-wrap">
          <video controls playsInline>
            <source src="/assets/demo-video.mp4" type="video/mp4" />
            Тег video не поддерживается вашим браузером. Замените путь в public/assets/demo-video.mp4.
          </video>
        </div>
      </div>
    </section>
  )
}
