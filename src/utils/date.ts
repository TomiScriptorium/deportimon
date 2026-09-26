export function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export function formatDateLong(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

export function weekdayName(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('es-ES', { weekday: 'long' })
}

const WEEKDAY_INDEX: Record<number, string> = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
}

export function currentWeekdayLabel(date = new Date()): string {
  return WEEKDAY_INDEX[date.getDay()]
}

export function daysBetween(fromISO: string, toISO: string): number {
  const from = new Date(fromISO + 'T00:00:00').getTime()
  const to = new Date(toISO + 'T00:00:00').getTime()
  return Math.round((to - from) / (1000 * 60 * 60 * 24))
}

export function daysSince(iso: string): number {
  return daysBetween(iso, todayISO())
}

export function addDays(iso: string, days: number): string {
  const d = new Date(iso + 'T00:00:00')
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export function greetingForHour(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Buenos días'
  if (h < 19) return 'Buenas tardes'
  return 'Buenas noches'
}
