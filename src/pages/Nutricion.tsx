import React from 'react'
import { TopBar } from '../components/TopBar'
import { NUTRITION_SLOTS, NUTRITION_TARGET, NUTRITION_TIPS } from '../data/plan'

export function Nutricion() {
  return (
    <>
      <TopBar title="Nutrición" subtitle="Sin contar calorías, por porciones" />
      <div className="page">
        <div className="hero" style={{ background: 'linear-gradient(135deg, var(--green), #17A64B)' }}>
          <div className="eyebrow">Objetivo diario</div>
          <h2>{NUTRITION_TARGET.kcal}</h2>
          <p>
            {NUTRITION_TARGET.proteina} · {NUTRITION_TARGET.gasto}
          </p>
        </div>
        <div className="card">
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{NUTRITION_TARGET.note}</p>
        </div>

        <div className="section-title">Tu día de comidas</div>
        <div className="card card-tight">
          {NUTRITION_SLOTS.map((slot) => (
            <div key={slot.time} className="list-row">
              <div className="list-row-main">
                <div className="list-row-title">{slot.title}</div>
                <div className="list-row-sub">{slot.detail}</div>
              </div>
              <span className="badge badge-green" style={{ flexShrink: 0 }}>
                {slot.time}
              </span>
            </div>
          ))}
        </div>

        <div className="section-title">Consejos clave</div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {NUTRITION_TIPS.map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span className="badge badge-green" style={{ flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 13.5, lineHeight: 1.4 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
