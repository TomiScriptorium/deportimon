import React, { useState } from 'react'
import { useData } from '../context/DataContext'
import { todayISO } from '../utils/date'
import type { UserProfile } from '../types'

const STEPS = ['bienvenida', 'datos', 'medidas', 'listo'] as const

export function Onboarding() {
  const { setProfile, addWeightEntry } = useData()
  const [step, setStep] = useState(0)

  const [name, setName] = useState('')
  const [sex, setSex] = useState<UserProfile['sex']>('hombre')
  const [age, setAge] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [waistCm, setWaistCm] = useState('')
  const [thighCm, setThighCm] = useState('')
  const [goal, setGoal] = useState('Perder grasa de cintura y muslos y ganar fuerza y músculo')

  const canContinueStep1 = name.trim().length > 0 && age && heightCm
  const canContinueStep2 = weightKg

  function finish() {
    const profile: UserProfile = {
      name: name.trim(),
      sex,
      age: Number(age),
      heightCm: Number(heightCm),
      startWeightKg: Number(weightKg),
      startDate: todayISO(),
      waistCm: waistCm ? Number(waistCm) : undefined,
      thighCm: thighCm ? Number(thighCm) : undefined,
      goal: goal.trim(),
      createdAt: new Date().toISOString(),
    }
    setProfile(profile)
    addWeightEntry(profile.startWeightKg, profile.startDate, 'Punto de partida')
  }

  return (
    <div className="onboarding">
      <div className="onboarding-progress">
        {STEPS.map((s, i) => (
          <div key={s} className={`dot${i <= step ? ' active' : ''}`} />
        ))}
      </div>

      {step === 0 && (
        <>
          <h1>Hola 👋<br />Bienvenido a Deportimon</h1>
          <p className="lead">
            Tu app personal de recomposición corporal: rutina de fuerza, videos de cada
            ejercicio, registro de peso y hábitos, todo en un solo lugar.
          </p>
          <div className="onboarding-body">
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Bullet text="3 rutinas de fuerza por semana, con video de cada ejercicio" />
              <Bullet text="Registro de peso y medidas con gráfico de progreso" />
              <Bullet text="Guía de alimentación y hábitos de sueño, agua y cardio" />
            </div>
          </div>
          <div className="onboarding-footer">
            <button className="btn btn-primary" onClick={() => setStep(1)}>
              Empezar
            </button>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h1>Contanos sobre ti</h1>
          <p className="lead">Esto nos ayuda a personalizar tu plan y tu seguimiento.</p>
          <div className="onboarding-body">
            <div className="field">
              <label>¿Cómo te llamas?</label>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
            </div>
            <div className="field">
              <label>Sexo</label>
              <div className="segmented">
                {(['hombre', 'mujer', 'otro'] as const).map((s) => (
                  <button key={s} className={sex === s ? 'active' : ''} onClick={() => setSex(s)}>
                    {s[0].toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div className="field" style={{ flex: 1 }}>
                <label>Edad</label>
                <input className="input" inputMode="numeric" value={age} onChange={(e) => setAge(e.target.value)} placeholder="27" />
              </div>
              <div className="field" style={{ flex: 1 }}>
                <label>Altura (cm)</label>
                <input className="input" inputMode="numeric" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="170" />
              </div>
            </div>
          </div>
          <div className="onboarding-footer">
            <button className="btn btn-secondary" onClick={() => setStep(0)}>Atrás</button>
            <button className="btn btn-primary" disabled={!canContinueStep1} onClick={() => setStep(2)}>
              Continuar
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h1>Tu punto de partida</h1>
          <p className="lead">Anota tus medidas de hoy: son tu línea base para medir el progreso.</p>
          <div className="onboarding-body">
            <div className="field">
              <label>Peso actual (kg)</label>
              <input className="input" inputMode="decimal" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} placeholder="73.3" />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div className="field" style={{ flex: 1 }}>
                <label>Cintura (cm) · opcional</label>
                <input className="input" inputMode="decimal" value={waistCm} onChange={(e) => setWaistCm(e.target.value)} placeholder="—" />
              </div>
              <div className="field" style={{ flex: 1 }}>
                <label>Muslo (cm) · opcional</label>
                <input className="input" inputMode="decimal" value={thighCm} onChange={(e) => setThighCm(e.target.value)} placeholder="—" />
              </div>
            </div>
            <div className="field">
              <label>Tu objetivo</label>
              <input className="input" value={goal} onChange={(e) => setGoal(e.target.value)} />
            </div>
          </div>
          <div className="onboarding-footer">
            <button className="btn btn-secondary" onClick={() => setStep(1)}>Atrás</button>
            <button className="btn btn-primary" disabled={!canContinueStep2} onClick={() => setStep(3)}>
              Continuar
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h1>Todo listo, {name.split(' ')[0]} 🎉</h1>
          <p className="lead">
            Tu plan de 3 sesiones de fuerza por semana ya está cargado, con video de cada
            ejercicio. Vamos a registrar tu progreso mes a mes.
          </p>
          <div className="onboarding-body">
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <SummaryRow label="Nombre" value={name} />
              <SummaryRow label="Edad" value={`${age} años`} />
              <SummaryRow label="Altura" value={`${heightCm} cm`} />
              <SummaryRow label="Peso inicial" value={`${weightKg} kg`} />
            </div>
          </div>
          <div className="onboarding-footer">
            <button className="btn btn-primary" onClick={finish}>
              Entrar a Deportimon
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function Bullet({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: 3,
          background: 'var(--accent)',
          marginTop: 7,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 14.5, lineHeight: 1.4 }}>{text}</span>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{label}</span>
      <span style={{ fontWeight: 700, fontSize: 14 }}>{value}</span>
    </div>
  )
}
