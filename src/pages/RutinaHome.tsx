import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import {
  BAR_LOADING_TABLE,
  CARDIO_VIDEOS,
  EQUIPMENT_NOTES,
  MINIMAL_SESSION,
  PROGRESSION_TIPS,
  ROUTINES,
  WEEK_PLAN,
} from '../data/plan'
import { currentWeekdayLabel } from '../utils/date'
import { ChevronRightIcon } from '../components/icons'
import { YouTubePlayer } from '../components/YouTubePlayer'

export function RutinaHome() {
  const navigate = useNavigate()
  const todayLabel = currentWeekdayLabel()

  return (
    <>
      <TopBar title="Rutina" subtitle="3 sesiones de fuerza por semana" />
      <div className="page">
        <div className="section-title">Semana tipo</div>
        <div className="card card-tight">
          {WEEK_PLAN.map((d) => (
            <div key={d.day} className="list-row">
              <div className="list-row-main">
                <div className="list-row-title">
                  {d.day} {d.day === todayLabel && <span className="badge badge-accent" style={{ marginLeft: 6 }}>Hoy</span>}
                </div>
                <div className="list-row-sub">{d.detail}</div>
              </div>
              {d.routineId ? (
                <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/rutina/${d.routineId}`)}>
                  {d.label}
                </button>
              ) : (
                <span className="badge badge-neutral">{d.label}</span>
              )}
            </div>
          ))}
        </div>

        <div className="section-title">Rutinas de fuerza</div>
        <div className="card card-tight">
          {ROUTINES.map((r) => (
            <button key={r.id} className="list-row" style={{ width: '100%' }} onClick={() => navigate(`/rutina/${r.id}`)}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'var(--accent-soft)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {r.id}
              </div>
              <div className="list-row-main" style={{ textAlign: 'left' }}>
                <div className="list-row-title">{r.title} · {r.day}</div>
                <div className="list-row-sub">{r.subtitle} · {r.exercises.length} ejercicios</div>
              </div>
              <ChevronRightIcon />
            </button>
          ))}
          <button className="list-row" style={{ width: '100%' }} onClick={() => navigate('/rutina/dominadas')}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'var(--purple)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 15,
                flexShrink: 0,
                opacity: 0.85,
              }}
            >
              🎯
            </div>
            <div className="list-row-main" style={{ textAlign: 'left' }}>
              <div className="list-row-title">Progresión a dominada</div>
              <div className="list-row-sub">De colgarte a tu primera dominada supina</div>
            </div>
            <ChevronRightIcon />
          </button>
        </div>

        <div className="section-title">Sesión mínima (días complicados)</div>
        <div className="exercise-card">
          <div>
            <div className="exercise-name">{MINIMAL_SESSION.title}</div>
            <div className="exercise-cue">{MINIMAL_SESSION.detail}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MINIMAL_SESSION.exercises.map((ex) => (
              <div key={ex.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{ex.name}</span>
                <span className="badge badge-accent">{ex.scheme}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section-title">Cardio suave</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {Object.values(CARDIO_VIDEOS).map((c) => (
            <div key={c.youtubeId} className="exercise-card">
              <div className="exercise-name">{c.name}</div>
              <YouTubePlayer youtubeId={c.youtubeId} title={c.name} />
            </div>
          ))}
        </div>

        <div className="section-title">Cómo progresar con poco peso</div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PROGRESSION_TIPS.map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span className="badge badge-accent" style={{ flexShrink: 0 }}>{i + 1}</span>
              <span style={{ fontSize: 13.5, lineHeight: 1.4 }}>{tip}</span>
            </div>
          ))}
        </div>

        <div className="section-title">Cargas en la barra</div>
        <div className="card">
          <table className="simple-table">
            <thead>
              <tr>
                <th>Barra</th>
                <th>Discos/lado</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {BAR_LOADING_TABLE.map((row, i) => (
                <tr key={i}>
                  <td>{row.bar}</td>
                  <td>{row.plates}</td>
                  <td style={{ color: 'var(--accent)' }}>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {EQUIPMENT_NOTES.map((n, i) => (
            <p key={i} style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {n}
            </p>
          ))}
        </div>
      </div>
    </>
  )
}
