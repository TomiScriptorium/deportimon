import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { useData } from '../context/DataContext'
import { FIRST_CHECKPOINT_DATE, MINIMAL_SESSION, WEEK_PLAN } from '../data/plan'
import { currentWeekdayLabel, daysBetween, daysSince, greetingForHour, todayISO } from '../utils/date'
import { AddWeightSheet } from '../components/AddWeightSheet'
import { CalendarIcon, ChevronRightIcon, FlameIcon, PlusIcon, ScaleIcon } from '../components/icons'

export function Home() {
  const { profile, weightEntries, sessionLogs } = useData()
  const navigate = useNavigate()
  const [addWeightOpen, setAddWeightOpen] = useState(false)

  const todayLabel = currentWeekdayLabel()
  const todayPlan = WEEK_PLAN.find((d) => d.day === todayLabel) ?? WEEK_PLAN[0]
  const today = todayISO()

  const lastWeight = weightEntries[weightEntries.length - 1]
  const startWeight = profile?.startWeightKg ?? lastWeight?.weightKg ?? 0
  const currentWeight = lastWeight?.weightKg ?? startWeight
  const delta = currentWeight - startWeight

  const daysIntoProgram = profile ? Math.max(daysSince(profile.startDate), 0) : 0
  const daysToCheckpoint = daysBetween(today, FIRST_CHECKPOINT_DATE)

  const sessionDoneToday = useMemo(
    () => sessionLogs.some((s) => s.date === today && s.completed),
    [sessionLogs, today]
  )

  const typeBadge: Record<string, { label: string; className: string }> = {
    fuerza: { label: 'Fuerza', className: 'badge-accent' },
    cardio: { label: 'Cardio', className: 'badge-green' },
    descanso: { label: 'Descanso', className: 'badge-neutral' },
  }

  return (
    <>
      <TopBar title={`${greetingForHour()}${profile ? `, ${profile.name.split(' ')[0]}` : ''}`} subtitle="Deportimon" />
      <div className="page">
        <div className="hero">
          <div className="eyebrow">Hoy · {todayLabel}</div>
          <h2>{todayPlan.label}</h2>
          <p>{todayPlan.detail}</p>
          <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
            {todayPlan.type === 'fuerza' && todayPlan.routineId && (
              <button
                className="btn"
                style={{ background: 'rgba(255,255,255,0.94)', color: 'var(--accent)', flex: 1 }}
                onClick={() => navigate(`/rutina/${todayPlan.routineId}`)}
              >
                {sessionDoneToday ? 'Ver sesión de hoy ✓' : 'Empezar rutina'}
              </button>
            )}
            {todayPlan.type !== 'fuerza' && (
              <button
                className="btn"
                style={{ background: 'rgba(255,255,255,0.94)', color: 'var(--accent)', flex: 1 }}
                onClick={() => navigate('/rutina')}
              >
                Ver plan de la semana
              </button>
            )}
          </div>
        </div>

        <WeekStrip todayLabel={todayLabel} />

        <div className="stat-grid">
          <StatCard icon={<ScaleIcon size={16} />} label="Peso actual" value={`${currentWeight} kg`} />
          <StatCard
            icon={<FlameIcon size={16} />}
            label="Desde inicio"
            value={`${delta > 0 ? '+' : ''}${delta.toFixed(1)} kg`}
          />
          <StatCard icon={<CalendarIcon size={16} />} label="Día del plan" value={`${daysIntoProgram}`} />
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14.5 }}>Próxima medición mensual</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              {daysToCheckpoint > 0
                ? `Faltan ${daysToCheckpoint} días · ${FIRST_CHECKPOINT_DATE}`
                : 'Es hoy o ya pasó: hora de medirte'}
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/progreso')}>
            Ver <ChevronRightIcon size={14} />
          </button>
        </div>

        <div className="section-title">Acciones rápidas</div>
        <div className="card card-tight">
          <button className="list-row" style={{ width: '100%' }} onClick={() => setAddWeightOpen(true)}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: 'var(--accent-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
              }}
            >
              <PlusIcon size={18} />
            </div>
            <div className="list-row-main" style={{ textAlign: 'left' }}>
              <div className="list-row-title">Registrar peso de hoy</div>
              <div className="list-row-sub">Llévalo siempre a la misma hora</div>
            </div>
            <ChevronRightIcon />
          </button>
          <button className="list-row" style={{ width: '100%' }} onClick={() => navigate('/rutina')}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: 'var(--green-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--green)',
              }}
            >
              <PlusIcon size={18} />
            </div>
            <div className="list-row-main" style={{ textAlign: 'left' }}>
              <div className="list-row-title">{MINIMAL_SESSION.title}</div>
              <div className="list-row-sub">{MINIMAL_SESSION.detail}</div>
            </div>
            <ChevronRightIcon />
          </button>
        </div>
      </div>
      <AddWeightSheet open={addWeightOpen} onClose={() => setAddWeightOpen(false)} />
    </>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="stat-card">
      <div style={{ color: 'var(--accent)' }}>{icon}</div>
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </div>
  )
}

function WeekStrip({ todayLabel }: { todayLabel: string }) {
  const colorFor = (type: string) => {
    if (type === 'fuerza') return 'var(--accent)'
    if (type === 'cardio') return 'var(--blue)'
    return 'var(--text-tertiary)'
  }
  return (
    <div className="week-strip">
      {WEEK_PLAN.map((d) => (
        <div key={d.day} className={`week-chip${d.day === todayLabel ? ' today' : ''}`}>
          <span className="day-letter">{d.short}</span>
          <span className="day-dot" style={{ background: colorFor(d.type) }} />
        </div>
      ))}
    </div>
  )
}
