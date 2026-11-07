export type MuscleId =
  | 'pecho'
  | 'hombros'
  | 'biceps'
  | 'triceps'
  | 'antebrazos'
  | 'dorsales'
  | 'trapecio'
  | 'espalda_media'
  | 'lumbar'
  | 'abdomen'
  | 'oblicuos'

export const MUSCLE_LABEL: Record<MuscleId, string> = {
  pecho: 'Pecho',
  hombros: 'Hombros',
  biceps: 'Bíceps',
  triceps: 'Tríceps',
  antebrazos: 'Antebrazos',
  dorsales: 'Dorsales',
  trapecio: 'Trapecio',
  espalda_media: 'Espalda media',
  lumbar: 'Zona lumbar',
  abdomen: 'Abdomen',
  oblicuos: 'Oblicuos',
}
