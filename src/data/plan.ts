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
