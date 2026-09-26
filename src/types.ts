export interface UserProfile {
  name: string
  sex: 'hombre' | 'mujer' | 'otro'
  age: number
  heightCm: number
  startWeightKg: number
  startDate: string // ISO date
  waistCm?: number
  thighCm?: number
  goal?: string
  createdAt: string
}

export interface WeightEntry {
  id: string
  date: string // ISO date
  weightKg: number
  note?: string
}

export interface MeasurementEntry {
  id: string
  date: string
  waistCm?: number
  thighCm?: number
  photoFront?: string
  photoSide?: string
  photoBack?: string
  note?: string
}

export interface Exercise {
  id: string
  name: string
  scheme: string
  youtubeId: string
  cue?: string
  equipment?: string
}

export type RoutineId = 'A' | 'B' | 'C'

export interface Routine {
  id: RoutineId
  day: string
  title: string
  subtitle: string
  exercises: Exercise[]
}

export type DayType = 'fuerza' | 'cardio' | 'descanso'

export interface WeekPlanDay {
  day: string
  short: string
  type: DayType
  routineId?: RoutineId
  label: string
  detail: string
}

export interface BarLoadingRow {
  bar: string
  plates: string
  total: string
  totalKg: number
}

export interface PullupStage {
  id: string
  title: string
  scheme: string
  youtubeId: string
  detail: string
}

export interface ExerciseSetLog {
  exerciseId: string
  setsCompleted: number
  weightKg?: number
  reps?: string
  note?: string
}

export interface SessionLog {
  id: string
  date: string // ISO date
  routineId: RoutineId | 'minima'
  entries: ExerciseSetLog[]
  completed: boolean
}

export interface HabitDayLog {
  date: string // ISO date, one entry per day
  sleepHours?: number
  waterLiters?: number
  walkedAfterLunch?: boolean
  movedHourly?: boolean
  cardioDone?: boolean
}

export interface NutritionSlot {
  time: string
  title: string
  detail: string
}

export interface ExpectationRow {
  plazo: string
  detail: string
}
