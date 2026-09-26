import React from 'react'
import { TopBar } from '../components/TopBar'
import { useData } from '../context/DataContext'
import { HABITS_INFO } from '../data/plan'
import { addDays, formatDateShort, todayISO } from '../utils/date'
import { parseDecimal } from '../utils/number'
import { DropIcon, MoonIcon, WalkIcon } from '../components/icons'

export function Habitos() {
  const { habitLogs, upsertHabitLog } = useData()
  const today = todayISO()
  const log = habitLogs[today] ?? { date: today }

  const last7 = Array.from({ length: 7 }).map((_, i) => addDays(today, -6 + i))
  const streak = last7.filter((d) => {
    const l = habitLogs[d]
    return l && (l.sleepHours ?? 0) >= HABITS_INFO.sueno.targetHours
  }).length

  return (
    <>
      <TopBar title="Hábitos" subtitle="Sueño, agua y movimiento" />
      <div className="page">
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14.5 }}>Semana en hábitos de sueño</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              {streak}/7 días con {HABITS_INFO.sueno.targetHours}h o más
            </div>
          </div>
          <div className="week-strip" style={{ display: 'flex', gap: 4 }}>
            {last7.map((d) => {
              const ok = (habitLogs[d]?.sleepHours ?? 0) >= HABITS_INFO.sueno.targetHours
              return (
                <div
                  key={d}
                  title={formatDateShort(d)}
                  style={{
                    width: 8,
                    height: 24,
                    borderRadius: 4,
                    background: ok ? 'var(--green)' : 'var(--bg-secondary)',
                  }}
                />
              )
            })}
          </div>
        </div>

        <div className="section-title">Hoy · {formatDateShort(today)}</div>

        <div className="exercise-card">
          <div className="exercise-head">
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <IconBadge color="var(--blue)"><MoonIcon size={18} /></IconBadge>
              <div>
                <div className="exercise-name">{HABITS_INFO.sueno.title}</div>
                <div className="exercise-cue" style={{ maxWidth: 220 }}>{HABITS_INFO.sueno.detail}</div>
              </div>
            </div>
          </div>
          <div className="field">
            <label>Horas dormidas anoche</label>
            <input
              className="input"
              inputMode="decimal"
              value={log.sleepHours ?? ''}
              onChange={(e) =>
                upsertHabitLog(today, { sleepHours: parseDecimal(e.target.value) })
              }
              placeholder="7"
            />
          </div>
        </div>

        <div className="exercise-card">
          <div className="exercise-head">
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <IconBadge color="var(--accent)"><DropIcon size={18} /></IconBadge>
              <div>
                <div className="exercise-name">{HABITS_INFO.agua.title}</div>
                <div className="exercise-cue" style={{ maxWidth: 220 }}>{HABITS_INFO.agua.detail}</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => upsertHabitLog(today, { waterLiters: Math.max(0, (log.waterLiters ?? 0) - 0.25) })}
            >
              −
            </button>
            <div style={{ flex: 1, textAlign: 'center', fontWeight: 800, fontSize: 18 }}>
              {(log.waterLiters ?? 0).toFixed(2)} L
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}> / {HABITS_INFO.agua.targetLiters} L</span>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => upsertHabitLog(today, { waterLiters: (log.waterLiters ?? 0) + 0.25 })}
            >
              +
            </button>
          </div>
        </div>

        <div className="exercise-card">
          <div className="exercise-head">
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <IconBadge color="var(--green)"><WalkIcon size={18} /></IconBadge>
              <div>
                <div className="exercise-name">{HABITS_INFO.movimiento.title}</div>
                <div className="exercise-cue" style={{ maxWidth: 220 }}>{HABITS_INFO.movimiento.detail}</div>
              </div>
            </div>
          </div>
          <ToggleRow
            label="Caminata después del almuerzo"
            checked={!!log.walkedAfterLunch}
            onChange={(v) => upsertHabitLog(today, { walkedAfterLunch: v })}
          />
          <ToggleRow
            label="Me levanté cada hora / viajé de pie"
            checked={!!log.movedHourly}
            onChange={(v) => upsertHabitLog(today, { movedHourly: v })}
          />
        </div>

        <div className="exercise-card">
          <div className="exercise-head">
            <div>
              <div className="exercise-name">{HABITS_INFO.cardio.title}</div>
              <div className="exercise-cue" style={{ maxWidth: 260 }}>{HABITS_INFO.cardio.detail}</div>
            </div>
          </div>
          <ToggleRow
            label="Hice cardio hoy (bici o cuerda)"
            checked={!!log.cardioDone}
            onChange={(v) => upsertHabitLog(today, { cardioDone: v })}
          />
        </div>
      </div>
    </>
  )
}

function IconBadge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: 10,
        background: 'var(--bg-secondary)',
        color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  )
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '10px 0',
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 600, textAlign: 'left' }}>{label}</span>
      <span
        style={{
          width: 46,
          height: 27,
          borderRadius: 14,
          background: checked ? 'var(--green)' : 'var(--bg-secondary)',
          position: 'relative',
          flexShrink: 0,
          transition: 'background 0.15s ease',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: checked ? 21 : 2,
            width: 23,
            height: 23,
            borderRadius: '50%',
            background: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
            transition: 'left 0.15s ease',
          }}
        />
      </span>
    </button>
  )
}
