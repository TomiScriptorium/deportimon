import React, { useState } from 'react'
import { Sheet } from './Sheet'
import { useData } from '../context/DataContext'
import { todayISO } from '../utils/date'
import { resizeImageToDataUrl } from '../utils/image'
import { parseDecimal } from '../utils/number'
import { CameraIcon } from './icons'

interface Props {
  open: boolean
  onClose: () => void
}

type PhotoSlot = 'photoFront' | 'photoSide' | 'photoBack'

export function AddMeasurementSheet({ open, onClose }: Props) {
  const { addMeasurementEntry } = useData()
  const [date, setDate] = useState(todayISO())
  const [waist, setWaist] = useState('')
  const [thigh, setThigh] = useState('')
  const [photos, setPhotos] = useState<Record<PhotoSlot, string | undefined>>({
    photoFront: undefined,
    photoSide: undefined,
    photoBack: undefined,
  })
  const [busy, setBusy] = useState(false)

  async function handlePhoto(slot: PhotoSlot, file: File | null) {
    if (!file) return
    setBusy(true)
    try {
      const dataUrl = await resizeImageToDataUrl(file)
      setPhotos((prev) => ({ ...prev, [slot]: dataUrl }))
    } finally {
      setBusy(false)
    }
  }

  function save() {
    addMeasurementEntry({
      date,
      waistCm: parseDecimal(waist),
      thighCm: parseDecimal(thigh),
      ...photos,
    })
    setWaist('')
    setThigh('')
    setPhotos({ photoFront: undefined, photoSide: undefined, photoBack: undefined })
    onClose()
  }

  const slots: { key: PhotoSlot; label: string }[] = [
    { key: 'photoFront', label: 'Frente' },
    { key: 'photoSide', label: 'Perfil' },
    { key: 'photoBack', label: 'Espalda' },
  ]

  return (
    <Sheet open={open} onClose={onClose}>
      <h2 style={{ fontSize: 19, fontWeight: 800, marginBottom: 14 }}>Medición mensual</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="field">
          <label>Fecha</label>
          <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div className="field" style={{ flex: 1 }}>
            <label>Cintura (cm)</label>
            <input className="input" inputMode="decimal" value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="—" />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label>Muslo (cm)</label>
            <input className="input" inputMode="decimal" value={thigh} onChange={(e) => setThigh(e.target.value)} placeholder="—" />
          </div>
        </div>
        <div className="field">
          <label>Fotos (opcional)</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {slots.map((s) => (
              <label
                key={s.key}
                style={{
                  aspectRatio: '3/4',
                  borderRadius: 12,
                  background: photos[s.key] ? `center/cover no-repeat url(${photos[s.key]})` : 'var(--bg-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  color: 'var(--text-secondary)',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {!photos[s.key] && (
                  <>
                    <CameraIcon size={18} />
                    {s.label}
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  style={{ display: 'none' }}
                  onChange={(e) => handlePhoto(s.key, e.target.files?.[0] ?? null)}
                />
              </label>
            ))}
          </div>
        </div>
        <button className="btn btn-primary" onClick={save} disabled={busy}>
          {busy ? 'Procesando…' : 'Guardar medición'}
        </button>
      </div>
    </Sheet>
  )
}
