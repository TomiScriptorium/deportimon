import React from 'react'
import { Outlet } from 'react-router-dom'
import { BottomTabBar } from './BottomTabBar'

export function Layout() {
  return (
    <div className="app-shell">
      <Outlet />
      <BottomTabBar />
    </div>
  )
}
