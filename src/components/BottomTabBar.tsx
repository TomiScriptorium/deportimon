import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppleIcon, ChartIcon, ChecklistIcon, DumbbellIcon, HomeIcon } from './icons'

const TABS = [
  { to: '/', label: 'Inicio', icon: HomeIcon, end: true },
  { to: '/rutina', label: 'Rutina', icon: DumbbellIcon, end: false },
  { to: '/progreso', label: 'Progreso', icon: ChartIcon, end: false },
  { to: '/nutricion', label: 'Nutrición', icon: AppleIcon, end: false },
  { to: '/habitos', label: 'Hábitos', icon: ChecklistIcon, end: false },
]

export function BottomTabBar() {
  return (
    <nav className="tab-bar">
      {TABS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `tab-item${isActive ? ' active' : ''}`}
        >
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
