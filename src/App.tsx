import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useData } from './context/DataContext'
import { Onboarding } from './pages/Onboarding'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { RutinaHome } from './pages/RutinaHome'
import { RoutineDetail } from './pages/RoutineDetail'
import { PullupPage } from './pages/PullupPage'
import { Progreso } from './pages/Progreso'
import { Nutricion } from './pages/Nutricion'
import { Habitos } from './pages/Habitos'
import { Perfil } from './pages/Perfil'

export default function App() {
  const { profile, theme } = useData()

  useEffect(() => {
    if (theme === 'system') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  if (!profile) {
    return <Onboarding />
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/rutina" element={<RutinaHome />} />
        <Route path="/rutina/dominadas" element={<PullupPage />} />
        <Route path="/rutina/:routineId" element={<RoutineDetail />} />
        <Route path="/progreso" element={<Progreso />} />
        <Route path="/nutricion" element={<Nutricion />} />
        <Route path="/habitos" element={<Habitos />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
