import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { YouTubePlayer } from '../components/YouTubePlayer'
import { ROUTINES } from '../data/plan'
import { useData } from '../context/DataContext'
import { todayISO } from '../utils/date'
import { makeId } from '../utils/id'
import type { ExerciseSetLog, RoutineId, SessionLog } from '../types'
import { CheckIcon } from '../components/icons'

function parseSetCount(scheme: string): number {
  const match = scheme.match(/^(\d+)/)
  return match ? Number(match[1]) : 3
}

export function RoutineDetail() {
  const { routineId } = useParams<{ routineId: string }>()
  const navigate = useNavigate()
  const { sessionLogs, upsertSessionLog } = useData()
  const routine = ROUTINES.find((r) => r.id === routineId)
  const today = todayISO()

  const existingLog = useMemo(
    () => sessionLogs.find((s) => s.date === today && s.routineId === routineId),
    [sessionLogs, today, routineId]
  )

  const [entries, setEntries] = useState<Record<string, ExerciseSetLog>>(() => {
    const map: Record<string, ExerciseSetLog> = {}
    existingLog?.entries.forEach((e) => (map[e.exerciseId] = e))
    return map
  })
  const [completed, setCompleted] = useState(existingLog?.completed ?? false)

  if (!routine) {
    return (
      <>
        <TopBar title="Rutina" back />
        <div className="page">
          <div className="empty-state">No encontramos esta rutina.</div>
        </div>
      </>
    )
  }

  function persist(nextEntries: Record<string, ExerciseSetLog>, nextCompleted = completed) {
    const log: SessionLog = {
      id: existingLog?.id ?? makeId(),
      date: today,
      routineId: routineId as RoutineId,
      entries: Object.values(nextEntries),
      completed: nextCompleted,
    }
    upsertSessionLog(log)
  }

  function toggleSet(exerciseId: string, setIndex: number) {
    const current = entries[exerciseId]?.setsCompleted ?? 0
    const nextCount = current === setIndex + 1 ? setIndex : setIndex + 1
    const next = {
      ...entries,
      [exerciseId]: { ...entries[exerciseId], exerciseId, setsCompleted: nextCount },
    }
    setEntries(next)
    persist(next)
  }

  function setWeight(exerciseId: string, weightKg: number | undefined) {
    const next = {
      ...entries,
      [exerciseId]: { ...entries[exerciseId], exerciseId, setsCompleted: entries[exerciseId]?.setsCompleted ?? 0, weightKg },
    }
    setEntries(next)
    persist(next)
  }

  const totalSets = routine.exercises.reduce((acc, ex) => acc + parseSetCount(ex.scheme), 0)
  const doneSets = Object.values(entries).reduce((acc, e) => acc + (e.setsCompleted ?? 0), 0)
  const allDone = doneSets >= totalSets

  return (
    <>
      <TopBar title={routine.title} subtitle={`${routine.day} · ${routine.subtitle}`} back />
      <div className="page">
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14.5 }}>Progreso de hoy</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              {doneSets} / {totalSets} series completadas
            </div>
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: allDone ? 'var(--green-soft)' : 'var(--bg-secondary)',
              color: allDone ? 'var(--green)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            {Math.round((doneSets / totalSets) * 100)}%
          </div>
        </div>

        {routine.exercises.map((ex) => {
          const setCount = parseSetCount(ex.scheme)
          const doneCount = entries[ex.id]?.setsCompleted ?? 0
          return (
            <div key={ex.id} className="exercise-card">
              <YouTubePlayer youtubeId={ex.youtubeId} title={ex.name} />
              <div className="exercise-head">
                <div>
                  <div className="exercise-name">{ex.name}</div>
                  <div className="exercise-scheme">{ex.scheme}</div>
                </div>
              </div>
              {ex.cue && <div className="exercise-cue">💡 {ex.cue}</div>}
              <div className="set-tracker">
                {Array.from({ length: setCount }).map((_, i) => (
                  <button
                    key={i}
                    className={`set-dot${i < doneCount ? ' done' : ''}`}
                    onClick={() => toggleSet(ex.id, i)}
                  >
                    {i < doneCount ? <CheckIcon size={15} /> : `Serie ${i + 1}`}
                  </button>
                ))}
              </div>
              <div className="field">
                <label>Peso usado (kg) · opcional</label>
                <input
                  className="input"
                  inputMode="decimal"
                  placeholder="Ej: 13"
                  value={entries[ex.id]?.weightKg ?? ''}
                  onChange={(e) => setWeight(ex.id, e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>
          )
        })}

        <button
          className="btn btn-primary"
          onClick={() => {
            setCompleted(true)
            persist(entries, true)
            navigate('/')
          }}
        >
          {completed ? 'Sesión marcada como completa ✓' : 'Marcar sesión como completa'}
        </button>
      </div>
    </>
  )
}
