import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { ChevronLeftIcon } from './icons'

interface TopBarProps {
  title: string
  subtitle?: string
  back?: boolean
}

export function TopBar({ title, subtitle, back }: TopBarProps) {
  const { profile } = useData()
  const navigate = useNavigate()
  const initial = profile?.name?.trim()?.[0]?.toUpperCase() ?? '?'

  return (
    <header className="top-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        {back && (
          <button
            onClick={() => navigate(-1)}
            aria-label="Volver"
            style={{ display: 'flex', color: 'var(--accent)', flexShrink: 0 }}
          >
            <ChevronLeftIcon size={26} />
          </button>
        )}
        <div style={{ minWidth: 0 }}>
          <h1 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</h1>
          {subtitle && <div className="subtitle">{subtitle}</div>}
        </div>
      </div>
      <button className="avatar-btn" onClick={() => navigate('/perfil')} aria-label="Perfil">
        {initial}
      </button>
    </header>
  )
}
