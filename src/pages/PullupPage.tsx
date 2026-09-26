import React from 'react'
import { TopBar } from '../components/TopBar'
import { YouTubePlayer } from '../components/YouTubePlayer'
import { PULLUP_BAR_NOTE, PULLUP_PROGRESSION } from '../data/plan'

export function PullupPage() {
  return (
    <>
      <TopBar title="Progresión a dominada" back />
      <div className="page">
        <div className="hero" style={{ background: 'linear-gradient(135deg, var(--purple), #7A3FFF)' }}>
          <div className="eyebrow">Barra de dominadas</div>
          <h2>Tu mejor inversión</h2>
          <p>{PULLUP_BAR_NOTE}</p>
        </div>

        {PULLUP_PROGRESSION.map((stage, i) => (
          <div key={stage.id} className="exercise-card">
            <YouTubePlayer youtubeId={stage.youtubeId} title={stage.title} />
            <div className="exercise-head">
              <div>
                <div className="exercise-name">
                  <span className="badge badge-accent" style={{ marginRight: 8 }}>
                    Paso {i + 1}
                  </span>
                  {stage.title}
                </div>
                <div className="exercise-scheme">{stage.scheme}</div>
              </div>
            </div>
            <div className="exercise-cue">{stage.detail}</div>
          </div>
        ))}

        <div className="card">
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Progresión esperada: hoy probablemente no hagas ninguna dominada completa. La
            primera repetición con agarre supino suele llegar entre 1 y 3 meses. Cuando llegue,
            agrégala al día C y sustituye el remo invertido cuando ya no te rete.
          </p>
        </div>
      </div>
    </>
  )
}
