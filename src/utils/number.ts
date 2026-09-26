/** Parses a number typed by a user who may use ',' or '.' as the decimal separator. */
export function parseDecimal(input: string): number | undefined {
  const normalized = input.trim().replace(',', '.')
  if (!normalized) return undefined
  const n = Number(normalized)
  return Number.isFinite(n) ? n : undefined
}
