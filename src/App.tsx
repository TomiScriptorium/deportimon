import React, { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useData } from './context/DataContext'
import { Onboarding } from './pages/Onboarding'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { RutinaHome } from './pages/RutinaHome'
import { RoutineDetail } from './pages/RoutineDetail'
import { PullupPage } from './pages/PullupPage'
import { Nutricion } from './pages/Nutricion'
import { Habitos } from './pages/Habitos'
import { Perfil } from './pages/Perfil'

const Progreso = lazy(() => import('./pages/Progreso').then((m) => ({ default: m.Progreso })))

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
        <Route
          path="/progreso"
          element={
            <Suspense fallback={<div className="page" />}>
              <Progreso />
            </Suspense>
          }
        />
        <Route path="/nutricion" element={<Nutricion />} />
        <Route path="/habitos" element={<Habitos />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
