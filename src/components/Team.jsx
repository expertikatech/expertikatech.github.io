import React from 'react'

/**
 * Team.jsx
 * Блок "Про компанию и команду": кружочки с людьми.
 * Заменить изображения / имена / роли на реальные.
 */

const people = [
  {name:'Иван Петров', role:'CEO', img:'/assets/team/person1.png'},
  {name:'Анна Смирнова', role:'CTO', img:'/assets/team/person1.png'},
  {name:'Мария Ковалёва', role:'Product', img:'/assets/team/person1.png'}
]

export default function Team(){
  return (
    <section className="section" id="team">
      <div className="container">
        <h2 className="h2">Компания и команда</h2>
        <p className="p" style={{maxWidth:820}}>
          Продукт представлен аккредитованной ИТ-компанией "НОРД" — команда инженеров и исследователей с опытом в голосовых технологиях и enterprise-безопасности.
        </p>

        <div style={{marginTop:24}} className="team-grid">
          {people.map((p, idx) => (
            <div className="team-person" key={idx}>
              <img src={p.img} alt={p.name} />
              <div style={{marginTop:10}}>
                <div style={{fontWeight:700, color:'var(--heading)'}}>{p.name}</div>
                <div className="p" style={{fontSize:14, color:'var(--muted)'}}>{p.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
