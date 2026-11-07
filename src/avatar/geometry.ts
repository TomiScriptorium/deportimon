// Angles are in degrees, math convention: 0 = right, 90 = up (screen y grows down).

export type Vec = [number, number]

export const SEG = {
  torso: 46,
  neck: 6,
  headR: 10,
  upperArm: 27,
  foreArm: 24,
  thigh: 36,
  shin: 36,
  foot: 9,
  shoulderT: 0.9,
  frontShoulderHalf: 13,
  frontHipHalf: 6.5,
} as const

const RAD = Math.PI / 180

export function dir(deg: number): Vec {
  return [Math.cos(deg * RAD), -Math.sin(deg * RAD)]
}

export function add(a: Vec, b: Vec, k = 1): Vec {
  return [a[0] + b[0] * k, a[1] + b[1] * k]
}

export function angleOf(from: Vec, to: Vec): number {
  return Math.atan2(-(to[1] - from[1]), to[0] - from[0]) / RAD
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/** Absolute angles, absolute relative-to-parent angles, or a planted hand/foot solved with 2-bone IK. */
export type LimbSpec =
  | { kind: 'fk'; a: number; b: number; bScale?: number }
  | { kind: 'rel'; a: number; b: number }
  | { kind: 'ik'; x: number; y: number; bend: 1 | -1 }

export const fk = (a: number, b: number, bScale?: number): LimbSpec => ({ kind: 'fk', a, b, bScale })
export const rel = (a: number, b: number): LimbSpec => ({ kind: 'rel', a, b })
export const ik = (x: number, y: number, bend: 1 | -1): LimbSpec => ({ kind: 'ik', x, y, bend })

export interface Pose {
  hip: Vec
  torso: number
  arm1: LimbSpec
  arm2?: LimbSpec
  leg1: LimbSpec
  leg2?: LimbSpec
  /** Front view only: shortens the torso to suggest leaning toward the viewer (1 = upright). */
  torsoScale?: number
  /** Extra foot angle in degrees, e.g. negative to point the toes down for a heel raise. */
  foot?: number
}

export type View = 'side' | 'front'

export interface Limb {
  root: Vec
  mid: Vec
  end: Vec
  aAngle: number
  bAngle: number
}

export interface Skeleton {
  view: View
  hip: Vec
  neck: Vec
  head: Vec
  torsoAngle: number
  torsoScale: number
  footAngle: number
  /** Direction the chest faces (side view) / the figure's right hand side (front view). */
  normal: Vec
  arm1: Limb
  arm2: Limb
  leg1: Limb
  leg2: Limb
}

function lerpLimb(a: LimbSpec, b: LimbSpec, t: number): LimbSpec {
  if (a.kind === 'ik' && b.kind === 'ik') {
    return { kind: 'ik', x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), bend: t < 0.5 ? a.bend : b.bend }
  }
  if (a.kind === 'fk' && b.kind === 'fk') {
    return { kind: 'fk', a: lerp(a.a, b.a, t), b: lerp(a.b, b.b, t), bScale: lerp(a.bScale ?? 1, b.bScale ?? 1, t) }
  }
  if (a.kind === 'rel' && b.kind === 'rel') {
    return { kind: 'rel', a: lerp(a.a, b.a, t), b: lerp(a.b, b.b, t) }
  }
  return t < 0.5 ? a : b
}

export function lerpPose(a: Pose, b: Pose, t: number): Pose {
  return {
    hip: [lerp(a.hip[0], b.hip[0], t), lerp(a.hip[1], b.hip[1], t)],
    torso: lerp(a.torso, b.torso, t),
    arm1: lerpLimb(a.arm1, b.arm1, t),
    arm2: lerpLimb(a.arm2 ?? a.arm1, b.arm2 ?? b.arm1, t),
    leg1: lerpLimb(a.leg1, b.leg1, t),
    leg2: lerpLimb(a.leg2 ?? a.leg1, b.leg2 ?? b.leg1, t),
    torsoScale: lerp(a.torsoScale ?? 1, b.torsoScale ?? 1, t),
    foot: lerp(a.foot ?? 0, b.foot ?? 0, t),
  }
}

function solveLimb(root: Vec, spec: LimbSpec, lenA: number, lenB: number, parentAngle: number): Limb {
  if (spec.kind === 'ik') {
    const target: Vec = [spec.x, spec.y]
    const dx = target[0] - root[0]
    const dy = target[1] - root[1]
    const reach = lenA + lenB - 0.01
    const d = Math.min(Math.max(Math.hypot(dx, dy), Math.abs(lenA - lenB) + 0.01), reach)
    const toTarget = angleOf(root, target)
    const cosAlpha = (lenA * lenA + d * d - lenB * lenB) / (2 * lenA * d)
    const alpha = Math.acos(Math.min(1, Math.max(-1, cosAlpha))) / RAD
    const aAngle = toTarget + spec.bend * alpha
    const mid = add(root, dir(aAngle), lenA)
    const bAngle = angleOf(mid, target)
    return { root, mid, end: add(mid, dir(bAngle), lenB), aAngle, bAngle }
  }
  const aAngle = spec.kind === 'rel' ? parentAngle + spec.a : spec.a
  const bAngle = spec.kind === 'rel' ? aAngle + spec.b : spec.b
  const bLen = spec.kind === 'fk' ? lenB * (spec.bScale ?? 1) : lenB
  const mid = add(root, dir(aAngle), lenA)
  return { root, mid, end: add(mid, dir(bAngle), bLen), aAngle, bAngle }
}

export function solveSkeleton(pose: Pose, view: View): Skeleton {
  const td = dir(pose.torso)
  const k = pose.torsoScale ?? 1
  const neck = add(pose.hip, td, SEG.torso * k)
  // a shortened torso means leaning toward the viewer, so the head drops in front of the chest
  const head = add(neck, td, (SEG.neck + SEG.headR) * (k < 1 ? k * 0.9 : 1))
  // side view: chest faces the torso direction rotated -90°; front view: figure's right side.
  const normal = dir(pose.torso - 90)
  const shoulderMid = add(pose.hip, td, SEG.torso * k * SEG.shoulderT)

  let s1 = shoulderMid
  let s2 = shoulderMid
  let h1 = pose.hip
  let h2 = pose.hip
  if (view === 'front') {
    s1 = add(shoulderMid, normal, -SEG.frontShoulderHalf)
    s2 = add(shoulderMid, normal, SEG.frontShoulderHalf)
    h1 = add(pose.hip, normal, -SEG.frontHipHalf)
    h2 = add(pose.hip, normal, SEG.frontHipHalf)
  } else {
    // far side limbs sit slightly behind and above for depth
    s2 = add(shoulderMid, [-2.5, -1.5])
    h2 = add(pose.hip, [-2.5, -1.5])
  }

  const arm2Spec = pose.arm2 ?? pose.arm1
  const leg2Spec = pose.leg2 ?? pose.leg1
  const shiftIk = (spec: LimbSpec, by: Vec): LimbSpec =>
    view === 'side' && spec.kind === 'ik' && spec === pose.arm1 ? { ...spec, x: spec.x + by[0], y: spec.y + by[1] } : spec

  return {
    view,
    hip: pose.hip,
    neck,
    head,
    torsoAngle: pose.torso,
    torsoScale: k,
    footAngle: pose.foot ?? 0,
    normal,
    arm1: solveLimb(s1, pose.arm1, SEG.upperArm, SEG.foreArm, pose.torso),
    arm2: solveLimb(s2, shiftIk(arm2Spec, [-2.5, -1.5]), SEG.upperArm, SEG.foreArm, pose.torso),
    leg1: solveLimb(h1, pose.leg1, SEG.thigh, SEG.shin, pose.torso + 180),
    leg2: solveLimb(h2, leg2Spec === pose.leg1 && view === 'side' && leg2Spec.kind === 'ik'
      ? { ...leg2Spec, x: leg2Spec.x - 2.5, y: leg2Spec.y }
      : leg2Spec, SEG.thigh, SEG.shin, pose.torso + 180),
  }
}

/** Point along a segment at fraction t, pushed sideways by `off` along the segment's left normal. */
export function along(from: Vec, to: Vec, t: number, off = 0, normalSign: 1 | -1 = 1): Vec {
  const p: Vec = [lerp(from[0], to[0], t), lerp(from[1], to[1], t)]
  if (!off) return p
  const ang = angleOf(from, to) + 90 * normalSign
  return add(p, dir(ang), off)
}
