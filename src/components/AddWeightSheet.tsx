import React, { useState } from 'react'
import { Sheet } from './Sheet'
import { useData } from '../context/DataContext'
import { todayISO } from '../utils/date'
import { parseDecimal } from '../utils/number'

interface Props {
  open: boolean
  onClose: () => void
}

export function AddWeightSheet({ open, onClose }: Props) {
  const { addWeightEntry } = useData()
  const [weight, setWeight] = useState('')
  const [date, setDate] = useState(todayISO())

  function save() {
    const n = parseDecimal(weight)
    if (!n || n <= 0) return
    addWeightEntry(n, date)
    setWeight('')
    onClose()
  }

  return (
    <Sheet open={open} onClose={onClose}>
      <h2 style={{ fontSize: 19, fontWeight: 800, marginBottom: 14 }}>Registrar peso</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="field">
          <label>Peso (kg)</label>
          <input
            className="input"
            inputMode="decimal"
            autoFocus
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="72.8"
          />
        </div>
        <div className="field">
          <label>Fecha</label>
          <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={save}>
          Guardar
        </button>
      </div>
    </Sheet>
  )
}
