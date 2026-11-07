import React from 'react'
import { MUSCLE_LABEL, type MuscleId } from '../data/muscles'

type Region = { muscle?: MuscleId; d: string }

// Drawn for the left half of a 100×200 figure centred on x=50, then mirrored.
const mirror = (d: string) =>
  d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, (_, x, y) => `${(100 - Number(x)).toFixed(1)},${y}`)

const sym = (muscle: MuscleId | undefined, d: string): Region[] => [
  { muscle, d },
  { muscle, d: mirror(d) },
]

const SILHOUETTE = [
  'M50,4 C57,4 61,9 61,16 C61,22 58,26 55,28 L55,31 C62,33 68,34 71,37 C76,40 78,46 77,54 L80,72 C82,80 82,88 80,95 L77,96 C76,90 74,82 72,76 L69,62 L66,72 C65,80 66,88 65,96 L63,104 C64,118 62,132 60,146 C59,158 60,170 59,186 L60,192 L53,192 L53,184 C52,170 52,158 52,146 C52,130 51,116 50,106 C49,116 48,130 48,146 C48,158 48,170 47,184 L47,192 L40,192 L41,186 C40,170 41,158 40,146 C38,132 36,118 37,104 L35,96 C34,88 35,80 34,72 L31,62 L28,76 C26,82 24,90 23,96 L20,95 C18,88 18,80 20,72 L23,54 C22,46 24,40 29,37 C32,34 38,33 45,31 L45,28 C42,26 39,22 39,16 C39,9 43,4 50,4 Z',
]

const FRONT: Region[] = [
  ...sym('trapecio', 'M45,30 C41,32 36,33 33,35 L44,35 Z'),
  ...sym('hombros', 'M33,35 C26,37 23,43 24,51 C27,50 30,47 32,43 L36,37 Z'),
  ...sym('pecho', 'M49,36 L37,37 C33,40 32,46 34,51 C39,55 46,55 49,52 Z'),
  ...sym('biceps', 'M24,52 C23,57 23,63 25,68 C28,67 30,63 31,58 C31,54 30,50 30,48 Z'),
  ...sym('antebrazos', 'M24,70 C22,77 21,84 21,92 L24,92 C26,85 28,78 29,72 Z'),
  ...sym('dorsales', 'M34,53 C35,58 36,62 38,65 L39,57 Z'),
  ...sym('oblicuos', 'M38,58 C37,66 37,75 39,84 L43,86 L43,59 Z'),
  ...sym('abdomen', 'M44,56 L49,56 L49,64 L44,64 Z'),
  ...sym('abdomen', 'M44,66 L49,66 L49,74 L44,74 Z'),
  ...sym('abdomen', 'M44,76 L49,76 L49,87 L45,88 C44,86 44,80 44,76 Z'),
  ...sym(undefined, 'M38,100 C37,112 39,126 42,138 L48,138 C49,126 49,112 48,102 Z'),
  ...sym(undefined, 'M42,148 C40,158 41,170 43,180 L47,180 C48,170 48,158 47,148 Z'),
]

const BACK: Region[] = [
  { muscle: 'trapecio', d: 'M50,27 L45,30 C41,32 36,33 33,35 L42,40 L50,37 L58,40 L67,35 C64,33 59,32 55,30 Z' },
  ...sym('hombros', 'M33,35 C26,37 23,43 24,51 C27,50 30,47 32,43 L36,37 Z'),
  { muscle: 'espalda_media', d: 'M42,41 L50,38 L58,41 L57,54 L50,58 L43,54 Z' },
  ...sym('triceps', 'M24,52 C23,57 23,63 25,68 C28,67 30,63 31,58 C31,54 30,50 30,48 Z'),
  ...sym('antebrazos', 'M24,70 C22,77 21,84 21,92 L24,92 C26,85 28,78 29,72 Z'),
  ...sym('dorsales', 'M35,40 L41,42 L42,55 L48,60 C46,66 44,72 41,76 C37,68 35,58 34,48 Z'),
  ...sym('lumbar', 'M44,62 L49,61 L49,86 L44,84 C43,78 43,70 44,62 Z'),
  ...sym(undefined, 'M37,90 C36,96 39,102 45,104 C48,103 49,99 49,94 L49,88 Z'),
  ...sym(undefined, 'M38,106 C37,118 39,130 42,140 L48,140 C49,128 49,116 48,108 Z'),
  ...sym(undefined, 'M41,148 C39,158 41,168 43,178 L47,178 C48,168 48,158 47,148 Z'),
]

function Figure({ regions, primary, secondary, x }: { regions: Region[]; primary: MuscleId[]; secondary: MuscleId[]; x: number }) {
  const cls = (m?: MuscleId) =>
    m && primary.includes(m) ? 'mm-1' : m && secondary.includes(m) ? 'mm-2' : 'mm-0'
  return (
    <g transform={`translate(${x} 0)`}>
      {SILHOUETTE.map((d) => (
        <path key={d.length} className="mm-body" d={d} />
      ))}
      {regions.map((r, i) => (
        <path key={i} className={cls(r.muscle)} d={r.d} />
      ))}
    </g>
  )
}

interface Props {
  primary: MuscleId[]
  secondary?: MuscleId[]
}

export function MuscleMap({ primary, secondary = [] }: Props) {
  return (
    <div className="muscle-map">
      <svg viewBox="0 0 210 200" role="img" aria-label={`Músculos trabajados: ${primary.map((m) => MUSCLE_LABEL[m]).join(', ')}`}>
        <Figure regions={FRONT} primary={primary} secondary={secondary} x={0} />
        <Figure regions={BACK} primary={primary} secondary={secondary} x={110} />
      </svg>
      <div className="muscle-map-caption">
        <span>Frente</span>
        <span>Espalda</span>
      </div>
    </div>
  )
}
