import type {
  BarLoadingRow,
  ExpectationRow,
  NutritionSlot,
  PullupStage,
  Routine,
  WeekPlanDay,
} from '../types'

export const PLAN_START_DATE = '2026-09-20'
export const FIRST_CHECKPOINT_DATE = '2026-10-26'

export const WEEK_PLAN: WeekPlanDay[] = [
  {
    day: 'Lunes',
    short: 'L',
    type: 'fuerza',
    routineId: 'A',
    label: 'Fuerza A',
    detail: 'Tren superior + abdominales (empuje). Si no llegas con energía, pásala al viernes.',
  },
  {
    day: 'Martes',
    short: 'M',
    type: 'cardio',
    label: 'Cardio suave',
    detail: 'Bici suave 20-30 min o caminata.',
  },
  {
    day: 'Miércoles',
    short: 'X',
    type: 'descanso',
    label: 'Caminata + descanso',
    detail: 'Caminata de 10-15 min después del almuerzo y descanso.',
  },
  {
    day: 'Jueves',
    short: 'J',
    type: 'fuerza',
    routineId: 'B',
    label: 'Fuerza B',
    detail: 'Tren superior + abdominales (tirón). Tu mejor día: llegas temprano.',
  },
  {
    day: 'Viernes',
    short: 'V',
    type: 'cardio',
    label: 'Cuerda o bici',
    detail: '20-30 min a ritmo cómodo.',
  },
  {
    day: 'Sábado',
    short: 'S',
    type: 'fuerza',
    routineId: 'C',
    label: 'Fuerza C',
    detail: 'Tren superior + abdominales (brazos y hombros).',
  },
  {
    day: 'Domingo',
    short: 'D',
    type: 'descanso',
    label: 'Descanso total',
    detail: 'Dormir lo que puedas.',
  },
]

export const MINIMAL_SESSION = {
  title: 'Sesión mínima (20 min)',
  detail: 'Para días complicados. Mantiene el hábito sin desgastarte.',
  exercises: [
    { id: 'min-flexiones', name: 'Flexiones', scheme: '2 x lo que salga' },
    { id: 'min-remo', name: 'Remo inclinado con barra', scheme: '2 x 10-12' },
    { id: 'min-plancha', name: 'Plancha', scheme: '2 x 30 s' },
  ],
}

export const ROUTINES: Routine[] = [
  {
    id: 'A',
    day: 'Lunes',
    title: 'Rutina A',
    subtitle: 'Empuje + abdominales',
    exercises: [
      {
        id: 'ua1',
        name: 'Flexiones',
        scheme: '3 x máx. con buena técnica',
        anim: 'pushup',
        primary: ['pecho'],
        secondary: ['triceps', 'hombros', 'abdomen'],
        equipment: 'Peso corporal. Si todavía no salen desde el suelo, apoya las manos en una silla o mesa firme.',
        steps: [
          'Manos un poco más abiertas que los hombros y cuerpo recto de cabeza a talones.',
          'Baja con los codos a unos 45° del cuerpo hasta que el pecho casi toque el suelo.',
          'Empuja el suelo y sube sin dejar caer la cadera.',
        ],
        youtubeId: 'hbGR_wq7wzo',
      },
      {
        id: 'ua2',
        name: 'Remo inclinado con barra',
        scheme: '3 x 10-12',
        anim: 'bentRow',
        primary: ['dorsales', 'espalda_media'],
        secondary: ['biceps', 'hombros', 'lumbar'],
        equipment: 'Barra de 5,7 kg con discos de 5 kg (15,7 kg).',
        loaded: true,
        steps: [
          'Rodillas semiflexionadas y tronco inclinado hacia adelante con la espalda recta.',
          'Tira la barra hacia el ombligo llevando los codos hacia atrás.',
          'Junta las escápulas arriba y baja controlado.',
        ],
        youtubeId: 'jHsrWv-0Tgc',
      },
      {
        id: 'ua3',
        name: 'Press de hombro con barra',
        scheme: '3 x 8-12',
        anim: 'ohp',
        primary: ['hombros'],
        secondary: ['triceps', 'trapecio', 'abdomen'],
        equipment: 'Barra de 3 kg con discos de 5 kg (13 kg).',
        loaded: true,
        steps: [
          'De pie, barra a la altura de los hombros y abdomen apretado.',
          'Empuja la barra hacia arriba hasta estirar los brazos sobre la cabeza.',
          'Baja controlado sin arquear la zona lumbar.',
        ],
        youtubeId: 'OHxSwnkSxB8',
      },
      {
        id: 'ua4',
        name: 'Curl de bíceps con barra',
        scheme: '3 x 10-12',
        anim: 'curlBarbell',
        primary: ['biceps'],
        secondary: ['antebrazos'],
        equipment: 'Barra de 3 kg; agrega discos cuando lo domines.',
        loaded: true,
        steps: [
          'De pie, codos pegados al cuerpo y agarre a la anchura de los hombros.',
          'Sube la barra doblando solo los codos, sin balancear el tronco.',
          'Baja lento hasta estirar los brazos por completo.',
        ],
        youtubeId: 'uDLZNOqv3EA',
      },
      {
        id: 'ua5',
        name: 'Crunch abdominal',
        scheme: '3 x 15-20',
        anim: 'crunch',
        primary: ['abdomen'],
        secondary: ['oblicuos'],
        equipment: 'Peso corporal, sobre una colchoneta.',
        steps: [
          'Tumbado boca arriba, rodillas dobladas y pies apoyados.',
          'Despega los hombros del suelo contrayendo el abdomen, sin tirar del cuello.',
          'Baja lento sin apoyar del todo la cabeza.',
        ],
        videoSearch: 'crunch abdominal técnica correcta',
      },
      {
        id: 'ua6',
        name: 'Plancha',
        scheme: '3 x 30-45 s',
        anim: 'plank',
        primary: ['abdomen'],
        secondary: ['oblicuos', 'hombros', 'lumbar'],
        equipment: 'Peso corporal.',
        steps: [
          'Antebrazos en el suelo con los codos bajo los hombros.',
          'Cuerpo recto de cabeza a talones: aprieta abdomen y glúteos.',
          'Respira normal y no dejes caer ni subir la cadera.',
        ],
        youtubeId: 'd0atctiI7Vw',
      },
    ],
  },
  {
    id: 'B',
    day: 'Jueves',
    title: 'Rutina B',
    subtitle: 'Tirón + abdominales',
    exercises: [
      {
        id: 'ub1',
        name: 'Press de pecho en el suelo con barra',
        scheme: '3 x 8-12',
        anim: 'floorPress',
        primary: ['pecho'],
        secondary: ['triceps', 'hombros'],
        equipment: 'Barra de 3 kg con discos de 5 kg (13 kg); sube a 19,7 kg cuando lo domines.',
        loaded: true,
        steps: [
          'Tumbado boca arriba, rodillas dobladas y barra sobre el pecho.',
          'Empuja la barra hacia arriba hasta estirar los brazos.',
          'Baja hasta que los codos toquen suavemente el suelo y repite.',
        ],
        youtubeId: 'z-bMvgs5oEE',
      },
      {
        id: 'ub2',
        name: 'Remo invertido bajo la mesa',
        scheme: '3 x 6-10',
        anim: 'invertedRow',
        primary: ['dorsales', 'espalda_media'],
        secondary: ['biceps', 'hombros'],
        equipment: 'Peso corporal, bajo una mesa muy firme. Comprueba antes que aguante tu peso y no se deslice.',
        steps: [
          'Tumbado bajo la mesa, agárrate del borde con los brazos estirados.',
          'Con el cuerpo recto, tira del pecho hacia la mesa llevando los codos atrás.',
          'Baja controlado hasta estirar los brazos.',
        ],
        youtubeId: 'cczgGh3YdWE',
      },
      {
        id: 'ub3',
        name: 'Elevación lateral',
        scheme: '3 x 12-15',
        anim: 'lateralRaise',
        primary: ['hombros'],
        secondary: ['trapecio'],
        equipment: 'Mancuerna de 4,75 kg (un brazo a la vez) o dos bidones de agua.',
        loaded: true,
        steps: [
          'De pie, brazos a los lados con los codos un poco doblados.',
          'Sube los brazos hacia los lados hasta la altura de los hombros.',
          'Baja lento sin encoger los hombros.',
        ],
        videoSearch: 'elevaciones laterales mancuerna técnica',
      },
      {
        id: 'ub4',
        name: 'Extensión de tríceps sobre la cabeza',
        scheme: '3 x 10-12',
        anim: 'overheadExt',
        primary: ['triceps'],
        equipment: 'Mancuerna de 4,75 kg o tambor de 9 kg, sujeto con las dos manos.',
        loaded: true,
        steps: [
          'Sujeta el peso con las dos manos detrás de la cabeza, codos hacia arriba.',
          'Estira los brazos hacia el techo sin mover los codos.',
          'Baja controlado detrás de la cabeza.',
        ],
        videoSearch: 'extensión de tríceps sobre la cabeza mancuerna técnica',
      },
      {
        id: 'ub5',
        name: 'Elevación de piernas tumbado',
        scheme: '3 x 10-15',
        anim: 'legRaise',
        primary: ['abdomen'],
        secondary: ['oblicuos'],
        equipment: 'Peso corporal; manos a los lados o bajo los glúteos.',
        steps: [
          'Tumbado boca arriba con las piernas estiradas.',
          'Sube las piernas hasta la vertical con la zona lumbar pegada al suelo.',
          'Baja lento sin que los talones toquen el suelo.',
        ],
        videoSearch: 'elevación de piernas tumbado abdominales técnica',
      },
      {
        id: 'ub6',
        name: 'Plancha lateral',
        scheme: '3 x 20-30 s por lado',
        anim: 'sidePlank',
        primary: ['oblicuos'],
        secondary: ['abdomen', 'hombros'],
        equipment: 'Peso corporal.',
        steps: [
          'De lado, apoyado en el antebrazo con el codo bajo el hombro.',
          'Sube la cadera hasta formar una línea recta de cabeza a pies.',
          'Mantén sin dejar caer la cadera y cambia de lado.',
        ],
        videoSearch: 'plancha lateral técnica correcta',
      },
    ],
  },
  {
    id: 'C',
    day: 'Sábado',
    title: 'Rutina C',
    subtitle: 'Brazos, hombros + abdominales',
    exercises: [
      {
        id: 'uc1',
        name: 'Flexiones cerradas',
        scheme: '3 x máx. con buena técnica',
        anim: 'pushup',
        primary: ['triceps', 'pecho'],
        secondary: ['hombros', 'abdomen'],
        equipment: 'Peso corporal (manos elevadas si hace falta).',
        steps: [
          'Manos juntas bajo el pecho, más cerradas que en una flexión normal.',
          'Baja con los codos pegados al cuerpo.',
          'Empuja hasta estirar los brazos manteniendo el cuerpo recto.',
        ],
        videoSearch: 'flexiones cerradas técnica',
      },
      {
        id: 'uc2',
        name: 'Remo a una mano con mancuerna',
        scheme: '3 x 10-12 por lado',
        anim: 'oneArmRow',
        primary: ['dorsales'],
        secondary: ['espalda_media', 'biceps', 'hombros'],
        equipment: 'Mancuerna de 4,75 kg o un bidón; apoya la otra mano en una silla.',
        loaded: true,
        steps: [
          'Apoya una mano en una silla con la espalda recta y casi horizontal.',
          'Tira la mancuerna hacia la cadera llevando el codo hacia atrás.',
          'Baja controlado sin girar el tronco.',
        ],
        youtubeId: 'fZYGcNtMWSc',
      },
      {
        id: 'uc3',
        name: 'Elevación frontal con disco',
        scheme: '3 x 12-15',
        anim: 'frontRaise',
        primary: ['hombros'],
        secondary: ['trapecio', 'pecho'],
        equipment: 'Disco de 5 kg sujeto con las dos manos.',
        loaded: true,
        steps: [
          'De pie, sujeta el disco frente a los muslos con los brazos estirados.',
          'Súbelo al frente hasta la altura de los ojos.',
          'Baja lento sin balancear el cuerpo.',
        ],
        videoSearch: 'elevación frontal con disco técnica',
      },
      {
        id: 'uc4',
        name: 'Curl martillo con mancuerna',
        scheme: '3 x 10-12 por lado',
        anim: 'curlHammer',
        primary: ['biceps', 'antebrazos'],
        equipment: 'Mancuerna de 4,75 kg (un brazo a la vez) o bidones con asa.',
        loaded: true,
        steps: [
          'De pie, palma mirando hacia el cuerpo y codo pegado.',
          'Sube la mancuerna sin girar la muñeca.',
          'Baja lento hasta estirar el brazo.',
        ],
        videoSearch: 'curl martillo mancuerna técnica',
      },
      {
        id: 'uc5',
        name: 'Dead bug',
        scheme: '3 x 10 por lado',
        anim: 'deadBug',
        primary: ['abdomen'],
        secondary: ['oblicuos'],
        equipment: 'Peso corporal.',
        steps: [
          'Boca arriba, brazos hacia el techo y rodillas dobladas a 90°.',
          'Estira un brazo hacia atrás y la pierna contraria hacia adelante, con la espalda baja pegada al suelo.',
          'Vuelve al centro y cambia de lado.',
        ],
        youtubeId: 'OUVY99ez0k0',
      },
      {
        id: 'uc6',
        name: 'Recogimiento de rodillas sentado',
        scheme: '3 x 12-15',
        anim: 'kneeTuck',
        primary: ['abdomen'],
        secondary: ['oblicuos'],
        equipment: 'Peso corporal, sentado en el suelo.',
        steps: [
          'Sentado, apoya las manos detrás y despega los pies del suelo.',
          'Lleva las rodillas al pecho mientras acercas el tronco.',
          'Estira las piernas sin tocar el suelo y repite.',
        ],
        videoSearch: 'recogimiento de rodillas sentado abdominales',
      },
    ],
  },
]

export const BAR_LOADING_TABLE: BarLoadingRow[] = [
  { bar: 'Barra 3 kg', plates: 'sin discos', total: '3 kg', totalKg: 3 },
  { bar: 'Barra 3 kg', plates: '5 + 5', total: '13 kg', totalKg: 13 },
  { bar: 'Barra 3 kg', plates: '7 + 7', total: '17 kg', totalKg: 17 },
  { bar: 'Barra 5,7 kg', plates: 'sin discos', total: '5,7 kg', totalKg: 5.7 },
  { bar: 'Barra 5,7 kg', plates: '5 + 5', total: '15,7 kg', totalKg: 15.7 },
  { bar: 'Barra 5,7 kg', plates: '7 + 7', total: '19,7 kg', totalKg: 19.7 },
]

export const EQUIPMENT_NOTES = [
  'Barra de 3 kg o de 5,7 kg, con un disco por lado (5 kg o 7 kg). Tope: 19,7 kg.',
  'Asegura los discos con topes firmes y prueba el agarre antes de cada serie.',
  'Si te falta peso, usa el tambor de 9 kg, la mancuerna de 4,75 kg o bidones de agua con asa (5 L = 5 kg).',
]

export const PROGRESSION_TIPS = [
  'Cuando completes todas las series en el tope del rango con buena técnica, sube algo de carga (un disco más o más agua en los bidones).',
  'Si ya no puedes subir peso: baja en 3 segundos y haz una pausa de 2 segundos abajo.',
  'Pasa a la versión a un brazo del ejercicio.',
  'Sube las repeticiones dentro del rango.',
  'Acorta la pausa entre series.',
]

export const PULLUP_BAR_NOTE =
  'Es la compra con mejor relación costo-beneficio: tu espalda y bíceps son el punto más débil con 20 kg como máximo. Cómprala cuando el remo con barra se te quede corto (probablemente semana 4 a 8). Elige una que se apoye en el marco de la puerta y no la uses si se mueve o cruje.'

export const PULLUP_PROGRESSION: PullupStage[] = [
  {
    id: 'hang',
    title: 'Colgarte de la barra',
    scheme: '3 x 15-30 s',
    youtubeId: '-31tCeBwPV0',
    detail: 'El primer paso: agarre y aguante en dead hang.',
  },
  {
    id: 'negativas',
    title: 'Negativas',
    scheme: '3 x 3-5',
    youtubeId: '637SzIkGrIg',
    detail: 'Subes con una silla y bajas en 3-5 segundos.',
  },
  {
    id: 'supina',
    title: 'Dominada con agarre supino',
    scheme: 'La primera suele llegar entre el mes 1 y 3',
    youtubeId: 'A84lHFsGXbI',
    detail: 'Cuando llegue, agrégala al día C y sustituye el remo invertido cuando ya no te rete.',
  },
]

export const CARDIO_VIDEOS = {
  bici: { name: 'Bici estática (ritmo cómodo)', youtubeId: 'AvU2H-IaXXI' },
  cuerda: { name: 'Saltar la cuerda (principiantes)', youtubeId: 'AnQwqHgZdoQ' },
}

export const NUTRITION_TARGET = {
  kcal: '2.100-2.200 kcal/día',
  gasto: 'tu gasto ronda las 2.300-2.400 kcal',
  proteina: '120-140 g de proteína',
  note: 'Son estimaciones aproximadas. No necesitas contar nada: guíate por las porciones, con la comida que ya se prepara en casa.',
}

export const NUTRITION_SLOTS: NutritionSlot[] = [
  {
    time: 'Media mañana (11-12)',
    title: 'Pan con 3 huevos',
    detail: 'En vez de 1 o 2 huevos (unos 20 g de proteína).',
  },
  {
    time: 'Almuerzo (14-15)',
    title: 'Almuerzo',
    detail: 'Una palma grande de proteína (150-200 g de carne cocida o 3 huevos), la porción habitual de arroz, tallarines o puré y verduras al lado.',
  },
  {
    time: 'Once (19)',
    title: 'Atún con huevo o huevos revueltos',
    detail: 'En vez de solo pan. Un yogur si quieres.',
  },
  {
    time: 'Colación de proteína',
    title: 'Yogur, leche, queso fresco o huevos duros',
    detail: 'Por la tarde o antes de dormir.',
  },
]

export const NUTRITION_TIPS = [
  'No necesitas desayunar si no puedes: importa más la proteína total del día.',
  'Legumbres (lentejas, porotos) un par de veces por semana: baratas y con buena proteína.',
  'Antes de entrenar, come algo con proteína y carbohidrato 1-2 horas antes (el pan con huevo sirve).',
  'Suma más proteína en el almuerzo: es el cambio que más pesa.',
]

export const HABITS_INFO = {
  sueno: {
    title: 'Sueño',
    detail: 'De lunes a jueves, acuéstate a las 22:00-22:30 para dormir cerca de 7 horas. Duerme más el viernes y el fin de semana. El sueño es lo que más puede mejorar tu recuperación, más que sumar una sesión de ejercicio.',
    targetHours: 7,
  },
  agua: {
    title: 'Agua',
    detail: 'Apunta a unos 2 litros al día. Deja una botella de 1 L a la vista y termínala dos veces. Un vaso al levantarte y otro antes de cada comida. Orina amarillo pálido es buena señal.',
    targetLiters: 2,
  },
  movimiento: {
    title: 'Movimiento diario',
    detail: 'Camina 10-15 minutos después del almuerzo, aprovecha los viajes de pie en el bus y levántate cada hora en clases.',
  },
  cardio: {
    title: 'Cardio',
    detail: '2 o 3 sesiones a la semana de bici estática o cuerda, a ritmo cómodo. Si sientes dolor en espinillas, tobillos o rodillas con la cuerda, cambia a la bici.',
  },
}

export const EXPECTATIONS: ExpectationRow[] = [
  {
    plazo: '3 meses',
    detail: 'Cintura 3-6 cm menos, peso casi igual (72-74 kg), fuerza claramente mayor y una forma más definida.',
  },
  {
    plazo: '6 meses',
    detail: 'Unos 1 a 2 kg de músculo ganado y 3 a 5 kg de grasa perdida, según tu alimentación.',
  },
  {
    plazo: '12 meses',
    detail: 'Un cuerpo delgado, firme y fuerte para tu tamaño; con este equipo, no un físico grande.',
  },
]

export const EXPECTATIONS_NOTE =
  'Estas cifras son estimaciones conservadoras, pensadas para 5-6 horas de sueño entre semana y el equipo actual. La balanza puede casi no cambiar aunque tu cuerpo sí lo haga, así que mira las medidas y la fuerza, no solo el peso.'

export const TRACKING_NOTE =
  'Mídete una vez al mes, con las mismas condiciones: por la mañana, en ayunas y a la misma hora. El registro de cargas y repeticiones de cada sesión es tu mejor indicador de progreso.'

/** Rutina de 4 días solo con mancuernas, tomada del video de referencia. */
export const DUMBBELL_PLAN = {
  title: 'Plan con mancuernas · 4 días',
  detail: 'Rutina de cuerpo completo solo con mancuernas: dos días de tren superior y dos de piernas + abdomen. Alterna los días y descansa al menos uno entre sesiones de piernas.',
  youtubeId: 'kIaSk_4znvk',
}

const DB = 'Mancuernas.'

export const DUMBBELL_ROUTINES: Routine[] = [
  {
    id: 'M1',
    day: 'Mancuernas',
    title: 'Día 1',
    subtitle: 'Tren superior',
    exercises: [
      {
        id: 'm1-1',
        name: 'Flexiones',
        scheme: '4 x 8',
        anim: 'pushup',
        primary: ['pecho'],
        secondary: ['triceps', 'hombros', 'abdomen'],
        equipment: 'Peso corporal. Si no salen 8 desde el suelo, apoya las rodillas o las manos en una superficie firme.',
        steps: [
          'Manos un poco más abiertas que los hombros y cuerpo recto de cabeza a talones.',
          'Baja con los codos a unos 45° hasta que el pecho casi toque el suelo.',
          'Empuja el suelo y sube sin dejar caer la cadera.',
        ],
        youtubeId: 'hbGR_wq7wzo',
      },
      {
        id: 'm1-2',
        name: 'Remo con mancuernas',
        scheme: '4 x 8',
        anim: 'dbRow',
        primary: ['dorsales', 'espalda_media'],
        secondary: ['biceps', 'hombros', 'lumbar'],
        equipment: DB,
        loaded: true,
        steps: [
          'Rodillas semiflexionadas y tronco inclinado hacia adelante con la espalda recta.',
          'Tira de las mancuernas hacia la cadera llevando los codos hacia atrás.',
          'Junta las escápulas arriba y baja controlado hasta estirar los brazos.',
        ],
        videoSearch: 'remo inclinado con mancuernas técnica',
      },
      {
        id: 'm1-3',
        name: 'Extensión de tríceps tras nuca',
        scheme: '3 x 8',
        anim: 'overheadExt',
        primary: ['triceps'],
        secondary: ['hombros'],
        equipment: 'Una mancuerna sujeta con las dos manos.',
        loaded: true,
        steps: [
          'De pie o sentado, sujeta una mancuerna con las dos manos sobre la cabeza.',
          'Baja la mancuerna detrás de la nuca doblando solo los codos, que apuntan al techo.',
          'Estira los brazos de nuevo sin abrir los codos ni arquear la espalda.',
        ],
        videoSearch: 'extensión de tríceps tras nuca con mancuerna',
      },
      {
        id: 'm1-4',
        name: 'Curl de bíceps',
        scheme: '3 x 8',
        anim: 'curlDb',
        primary: ['biceps'],
        secondary: ['antebrazos'],
        equipment: DB,
        loaded: true,
        steps: [
          'De pie, mancuernas a los lados con las palmas mirando hacia adelante.',
          'Sube las mancuernas doblando los codos, que se quedan pegados al cuerpo.',
          'Aprieta arriba y baja lento, sin balancear el tronco.',
        ],
        videoSearch: 'curl de bíceps con mancuernas técnica',
      },
      {
        id: 'm1-5',
        name: 'Pull over',
        scheme: '3 x 8',
        anim: 'pullover',
        primary: ['dorsales', 'pecho'],
        secondary: ['triceps', 'abdomen'],
        equipment: 'Una mancuerna. Tumbado en el suelo o en un banco.',
        loaded: true,
        steps: [
          'Tumbado boca arriba, sujeta una mancuerna con las dos manos sobre el pecho.',
          'Con los codos un poco flexionados, baja la mancuerna por detrás de la cabeza.',
          'Vuelve a llevarla sobre el pecho apretando dorsales y pecho, sin arquear la espalda.',
        ],
        videoSearch: 'pull over con mancuerna técnica',
      },
      {
        id: 'm1-6',
        name: 'Elevaciones laterales',
        scheme: '3 x 8',
        anim: 'lateralRaise',
        primary: ['hombros'],
        secondary: ['trapecio'],
        equipment: 'Mancuernas ligeras.',
        loaded: true,
        steps: [
          'De pie, mancuernas a los lados y codos apenas flexionados.',
          'Eleva los brazos hacia los lados hasta la altura de los hombros.',
          'Baja lento, sin encoger los hombros ni balancearte.',
        ],
        videoSearch: 'elevaciones laterales con mancuernas técnica',
      },
    ],
  },
  {
    id: 'M2',
    day: 'Mancuernas',
    title: 'Día 2',
    subtitle: 'Piernas + abdomen',
    exercises: [
      {
        id: 'm2-1',
        name: 'Sentadilla',
        scheme: '4 x 8',
        anim: 'squatDb',
        primary: ['cuadriceps', 'gluteos'],
        secondary: ['isquios', 'abdomen', 'lumbar'],
        equipment: 'Una mancuerna sujeta frente al pecho (sentadilla goblet).',
        loaded: true,
        steps: [
          'Pies al ancho de los hombros, mancuerna pegada al pecho.',
          'Baja llevando la cadera atrás y abajo, con las rodillas en la dirección de los pies.',
          'Llega hasta donde mantengas la espalda recta y sube empujando con todo el pie.',
        ],
        videoSearch: 'sentadilla goblet con mancuerna técnica',
      },
      {
        id: 'm2-2',
        name: 'Peso muerto rumano',
        scheme: '3 x 8',
        anim: 'rdl',
        primary: ['isquios', 'gluteos'],
        secondary: ['lumbar', 'antebrazos'],
        equipment: DB,
        loaded: true,
        steps: [
          'De pie, mancuernas delante de los muslos y rodillas apenas flexionadas.',
          'Lleva la cadera hacia atrás y baja las mancuernas pegadas a las piernas con la espalda recta.',
          'Cuando sientas el estiramiento detrás de los muslos, sube apretando los glúteos.',
        ],
        videoSearch: 'peso muerto rumano con mancuernas técnica',
      },
      {
        id: 'm2-3',
        name: 'Zancadas',
        scheme: '2 x 8 por pierna',
        anim: 'lunge',
        primary: ['cuadriceps', 'gluteos'],
        secondary: ['isquios'],
        equipment: DB,
        loaded: true,
        steps: [
          'Da un paso largo hacia adelante con el tronco recto y las mancuernas a los lados.',
          'Baja hasta que la rodilla de atrás casi toque el suelo y la de adelante quede sobre el pie.',
          'Empuja con el talón de adelante para volver y alterna las piernas.',
        ],
        videoSearch: 'zancadas con mancuernas técnica',
      },
      {
        id: 'm2-4',
        name: 'Elevaciones de talones',
        scheme: '3 x 15',
        anim: 'calfRaise',
        primary: ['gemelos'],
        equipment: 'Mancuernas. Si puedes, con las puntas sobre un escalón.',
        loaded: true,
        steps: [
          'De pie, mancuernas a los lados y piernas estiradas.',
          'Sube sobre las puntas de los pies lo más alto que puedas.',
          'Aguanta un segundo arriba y baja lento.',
        ],
        videoSearch: 'elevación de talones con mancuernas',
      },
      {
        id: 'm2-5',
        name: 'Puente de glúteos',
        scheme: '3 x 8',
        anim: 'gluteBridge',
        primary: ['gluteos'],
        secondary: ['isquios', 'lumbar'],
        equipment: 'Peso corporal o una mancuerna apoyada sobre la cadera.',
        loaded: true,
        steps: [
          'Tumbado boca arriba, rodillas dobladas y pies apoyados cerca de la cadera.',
          'Empuja con los talones y sube la cadera hasta alinear rodillas, cadera y hombros.',
          'Aprieta los glúteos arriba un segundo y baja controlado.',
        ],
        videoSearch: 'puente de glúteos con mancuerna técnica',
      },
      {
        id: 'm2-6',
        name: 'Crunch abdominal',
        scheme: '3 x 8',
        anim: 'crunch',
        primary: ['abdomen'],
        secondary: ['oblicuos'],
        equipment: 'Peso corporal.',
        steps: [
          'Tumbado boca arriba, rodillas dobladas y manos detrás de la cabeza sin tirar del cuello.',
          'Despega los hombros del suelo contrayendo el abdomen.',
          'Baja lento sin apoyar del todo la cabeza.',
        ],
        videoSearch: 'crunch abdominal técnica correcta',
      },
    ],
  },
  {
    id: 'M3',
    day: 'Mancuernas',
    title: 'Día 3',
    subtitle: 'Tren superior',
    exercises: [
      {
        id: 'm3-1',
        name: 'Flexiones declinadas',
        scheme: '4 x 8',
        anim: 'declinePushup',
        primary: ['pecho', 'hombros'],
        secondary: ['triceps', 'abdomen'],
        equipment: 'Pies sobre una silla, banco o escalón firme.',
        steps: [
          'Pies apoyados en la superficie elevada y manos en el suelo, algo más abiertas que los hombros.',
          'Baja con el cuerpo recto hasta que el pecho casi toque el suelo.',
          'Empuja fuerte y sube sin hundir la cadera.',
        ],
        videoSearch: 'flexiones declinadas técnica',
      },
      {
        id: 'm3-2',
        name: 'Remo unilateral',
        scheme: '4 x 8 por brazo',
        anim: 'oneArmRow',
        primary: ['dorsales', 'espalda_media'],
        secondary: ['biceps', 'hombros'],
        equipment: 'Una mancuerna y un apoyo firme (banco, silla o cama).',
        loaded: true,
        steps: [
          'Apoya una mano y la rodilla del mismo lado; espalda recta y paralela al suelo.',
          'Tira de la mancuerna hacia la cadera con el codo pegado al cuerpo.',
          'Baja hasta estirar el brazo y completa las repeticiones antes de cambiar de lado.',
        ],
        youtubeId: 'fZYGcNtMWSc',
      },
      {
        id: 'm3-3',
        name: 'Flexiones diamante',
        scheme: '3 x 8',
        anim: 'pushup',
        primary: ['triceps'],
        secondary: ['pecho', 'hombros', 'abdomen'],
        equipment: 'Peso corporal. Si cuestan, apoya las rodillas.',
        steps: [
          'Junta las manos bajo el pecho formando un rombo con pulgares e índices.',
          'Baja con los codos pegados al cuerpo hasta rozar las manos con el pecho.',
          'Empuja hasta estirar los brazos manteniendo el cuerpo recto.',
        ],
        videoSearch: 'flexiones diamante técnica',
      },
      {
        id: 'm3-4',
        name: 'Curl martillo',
        scheme: '3 x 8',
        anim: 'curlHammer',
        primary: ['biceps', 'antebrazos'],
        equipment: DB,
        loaded: true,
        steps: [
          'De pie, mancuernas a los lados con las palmas mirándose entre sí.',
          'Sube las mancuernas sin girar las muñecas y con los codos pegados al cuerpo.',
          'Baja lento hasta estirar los brazos.',
        ],
        videoSearch: 'curl martillo con mancuernas técnica',
      },
      {
        id: 'm3-5',
        name: 'Press militar con mancuernas',
        scheme: '3 x 8',
        anim: 'ohpDb',
        primary: ['hombros'],
        secondary: ['triceps', 'trapecio', 'abdomen'],
        equipment: DB,
        loaded: true,
        steps: [
          'De pie o sentado, mancuernas a la altura de los hombros y abdomen apretado.',
          'Empuja las mancuernas hacia arriba hasta estirar los brazos sobre la cabeza.',
          'Baja controlado hasta los hombros sin arquear la zona lumbar.',
        ],
        videoSearch: 'press militar con mancuernas técnica',
      },
      {
        id: 'm3-6',
        name: 'Pájaros',
        scheme: '3 x 8',
        anim: 'reverseFly',
        primary: ['hombros', 'espalda_media'],
        secondary: ['trapecio'],
        equipment: 'Mancuernas ligeras.',
        loaded: true,
        steps: [
          'Inclina el tronco hacia adelante con la espalda recta y las mancuernas colgando bajo el pecho.',
          'Abre los brazos hacia los lados con los codos un poco flexionados, juntando las escápulas.',
          'Sube hasta la altura de los hombros y baja lento.',
        ],
        videoSearch: 'pájaros con mancuernas deltoides posterior técnica',
      },
    ],
  },
  {
    id: 'M4',
    day: 'Mancuernas',
    title: 'Día 4',
    subtitle: 'Piernas + abdomen',
    exercises: [
      {
        id: 'm4-1',
        name: 'Sentadilla búlgara',
        scheme: '4 x 8 por pierna',
        anim: 'bulgarianSquat',
        primary: ['cuadriceps', 'gluteos'],
        secondary: ['isquios', 'abdomen'],
        equipment: 'Mancuernas y una silla o banco detrás de ti.',
        loaded: true,
        steps: [
          'Apoya el empeine del pie de atrás en la silla y adelanta el otro pie un paso largo.',
          'Baja recto hasta que el muslo de adelante quede casi paralelo al suelo.',
          'Sube empujando con el talón de adelante; completa las repeticiones y cambia de pierna.',
        ],
        videoSearch: 'sentadilla búlgara con mancuernas técnica',
      },
      {
        id: 'm4-2',
        name: 'Abdominales con rotación',
        scheme: '4 x 8 por lado',
        anim: 'bicycleCrunch',
        primary: ['oblicuos', 'abdomen'],
        equipment: 'Peso corporal.',
        steps: [
          'Tumbado boca arriba, manos detrás de la cabeza y piernas elevadas.',
          'Lleva un codo hacia la rodilla contraria mientras estiras la otra pierna.',
          'Alterna los lados de forma controlada, sin tirar del cuello.',
        ],
        videoSearch: 'abdominales bicicleta con rotación técnica',
      },
    ],
  },
]

export const ALL_ROUTINES: Routine[] = [...ROUTINES, ...DUMBBELL_ROUTINES]
