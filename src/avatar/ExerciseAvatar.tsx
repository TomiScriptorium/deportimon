import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ANIMATIONS, GROUND_Y, type AnimationDef, type AnimationId, type Prop } from './animations'
import { add, along, dir, lerpPose, solveSkeleton, SEG, type Limb, type Skeleton, type Vec } from './geometry'
import type { MuscleId } from '../data/muscles'

const W = { upperArm: 10, foreArm: 8.5, thigh: 14, shin: 11, neck: 8 }

function ease(x: number) {
  return -(Math.cos(Math.PI * x) - 1) / 2
}

/** 0 → 1 → 0 with short holds at each end, so each rep reads clearly. */
function phaseToMix(p: number) {
  if (p < 0.12) return 0
  if (p < 0.5) return ease((p - 0.12) / 0.38)
  if (p < 0.62) return 1
  return 1 - ease((p - 0.62) / 0.38)
}

function usePlayback(durationMs: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState(0.5)
  const reduced =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '80px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || reduced) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      setPhase(((now - start) % durationMs) / durationMs)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible, reduced, durationMs])

  return { ref, phase }
}

function limbPath(l: Limb, near: boolean, lenTag: 'arm' | 'leg'): React.ReactElement[] {
  const cls = near ? 'av-body' : 'av-body-far'
  const wa = lenTag === 'arm' ? W.upperArm : W.thigh
  const wb = lenTag === 'arm' ? W.foreArm : W.shin
  return [
    <line key="a" className={cls} x1={l.root[0]} y1={l.root[1]} x2={l.mid[0]} y2={l.mid[1]} strokeWidth={wa} />,
    <line key="b" className={cls} x1={l.mid[0]} y1={l.mid[1]} x2={l.end[0]} y2={l.end[1]} strokeWidth={wb} />,
  ]
}

function ellipse(key: string, c: Vec, rx: number, ry: number, angle: number, cls: string) {
  return (
    <ellipse key={key} className={cls} cx={c[0]} cy={c[1]} rx={rx} ry={ry} transform={`rotate(${-angle} ${c[0]} ${c[1]})`} />
  )
}

function seg(key: string, from: Vec, to: Vec, t0: number, t1: number, off: number, width: number, cls: string) {
  const a = along(from, to, t0, off)
  const b = along(from, to, t1, off)
  return <line key={key} className={cls} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} strokeWidth={width} />
}

/** Point in the torso frame: u along hip→neck, v along the skeleton normal. */
function torsoPoint(s: Skeleton, u: number, v: number): Vec {
  return add(add(s.hip, dir(s.torsoAngle), u * s.torsoScale), s.normal, v)
}

function torsoMuscles(s: Skeleton, muscle: MuscleId, cls: string): React.ReactElement[] {
  const a = s.torsoAngle
  const P = (u: number, v: number) => torsoPoint(s, u, v)
  if (s.view === 'side') {
    switch (muscle) {
      case 'pecho':
        return [ellipse('pe', P(33, 5), 9, 5, a, cls)]
      case 'abdomen':
        return [ellipse('ab', P(16, 6.4), 12, 3.6, a, cls)]
      case 'oblicuos':
        return [ellipse('ob', P(16, 0), 10, 4, a, cls)]
      case 'dorsales':
        return [ellipse('do', P(28, -5.5), 11, 4, a, cls)]
      case 'espalda_media':
        return [ellipse('em', P(37, -6), 6.5, 3.8, a, cls)]
      case 'trapecio':
        return [ellipse('tr', P(44, -4), 5, 3.5, a, cls)]
      case 'lumbar':
        return [ellipse('lu', P(7, -6), 7, 3.2, a, cls)]
      case 'gluteos':
        return [ellipse('gl', P(-1, -6.5), 7.5, 5.5, a, cls)]
      default:
        return []
    }
  }
  switch (muscle) {
    case 'pecho':
      return [ellipse('pe1', P(34, -6.5), 5, 6.5, a, cls), ellipse('pe2', P(34, 6.5), 5, 6.5, a, cls)]
    case 'abdomen':
      return [ellipse('ab', P(17, 0), 11, 5, a, cls)]
    case 'oblicuos':
      return [ellipse('ob1', P(16, -9), 8, 2.8, a, cls), ellipse('ob2', P(16, 9), 8, 2.8, a, cls)]
    case 'dorsales':
      return [ellipse('do1', P(28, -11), 8, 2.6, a, cls), ellipse('do2', P(28, 11), 8, 2.6, a, cls)]
    case 'trapecio':
      return [ellipse('tr1', P(45, -6), 3, 5, a, cls), ellipse('tr2', P(45, 6), 3, 5, a, cls)]
    default:
      return []
  }
}

function armMuscles(s: Skeleton, l: Limb, muscle: MuscleId, cls: string, outward: number): React.ReactElement[] {
  switch (muscle) {
    case 'hombros':
      return [<circle key="sh" className={cls} cx={l.root[0]} cy={l.root[1]} r={s.view === 'side' ? 6.6 : 6} />]
    case 'biceps':
      return [seg('bi', l.root, l.mid, 0.22, 0.86, s.view === 'side' ? 2.2 : 0, s.view === 'side' ? 5.4 : 6, cls)]
    case 'triceps': {
      if (s.view === 'side') return [seg('tri', l.root, l.mid, 0.22, 0.86, -2.2, 5.4, cls)]
      const o = add([0, 0], s.normal, 2.6 * outward)
      const a = add(along(l.root, l.mid, 0.25), o)
      const b = add(along(l.root, l.mid, 0.85), o)
      return [<line key="tri" className={cls} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} strokeWidth={3.4} />]
    }
    case 'antebrazos':
      return [seg('fa', l.mid, l.end, 0.08, 0.62, 0, 6, cls)]
    default:
      return []
  }
}

function legMuscles(s: Skeleton, l: Limb, muscle: MuscleId, cls: string): React.ReactElement[] {
  const side = s.view === 'side'
  switch (muscle) {
    case 'cuadriceps':
      return [seg('qd', l.root, l.mid, 0.18, 0.82, side ? 3 : 0, side ? 7 : 7.5, cls)]
    case 'isquios':
      return side ? [seg('hs', l.root, l.mid, 0.2, 0.84, -3, 6.5, cls)] : []
    case 'gemelos':
      return side ? [seg('ca', l.mid, l.end, 0.12, 0.55, -2.4, 6.5, cls)] : []
    default:
      return []
  }
}

function gearAt(key: string, p: Vec, r: number) {
  return (
    <g key={key}>
      <circle className="av-gear" cx={p[0]} cy={p[1]} r={r} />
      <circle className="av-gear-hub" cx={p[0]} cy={p[1]} r={Math.max(1.6, r * 0.28)} />
    </g>
  )
}

function handGear(props: Prop[] | undefined, s: Skeleton, which: 'near' | 'far'): React.ReactElement[] {
  if (!props) return []
  const hand = which === 'near' ? s.arm1.end : s.arm2.end
  const out: React.ReactElement[] = []
  for (const p of props) {
    if (p.kind === 'dumbbell' && (p.hands === 'both' || which === 'near')) out.push(gearAt(`db-${which}`, hand, 6.2))
    if (p.kind === 'barbell' && which === 'near') out.push(gearAt('bb', hand, p.size === 'plates' ? 11 : 4.6))
    if (p.kind === 'plate' && which === 'near') out.push(gearAt('pl', hand, 9.5))
  }
  return out
}

function sceneProps(props: Prop[] | undefined): React.ReactElement[] {
  if (!props) return []
  const out: React.ReactElement[] = []
  for (const p of props) {
    if (p.kind === 'table') {
      out.push(
        <g key="table" className="av-furniture">
          <rect x={p.x1} y={p.y} width={p.x2 - p.x1} height={5} rx={1.5} />
          <rect x={p.x1 + 3} y={p.y + 5} width={4} height={GROUND_Y - p.y - 5} />
          <rect x={p.x2 - 7} y={p.y + 5} width={4} height={GROUND_Y - p.y - 5} />
        </g>
      )
    }
    if (p.kind === 'box') {
      out.push(
        <g key="box" className="av-furniture">
          <rect x={p.x} y={p.y} width={p.w} height={5} rx={1.5} />
          <rect x={p.x + 3} y={p.y + 5} width={4} height={GROUND_Y - p.y - 5} />
          <rect x={p.x + p.w - 7} y={p.y + 5} width={4} height={GROUND_Y - p.y - 5} />
        </g>
      )
    }
  }
  return out
}

/** Smooth closed path through points (Catmull-Rom → cubic Bézier). */
function smoothPath(pts: Vec[]): string {
  const n = pts.length
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    const c1: Vec = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2: Vec = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C ${c1[0].toFixed(2)} ${c1[1].toFixed(2)} ${c2[0].toFixed(2)} ${c2[1].toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`
  }
  return d + ' Z'
}

const SIDE_TORSO: Vec[] = [
  [0, -9.5], [10, -10], [24, -10.2], [38, -9.6], [46, -5], [46, 5], [40, 10.5], [31, 11.5], [20, 8.5], [8, 9.5], [0, 8],
]
const FRONT_TORSO: Vec[] = [
  [0, -11], [9, -10.5], [21, -9.5], [33, -12.5], [41.5, -15.5], [46, -7.5], [46, 7.5], [41.5, 15.5], [33, 12.5], [21, 9.5], [9, 10.5], [0, 11],
]

function torsoShape(s: Skeleton) {
  const outline = (s.view === 'side' ? SIDE_TORSO : FRONT_TORSO).map(([u, v]) => torsoPoint(s, u, v))
  return <path key="torso" className="av-body" d={smoothPath(outline)} />
}

function foot(l: Limb, s: Skeleton, near: boolean) {
  const cls = near ? 'av-body' : 'av-body-far'
  if (s.view === 'front') {
    return <ellipse key="ft" className={cls} cx={l.end[0]} cy={l.end[1] + 1} rx={5.5} ry={3.6} />
  }
  const tip = add(l.end, dir(l.bAngle + 90 + s.footAngle), SEG.foot)
  return <line key="ft" className={cls} x1={l.end[0]} y1={l.end[1]} x2={tip[0]} y2={tip[1]} strokeWidth={6.5} />
}

const MIN_ASPECT = 1.2
const MAX_ASPECT = 1.9

/** Frames the whole movement (both keyframes and the arc between them) plus the floor. */
function fitViewBox(def: AnimationDef) {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = GROUND_Y + 3
  const grow = (p: Vec, r: number) => {
    minX = Math.min(minX, p[0] - r)
    minY = Math.min(minY, p[1] - r)
    maxX = Math.max(maxX, p[0] + r)
    maxY = Math.max(maxY, p[1] + r)
  }
  const gear = def.props?.some((p) => p.kind !== 'table' && p.kind !== 'box') ? 12 : 6
  for (const t of [0, 0.25, 0.5, 0.75, 1]) {
    const s = solveSkeleton(lerpPose(def.a, def.b, t), def.view)
    grow(s.head, SEG.headR + 1)
    grow(s.neck, 12)
    grow(s.hip, 12)
    for (const l of [s.arm1, s.arm2]) {
      grow(l.root, 7)
      grow(l.mid, 6)
      grow(l.end, gear)
    }
    for (const l of [s.leg1, s.leg2]) {
      grow(l.root, 8)
      grow(l.mid, 8)
      grow(l.end, 10)
    }
  }
  for (const p of def.props ?? []) {
    if (p.kind === 'table') grow([p.x1, p.y], 2), grow([p.x2, p.y], 2)
    if (p.kind === 'box') grow([p.x, p.y], 2), grow([p.x + p.w, p.y], 2)
  }
  const pad = 8
  let x = minX - pad
  let y = minY - pad
  let w = maxX - minX + pad * 2
  let h = maxY - minY + pad * 2
  const aspect = Math.min(MAX_ASPECT, Math.max(MIN_ASPECT, w / h))
  if (w / h < aspect) {
    const nw = h * aspect
    x -= (nw - w) / 2
    w = nw
  } else {
    const nh = w / aspect
    y -= nh - h
    h = nh
  }
  return { x, y, w, h }
}

interface Props {
  anim: AnimationId
  primary: MuscleId[]
  secondary?: MuscleId[]
  label: string
}

export function ExerciseAvatar({ anim, primary, secondary = [], label }: Props) {
  const def: AnimationDef = ANIMATIONS[anim]
  const vb = useMemo(() => fitViewBox(def), [def])
  const hold = !!def.hold
  const { ref, phase } = usePlayback(def.durationMs ?? (hold ? 2400 : 2800))
  const mix = hold ? 1 : phaseToMix(phase)
  const s = solveSkeleton(lerpPose(def.a, def.b, mix), def.view)
  const props = def.props
  const pulse = hold ? 0.55 + 0.45 * Math.sin(phase * Math.PI * 2) ** 2 : 1

  const groups: Array<{ muscles: MuscleId[]; cls: string }> = [
    { muscles: secondary, cls: 'av-muscle-2' },
    { muscles: primary, cls: 'av-muscle-1' },
  ]
  const torsoOverlay: React.ReactElement[] = []
  const armOverlay = (l: Limb, outward: number, keyPrefix: string) =>
    groups.flatMap(({ muscles, cls }) =>
      muscles.flatMap((m) => armMuscles(s, l, m, cls, outward)).map((el, i) => React.cloneElement(el, { key: `${keyPrefix}-${cls}-${i}` }))
    )
  const legOverlay = (l: Limb, keyPrefix: string) =>
    groups.flatMap(({ muscles, cls }) =>
      muscles.flatMap((m) => legMuscles(s, l, m, cls)).map((el, i) => React.cloneElement(el, { key: `${keyPrefix}-${cls}-${i}` }))
    )
  groups.forEach(({ muscles, cls }) =>
    muscles.forEach((m) => torsoMuscles(s, m, cls).forEach((el, i) => torsoOverlay.push(React.cloneElement(el, { key: `t-${cls}-${m}-${i}` }))))
  )

  const headDir = dir(s.torsoAngle)
  const nose = add(s.head, s.normal, SEG.headR - 0.6)
  const side = s.view === 'side'

  return (
    <div ref={ref} className="avatar-stage" role="img" aria-label={`Animación: ${label}`}>
      <svg
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ aspectRatio: `${vb.w} / ${vb.h}` }}
      >
        <line className="av-floor" x1={vb.x + 6} y1={GROUND_Y + 1} x2={vb.x + vb.w - 6} y2={GROUND_Y + 1} />
        {sceneProps(props)}

        {/* far side */}
        <g>
          <g>
            {limbPath(s.leg2, !side, 'leg')}
            {foot(s.leg2, s, !side)}
            <g style={{ opacity: (side ? 0.55 : 1) * pulse }}>{legOverlay(s.leg2, 'l2')}</g>
          </g>
          {side && (
            <g>
              {limbPath(s.arm2, false, 'arm')}
              <circle className="av-body-far" cx={s.arm2.end[0]} cy={s.arm2.end[1]} r={4} />
              <g style={{ opacity: 0.55 * pulse }}>{armOverlay(s.arm2, -1, 'a2')}</g>
              {handGear(props, s, 'far')}
            </g>
          )}
        </g>

        {/* body */}
        <g>
          {limbPath(s.leg1, true, 'leg')}
          {foot(s.leg1, s, true)}
        </g>
        {torsoShape(s)}
        <line className="av-body" x1={s.neck[0]} y1={s.neck[1]} x2={s.head[0] - headDir[0] * 6} y2={s.head[1] - headDir[1] * 6} strokeWidth={W.neck} />
        <circle className="av-body" cx={s.head[0]} cy={s.head[1]} r={SEG.headR} />
        {side && <circle className="av-body" cx={nose[0]} cy={nose[1]} r={2.3} />}
        <g style={{ opacity: pulse }}>{torsoOverlay}</g>
        <g style={{ opacity: pulse }}>{legOverlay(s.leg1, 'l1')}</g>

        {!side && (
          <g>
            {limbPath(s.arm2, true, 'arm')}
            <circle className="av-body" cx={s.arm2.end[0]} cy={s.arm2.end[1]} r={4} />
            <g style={{ opacity: pulse }}>{armOverlay(s.arm2, 1, 'a2')}</g>
            {handGear(props, s, 'far')}
          </g>
        )}
        <g>
          {limbPath(s.arm1, true, 'arm')}
          <circle className="av-body" cx={s.arm1.end[0]} cy={s.arm1.end[1]} r={4} />
          <g style={{ opacity: pulse }}>{armOverlay(s.arm1, -1, 'a1')}</g>
          {handGear(props, s, 'near')}
        </g>
      </svg>
    </div>
  )
}

