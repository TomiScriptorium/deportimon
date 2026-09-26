import React, { createContext, useContext, useEffect, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { makeId } from '../utils/id'
import type {
  HabitDayLog,
  MeasurementEntry,
  SessionLog,
  UserProfile,
  WeightEntry,
} from '../types'

export type ThemePreference = 'system' | 'light' | 'dark'

interface DataContextValue {
  profile: UserProfile | null
  setProfile: (p: UserProfile) => void
  clearAll: () => void

  theme: ThemePreference
  setTheme: (t: ThemePreference) => void

  weightEntries: WeightEntry[]
  addWeightEntry: (weightKg: number, date: string, note?: string) => void
  deleteWeightEntry: (id: string) => void

  measurementEntries: MeasurementEntry[]
  addMeasurementEntry: (entry: Omit<MeasurementEntry, 'id'>) => void
  deleteMeasurementEntry: (id: string) => void

  sessionLogs: SessionLog[]
  upsertSessionLog: (log: SessionLog) => void

  habitLogs: Record<string, HabitDayLog>
  upsertHabitLog: (date: string, patch: Partial<HabitDayLog>) => void
}

const DataContext = createContext<DataContextValue | null>(null)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileRaw] = useLocalStorage<UserProfile | null>('deportimon.profile', null)
  const [weightEntries, setWeightEntries] = useLocalStorage<WeightEntry[]>('deportimon.weights', [])
  const [measurementEntries, setMeasurementEntries] = useLocalStorage<MeasurementEntry[]>(
    'deportimon.measurements',
    []
  )
  const [sessionLogs, setSessionLogs] = useLocalStorage<SessionLog[]>('deportimon.sessions', [])
  const [habitLogs, setHabitLogs] = useLocalStorage<Record<string, HabitDayLog>>(
    'deportimon.habits',
    {}
  )
  const [theme, setTheme] = useLocalStorage<ThemePreference>('deportimon.theme', 'system')

  // Backfills the day-1 waist/thigh measurement for accounts created before
  // onboarding started recording it as a "Medidas mensuales" entry.
  useEffect(() => {
    if (!profile) return
    if (!profile.waistCm && !profile.thighCm) return
    const hasStartMeasurement = measurementEntries.some((m) => m.date === profile.startDate)
    if (hasStartMeasurement) return
    setMeasurementEntries((prev) =>
      [
        ...prev,
        {
          id: makeId(),
          date: profile.startDate,
          waistCm: profile.waistCm,
          thighCm: profile.thighCm,
          note: 'Punto de partida',
        },
      ].sort((a, b) => a.date.localeCompare(b.date))
    )
  }, [profile, measurementEntries, setMeasurementEntries])

  const value = useMemo<DataContextValue>(
    () => ({
      profile,
      setProfile: (p) => setProfileRaw(p),
      clearAll: () => {
        setProfileRaw(null)
        setWeightEntries([])
        setMeasurementEntries([])
        setSessionLogs([])
        setHabitLogs({})
      },

      theme,
      setTheme,

      weightEntries: weightEntries.filter((e) => Number.isFinite(e.weightKg) && e.weightKg > 0),
      addWeightEntry: (weightKg, date, note) => {
        if (!Number.isFinite(weightKg) || weightKg <= 0) return
        setWeightEntries((prev) => {
          const withoutSameDay = prev.filter((e) => e.date !== date)
          return [...withoutSameDay, { id: makeId(), date, weightKg, note }].sort((a, b) =>
            a.date.localeCompare(b.date)
          )
        })
      },
      deleteWeightEntry: (id) => {
        setWeightEntries((prev) => prev.filter((e) => e.id !== id))
      },

      measurementEntries,
      addMeasurementEntry: (entry) => {
        setMeasurementEntries((prev) =>
          [...prev, { ...entry, id: makeId() }].sort((a, b) => a.date.localeCompare(b.date))
        )
      },
      deleteMeasurementEntry: (id) => {
        setMeasurementEntries((prev) => prev.filter((e) => e.id !== id))
      },

      sessionLogs,
      upsertSessionLog: (log) => {
        setSessionLogs((prev) => {
          const idx = prev.findIndex((l) => l.id === log.id)
          if (idx === -1) return [...prev, log]
          const copy = [...prev]
          copy[idx] = log
          return copy
        })
      },

      habitLogs,
      upsertHabitLog: (date, patch) => {
        setHabitLogs((prev) => ({
          ...prev,
          [date]: { ...(prev[date] ?? { date }), ...patch, date },
        }))
      },
    }),
    [profile, theme, weightEntries, measurementEntries, sessionLogs, habitLogs]
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
