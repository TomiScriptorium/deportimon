import React from 'react'

type IconProps = { size?: number }

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function HomeIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
    </svg>
  )
}

export function DumbbellIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M6.5 7v10M17.5 7v10" />
      <path d="M3.5 9.5v5M20.5 9.5v5" />
      <path d="M6.5 12h11" />
    </svg>
  )
}

export function ChartIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 15l3-4 3 2 4-6" />
    </svg>
  )
}

export function AppleIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 7c-3 0-5 2.2-5 6 0 4 2.3 7.5 4 7.5.9 0 1.2-.5 2-.5s1.1.5 2 .5c1.9 0 4-3.7 4-6.8 0-1.2-.4-2.2-1-3" />
      <path d="M12 7c0-1.7 1-3 2.5-3.3" />
      <path d="M9.6 7c-.2-1.6.8-3 2-3.3" />
    </svg>
  )
}

export function ChecklistIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="m4 6 1 1 2-2" />
      <path d="m4 12 1 1 2-2" />
      <path d="m4 18 1 1 2-2" />
    </svg>
  )
}

export function ChevronRightIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

export function ChevronLeftIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="m15 6-6 6 6 6" />
    </svg>
  )
}

export function PlayIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export function PlusIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function CloseIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

export function CheckIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="m5 13 4 4L19 7" />
    </svg>
  )
}

export function FlameIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 3c1 3-3 4-3 8a3 3 0 0 0 6 0c0-1-.5-1.8-1-2.5.8.3 3 1.8 3 5a5 5 0 0 1-10 0c0-4 2-6 5-10.5z" />
    </svg>
  )
}

export function DropIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 3s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11z" />
    </svg>
  )
}

export function MoonIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" />
    </svg>
  )
}

export function WalkIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="13" cy="4" r="1.5" fill="currentColor" stroke="none" />
      <path d="M10 8l3-1.5 2 2 3 1M9 22l2-6-2-3 1-5M13 16l3 2 2 4" />
    </svg>
  )
}

export function ScaleIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M12 8v4l3 2" />
    </svg>
  )
}

export function RulerIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="3" y="8" width="18" height="8" rx="2" transform="rotate(-8 12 12)" />
      <path d="M7 9.5v2M10 9v2.5M13 8.5v2M16 8v2.5" />
    </svg>
  )
}

export function CalendarIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="3.5" y="5" width="17" height="16" rx="3" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  )
}

export function TargetIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
    </svg>
  )
}

export function CameraIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
      <circle cx="12" cy="13.5" r="3.4" />
    </svg>
  )
}

export function BarbellIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M2 12h3M19 12h3" />
      <path d="M5 9v6M19 9v6" />
      <path d="M7 12h10" />
    </svg>
  )
}

export function TrashIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4 7h16" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
    </svg>
  )
}

export function ExternalLinkIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
    </svg>
  )
}
