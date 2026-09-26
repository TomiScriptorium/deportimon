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
    detail: 'Si no llegas con energía, puedes pasarla al viernes.',
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
    detail: 'Tu mejor día: llegas temprano. La sesión más completa.',
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
    detail: 'Tercera sesión de fuerza de la semana.',
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
    { id: 'min-goblet', name: 'Sentadilla goblet con el tambor', scheme: '2 x lo que salga', youtubeId: 'BaT4gHjcYqo' },
    { id: 'min-flexiones', name: 'Flexiones', scheme: '2 x lo que salga', youtubeId: 'hbGR_wq7wzo' },
    { id: 'min-remo', name: 'Remo con barra', scheme: '2 x lo que salga', youtubeId: 'jHsrWv-0Tgc' },
  ],
}

export const ROUTINES: Routine[] = [
  {
    id: 'A',
    day: 'Lunes',
    title: 'Rutina A',
    subtitle: 'Cuerpo completo',
    exercises: [
      {
        id: 'a1',
        name: 'Sentadilla goblet con el tambor de 9 kg',
        scheme: '3 x 10-15',
        youtubeId: 'BaT4gHjcYqo',
        cue: 'Pecho arriba, rodillas siguiendo la punta de los pies.',
      },
      {
        id: 'a2',
        name: 'Flexiones (manos elevadas si hace falta)',
        scheme: '3 x lo que salga con buena técnica',
        youtubeId: 'hbGR_wq7wzo',
        cue: 'Cuerpo en línea recta, baja controlado.',
      },
      {
        id: 'a3',
        name: 'Remo inclinado con barra',
        scheme: '3 x 10-12',
        youtubeId: 'jHsrWv-0Tgc',
        cue: 'Espalda recta, codos cerca del cuerpo.',
      },
      {
        id: 'a4',
        name: 'Puente de glúteo con el tambor sobre la cadera',
        scheme: '3 x 12-15',
        youtubeId: 'Y572Gf2v4ZI',
        cue: 'Aprieta glúteo arriba, sube en línea recta.',
      },
      {
        id: 'a5',
        name: 'Plancha',
        scheme: '3 x 20-40 s',
        youtubeId: 'd0atctiI7Vw',
        cue: 'Abdomen y glúteo apretados, cadera no cae.',
      },
    ],
  },
  {
    id: 'B',
    day: 'Jueves',
    title: 'Rutina B',
    subtitle: 'La sesión más completa',
    exercises: [
      {
        id: 'b1',
        name: 'Sentadilla búlgara con peso en las manos',
        scheme: '3 x 8-12 por pierna',
        youtubeId: '1ESNjB6mlpI',
        cue: 'Pie de atrás elevado, baja recto.',
      },
      {
        id: 'b2',
        name: 'Press de hombro con barra',
        scheme: '3 x 8-12',
        youtubeId: 'OHxSwnkSxB8',
        cue: 'Core apretado, no arquees la espalda baja.',
      },
      {
        id: 'b3',
        name: 'Peso muerto rumano con barra o bidones',
        scheme: '3 x 10-12',
        youtubeId: 'rjvlSfZ-PQw',
        cue: 'Cadera hacia atrás, espalda neutra.',
      },
      {
        id: 'b4',
        name: 'Remo a una mano con mancuerna',
        scheme: '3 x 10-12 por lado',
        youtubeId: 'fZYGcNtMWSc',
        cue: 'Guía con el codo, no gires el tronco.',
      },
      {
        id: 'b5',
        name: 'Elevación de talones',
        scheme: '2 x 15-20',
        youtubeId: 'iBLMXdrnQWU',
        cue: 'Sube al máximo, baja controlado.',
      },
    ],
  },
  {
    id: 'C',
    day: 'Sábado',
    title: 'Rutina C',
    subtitle: 'Cuerpo completo con más carga',
    exercises: [
      {
        id: 'c1',
        name: 'Zancadas cargadas',
        scheme: '3 x 10 por pierna',
        youtubeId: 'NcfHM8GYEJU',
        cue: 'Paso amplio, rodilla de atrás casi toca el suelo.',
        equipment: 'Barra de 5,7 kg con discos de 5 kg sobre la espalda, o tambor y mancuerna en las manos.',
      },
      {
        id: 'c2',
        name: 'Press de pecho en el suelo con barra',
        scheme: '3 x 8-12',
        youtubeId: 'z-bMvgs5oEE',
        cue: 'Los codos tocan el suelo antes de empujar de nuevo.',
        equipment: 'Barra de 3 kg con discos de 5 kg (13 kg); sube a 19,7 kg cuando lo domines.',
      },
      {
        id: 'c3',
        name: 'Remo invertido bajo la mesa',
        scheme: '3 x 6-10',
        youtubeId: 'cczgGh3YdWE',
        cue: 'Comprueba antes que la mesa aguante tu peso y no se deslice.',
        equipment: 'Peso corporal (después, con un disco sobre el pecho).',
      },
      {
        id: 'c4',
        name: 'Puente de glúteo a una pierna con carga',
        scheme: '3 x 10-12 por lado',
        youtubeId: 'Y572Gf2v4ZI',
        cue: 'Cadera nivelada, sin rotar.',
        equipment: 'Tambor de 9 kg o un disco de 7 kg sobre la cadera.',
      },
      {
        id: 'c5',
        name: 'Curl de bíceps con barra',
        scheme: '3 x 10-12',
        youtubeId: 'uDLZNOqv3EA',
        cue: 'Codos pegados al torso, sin balancear el cuerpo.',
        equipment: 'Barra de 3 kg y luego con discos.',
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
  'Sin mochila resistente: carga piernas con el tambor de 9 kg, un disco de 7 kg contra el pecho, la mancuerna de 4,75 kg, la barra a los lados o bidones de agua (5 L = 5 kg).',
]

export const PROGRESSION_TIPS = [
  'Cuando completes todas las series en el tope del rango con buena técnica, sube algo de carga (un disco más o más agua en los bidones).',
  'Si ya no puedes subir peso: baja en 3 segundos y haz una pausa de 2 segundos abajo.',
  'Pasa a ejercicios a una pierna o un brazo.',
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
  'Pídele a tu mamá más proteína en el almuerzo: es el cambio que más pesa.',
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
