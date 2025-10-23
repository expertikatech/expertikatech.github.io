import React from 'react'

/**
 * Testimonials.jsx
 * Блок отзывов — пока пустой (у тебя нет отзывов).
 * Здесь — плейсхолдер с призывом прислать отзыв.
 */

export default function Testimonials(){
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <h2 className="h2">Отзывы и комментарии</h2>
        <p className="p" style={{maxWidth:860}}>
          Пока отзывов нет — место для ваших первых историй успеха. Как только появятся кейсы, мы сюда подставим реальные фрагменты.
        </p>

        <div style={{marginTop:20}}>
          <div className="feature-card">
            <p className="p"><em>Пока что здесь пусто — оставьте нам обратную связь после внедрения</em></p>
          </div>
        </div>
      </div>
    </section>
  )
}
