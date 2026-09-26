import React from 'react'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Deportimon crashed:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="onboarding" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>😵‍💫</div>
          <h1 style={{ fontSize: 20 }}>Algo salió mal</h1>
          <p className="lead">
            Puede que tu navegador tenga guardada una versión vieja de la app. Recarga la página
            para solucionarlo.
          </p>
          <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => window.location.reload()}>
            Recargar
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
