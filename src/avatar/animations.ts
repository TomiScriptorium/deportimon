import { fk, ik, rel, type Pose, type View } from './geometry'

export type Prop =
  | { kind: 'dumbbell'; hands: 'near' | 'both' }
  | { kind: 'barbell'; size: 'bar' | 'plates' }
  | { kind: 'plate' }
  | { kind: 'table'; x1: number; x2: number; y: number }
  | { kind: 'box'; x: number; y: number; w: number }

export interface AnimationDef {
  view: View
  a: Pose
  b: Pose
  props?: Prop[]
  /** Isometric hold: the figure stays still and the worked muscles pulse. */
  hold?: boolean
  durationMs?: number
}

export const GROUND_Y = 172

const standingLegs = {
  leg1: fk(-92, -90),
  leg2: fk(-88, -90),
}

const standing = { hip: [100, 97] as [number, number], torso: 90, ...standingLegs }

const curlA: Pose = { ...standing, arm1: fk(-90, -84) }
const curlB: Pose = { ...standing, arm1: fk(-84, 74) }

const pushupA: Pose = {
  hip: [103.7, 137.4],
  torso: 26,
  arm1: ik(140.9, 169.5, -1),
  leg1: ik(39, 169, 1),
}
const pushupB: Pose = {
  hip: [110, 157],
  torso: 9.6,
  arm1: ik(140.9, 169.5, -1),
  leg1: ik(39, 169, 1),
}

const lyingKneesUp = { leg1: ik(160, 168, 1) }

export const ANIMATIONS = {
  pushup: { view: 'side', a: pushupA, b: pushupB },

  bentRow: {
    view: 'side',
    a: { hip: [92, 101], torso: 35, arm1: fk(-90, -90), leg1: ik(108, 169, -1), leg2: ik(104, 169, -1) },
    b: { hip: [92, 101], torso: 35, arm1: fk(200, -90), leg1: ik(108, 169, -1), leg2: ik(104, 169, -1) },
    props: [{ kind: 'barbell', size: 'plates' }],
  },

  ohp: {
    view: 'side',
    a: { ...standing, arm1: fk(-62, 100) },
    b: { ...standing, arm1: fk(86, 89) },
    props: [{ kind: 'barbell', size: 'plates' }],
  },

  curlBarbell: { view: 'side', a: curlA, b: curlB, props: [{ kind: 'barbell', size: 'bar' }] },
  curlHammer: { view: 'side', a: curlA, b: curlB, props: [{ kind: 'dumbbell', hands: 'both' }] },

  crunch: {
    view: 'side',
    a: { hip: [120, 160], torso: 180, arm1: rel(-15, 135), ...lyingKneesUp },
    b: { hip: [120, 160], torso: 152, arm1: rel(-15, 135), ...lyingKneesUp },
  },

  plank: {
    view: 'side',
    hold: true,
    a: { hip: [109.8, 151.2], torso: 14.3, arm1: fk(-90, 0), leg1: ik(40, 169, 1) },
    b: { hip: [109.8, 151.2], torso: 14.3, arm1: fk(-90, 0), leg1: ik(40, 169, 1) },
  },

  floorPress: {
    view: 'side',
    a: { hip: [122, 160], torso: 180, arm1: ik(90, 139, -1), ...lyingKneesUp },
    b: { hip: [122, 160], torso: 180, arm1: ik(81, 110, -1), ...lyingKneesUp },
    props: [{ kind: 'barbell', size: 'plates' }],
  },

  invertedRow: {
    view: 'side',
    a: { hip: [114.3, 145.4], torso: 160, arm1: ik(78, 84, -1), leg1: ik(182, 169, 1) },
    b: { hip: [119.6, 134], torso: 150, arm1: ik(78, 84, -1), leg1: ik(182, 169, 1) },
    props: [{ kind: 'table', x1: 38, x2: 124, y: 78 }],
  },

  lateralRaise: {
    view: 'front',
    a: { ...standing, leg1: fk(-93, -91), leg2: fk(-87, -89), arm1: fk(-97, -98), arm2: fk(-83, -82) },
    b: { ...standing, leg1: fk(-93, -91), leg2: fk(-87, -89), arm1: fk(184, 181), arm2: fk(-4, -1) },
    props: [{ kind: 'dumbbell', hands: 'both' }],
  },

  overheadExt: {
    view: 'side',
    a: { ...standing, arm1: fk(95, -105) },
    b: { ...standing, arm1: fk(95, 92) },
    props: [{ kind: 'dumbbell', hands: 'near' }],
  },

  legRaise: {
    view: 'side',
    a: { hip: [118, 160], torso: 180, arm1: fk(-3, -1), leg1: fk(8, 6) },
    b: { hip: [118, 160], torso: 180, arm1: fk(-3, -1), leg1: fk(84, 82) },
  },

  sidePlank: {
    view: 'front',
    hold: true,
    a: {
      hip: [112, 138.3],
      torso: 160,
      arm1: fk(-90, -90, 0.25),
      arm2: fk(90, 90),
      leg1: ik(177.5, 169, 1),
      leg2: ik(182, 156.8, 1),
    },
    b: {
      hip: [112, 138.3],
      torso: 160,
      arm1: fk(-90, -90, 0.25),
      arm2: fk(90, 90),
      leg1: ik(177.5, 169, 1),
      leg2: ik(182, 156.8, 1),
    },
  },

  oneArmRow: {
    view: 'side',
    a: { hip: [86, 100], torso: 15, arm1: fk(-90, -90), arm2: ik(146, 120, 1), leg1: ik(80, 169, -1), leg2: ik(104, 169, -1) },
    b: { hip: [86, 100], torso: 15, arm1: fk(150, -95), arm2: ik(146, 120, 1), leg1: ik(80, 169, -1), leg2: ik(104, 169, -1) },
    props: [{ kind: 'dumbbell', hands: 'near' }, { kind: 'box', x: 132, y: 124, w: 40 }],
  },

  frontRaise: {
    view: 'side',
    a: { ...standing, arm1: fk(-88, -86) },
    b: { ...standing, arm1: fk(6, 8) },
    props: [{ kind: 'plate' }],
  },

  deadBug: {
    view: 'side',
    a: { hip: [118, 160], torso: 180, arm1: fk(90, 90), arm2: fk(90, 90), leg1: fk(90, 0), leg2: fk(90, 0) },
    b: { hip: [118, 160], torso: 180, arm1: fk(172, 176), arm2: fk(90, 90), leg1: fk(90, 0), leg2: fk(12, 6) },
  },

  kneeTuck: {
    view: 'side',
    a: { hip: [100, 162], torso: 118, arm1: ik(70, 168, 1), leg1: fk(18, 12) },
    b: { hip: [100, 162], torso: 108, arm1: ik(70, 168, 1), leg1: fk(62, -40) },
  },
} satisfies Record<string, AnimationDef>

export type AnimationId = keyof typeof ANIMATIONS
