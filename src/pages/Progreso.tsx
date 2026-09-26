import React, { useMemo, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { TopBar } from '../components/TopBar'
import { useData } from '../context/DataContext'
import { AddWeightSheet } from '../components/AddWeightSheet'
import { AddMeasurementSheet } from '../components/AddMeasurementSheet'
import { EXPECTATIONS, EXPECTATIONS_NOTE, FIRST_CHECKPOINT_DATE, TRACKING_NOTE } from '../data/plan'
import { formatDateShort, daysBetween, todayISO } from '../utils/date'
import { PlusIcon, TrashIcon } from '../components/icons'

export function Progreso() {
  const { weightEntries, deleteWeightEntry, measurementEntries, profile } = useData()
  const [addWeightOpen, setAddWeightOpen] = useState(false)
  const [addMeasureOpen, setAddMeasureOpen] = useState(false)

  const chartData = useMemo(
    () =>
      weightEntries.map((e) => ({
        date: formatDateShort(e.date),
        peso: e.weightKg,
      })),
    [weightEntries]
  )

  const lastWeight = weightEntries[weightEntries.length - 1]?.weightKg
  const firstWeight = weightEntries[0]?.weightKg ?? profile?.startWeightKg
  const delta = lastWeight !== undefined && firstWeight !== undefined ? lastWeight - firstWeight : 0
  const daysToCheckpoint = daysBetween(todayISO(), FIRST_CHECKPOINT_DATE)

  return (
    <>
      <TopBar title="Progreso" subtitle="Peso, medidas y expectativas" />
      <div className="page">
        <div className="stat-grid">
          <StatBlock label="Peso actual" value={lastWeight ? `${lastWeight} kg` : '—'} />
          <StatBlock label="Variación" value={`${delta > 0 ? '+' : ''}${delta.toFixed(1)} kg`} />
          <StatBlock
            label="Próx. medición"
            value={daysToCheckpoint > 0 ? `${daysToCheckpoint} d` : 'Hoy'}
          />
        </div>

        <div className="chart-card">
          <div className="chart-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="section-title" style={{ padding: 0, margin: 0 }}>Evolución del peso</span>
            <button className="btn btn-ghost btn-sm" onClick={() => setAddWeightOpen(true)}>
              <PlusIcon size={16} /> Añadir
            </button>
          </div>
          {chartData.length > 1 ? (
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <LineChart data={chartData} margin={{ top: 10, right: 14, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 6" stroke="var(--separator)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    stroke="var(--text-tertiary)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--text-tertiary)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    domain={['dataMin - 1', 'dataMax + 1']}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--card)',
                      border: '1px solid var(--card-border)',
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: 'var(--text-secondary)' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="peso"
                    stroke="var(--accent)"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: 'var(--accent)', strokeWidth: 0 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="empty-state">
              <div className="icon">📈</div>
              Registra al menos dos pesajes para ver tu gráfico.
            </div>
          )}
        </div>

        <div className="section-title">Historial de peso</div>
        <div className="card card-tight">
          {weightEntries.length === 0 && <div className="empty-state">Aún no hay registros.</div>}
          {[...weightEntries]
            .reverse()
            .slice(0, 12)
            .map((e) => (
              <div key={e.id} className="list-row">
                <div className="list-row-main">
                  <div className="list-row-title">{e.weightKg} kg</div>
                  <div className="list-row-sub">{formatDateShort(e.date)}{e.note ? ` · ${e.note}` : ''}</div>
                </div>
                <button onClick={() => deleteWeightEntry(e.id)} style={{ color: 'var(--text-tertiary)' }} aria-label="Eliminar">
                  <TrashIcon size={17} />
                </button>
              </div>
            ))}
        </div>

        <div className="section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Medidas mensuales</span>
          <button className="btn btn-ghost btn-sm" onClick={() => setAddMeasureOpen(true)}>
            <PlusIcon size={14} /> Nueva
          </button>
        </div>
        <div className="card card-tight">
          {measurementEntries.length === 0 && (
            <div className="empty-state">
              {TRACKING_NOTE}
            </div>
          )}
          {[...measurementEntries]
            .reverse()
            .map((m) => (
              <div key={m.id} className="list-row">
                <div style={{ display: 'flex', gap: 4 }}>
                  {[m.photoFront, m.photoSide, m.photoBack].filter(Boolean).map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="medición"
                      style={{ width: 34, height: 44, objectFit: 'cover', borderRadius: 8 }}
                    />
                  ))}
                </div>
                <div className="list-row-main">
                  <div className="list-row-title">{formatDateShort(m.date)}</div>
                  <div className="list-row-sub">
                    {m.waistCm ? `Cintura ${m.waistCm} cm` : ''}
                    {m.waistCm && m.thighCm ? ' · ' : ''}
                    {m.thighCm ? `Muslo ${m.thighCm} cm` : ''}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="section-title">Qué esperar</div>
        <div className="card card-tight">
          {EXPECTATIONS.map((row) => (
            <div key={row.plazo} className="list-row">
              <div className="list-row-main">
                <div className="list-row-title">{row.plazo}</div>
                <div className="list-row-sub">{row.detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{EXPECTATIONS_NOTE}</p>
        </div>
      </div>
      <AddWeightSheet open={addWeightOpen} onClose={() => setAddWeightOpen(false)} />
      <AddMeasurementSheet open={addMeasureOpen} onClose={() => setAddMeasureOpen(false)} />
    </>
  )
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-card">
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </div>
  )
}
