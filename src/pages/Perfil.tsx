import React, { useState } from 'react'
import { TopBar } from '../components/TopBar'
import { useData } from '../context/DataContext'
import { formatDateLong } from '../utils/date'
import { parseDecimal } from '../utils/number'

export function Perfil() {
  const { profile, setProfile, addWeightEntry, theme, setTheme, clearAll } = useData()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(profile?.name ?? '')
  const [age, setAge] = useState(String(profile?.age ?? ''))
  const [heightCm, setHeightCm] = useState(String(profile?.heightCm ?? ''))
  const [startWeightKg, setStartWeightKg] = useState(
    profile?.startWeightKg ? String(profile.startWeightKg) : ''
  )
  const [goal, setGoal] = useState(profile?.goal ?? '')

  if (!profile) return null
  const currentProfile = profile

  function save() {
    const parsedAge = parseDecimal(age)
    const parsedHeight = parseDecimal(heightCm)
    const parsedWeight = parseDecimal(startWeightKg)
    setProfile({
      ...currentProfile,
      name: name.trim() || currentProfile.name,
      age: parsedAge && parsedAge > 0 ? parsedAge : currentProfile.age,
      heightCm: parsedHeight && parsedHeight > 0 ? parsedHeight : currentProfile.heightCm,
      startWeightKg:
        parsedWeight && parsedWeight > 0 ? parsedWeight : currentProfile.startWeightKg,
      goal: goal.trim(),
    })
    if (parsedWeight && parsedWeight > 0) {
      addWeightEntry(parsedWeight, currentProfile.startDate, 'Punto de partida')
    }
    setEditing(false)
  }

  function handleReset() {
    const ok = window.confirm(
      '¿Seguro que quieres borrar todos tus datos? Esta acción no se puede deshacer.'
    )
    if (ok) clearAll()
  }

  return (
    <>
      <TopBar title="Perfil" back />
      <div className="page">
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), #FF8A00)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 22,
              flexShrink: 0,
            }}
          >
            {currentProfile.name.trim()[0]?.toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 17 }}>{currentProfile.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              Desde {formatDateLong(currentProfile.startDate)}
            </div>
          </div>
        </div>

        {!editing ? (
          <div className="card card-tight">
            <Row label="Edad" value={`${currentProfile.age} años`} />
            <Row label="Altura" value={`${currentProfile.heightCm} cm`} />
            <Row
              label="Peso inicial"
              value={
                Number.isFinite(currentProfile.startWeightKg)
                  ? `${currentProfile.startWeightKg} kg`
                  : 'Sin definir — tócame para editar'
              }
            />
            <Row label="Objetivo" value={currentProfile.goal || '—'} />
            <button className="list-row" style={{ width: '100%' }} onClick={() => setEditing(true)}>
              <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: 14.5 }}>Editar datos</span>
            </button>
          </div>
        ) : (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="field">
              <label>Nombre</label>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div className="field" style={{ flex: 1 }}>
                <label>Edad</label>
                <input className="input" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div className="field" style={{ flex: 1 }}>
                <label>Altura (cm)</label>
                <input className="input" inputMode="numeric" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label>Peso inicial (kg)</label>
              <input
                className="input"
                inputMode="decimal"
                placeholder="73.3"
                value={startWeightKg}
                onChange={(e) => setStartWeightKg(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Objetivo</label>
              <input className="input" value={goal} onChange={(e) => setGoal(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setEditing(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={save}>
                Guardar
              </button>
            </div>
          </div>
        )}

        <div className="section-title">Apariencia</div>
        <div className="card">
          <div className="segmented">
            {(['system', 'light', 'dark'] as const).map((t) => (
              <button key={t} className={theme === t ? 'active' : ''} onClick={() => setTheme(t)}>
                {t === 'system' ? 'Sistema' : t === 'light' ? 'Claro' : 'Oscuro'}
              </button>
            ))}
          </div>
        </div>

        <div className="section-title">Datos</div>
        <div className="card">
          <button className="btn btn-block" style={{ color: 'var(--red)', background: 'var(--red-soft)' }} onClick={handleReset}>
            Borrar todos mis datos
          </button>
        </div>

        <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 12, marginTop: 8 }}>
          Deportimon · tu progreso, en un solo lugar
        </div>
      </div>
    </>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="list-row">
      <div className="list-row-main">
        <div className="list-row-sub">{label}</div>
        <div className="list-row-title">{value}</div>
      </div>
    </div>
  )
}
