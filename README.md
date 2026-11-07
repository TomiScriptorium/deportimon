# Deportimon

App web personal para llevar tu recomposición corporal: rutinas de tren
superior y abdominales con un avatar animado por ejercicio, registro de peso y
medidas, guía de nutrición y seguimiento de hábitos. Diseño moderno, estilo app iOS.

## Módulos

- **Inicio** — resumen del día, plan semanal y accesos rápidos.
- **Rutina** — rutinas A/B/C de tren superior + abdominales. Cada ejercicio
  muestra un avatar animado (SVG propio) con el músculo trabajado resaltado, un
  mapa muscular de frente y espalda, los pasos de la técnica y un video de
  referencia opcional. También sesión mínima, progresión a dominada y tabla de
  cargas en la barra.
- **Progreso** — historial y gráfico de peso, medidas mensuales con fotos,
  expectativas a 3/6/12 meses.
- **Nutrición** — objetivo calórico y de proteína, horario de comidas.
- **Hábitos** — sueño, agua, movimiento diario y cardio.
- **Perfil** — datos personales, apariencia (claro/oscuro) y datos locales.

Los datos se guardan localmente en el navegador (localStorage); no hay
backend ni cuenta.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción
```
