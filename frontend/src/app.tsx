import { Toaster } from '@components/ui/toast'
import { AuthProvider } from '@contexts/auth-context'
import { ThemeProvider } from '@contexts/theme-context'
import { Router } from '@router/index'
import { ThemeToggle } from './components/theme-toggle'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <Router />

        <Toaster />

        <div className="fixed top-4 right-4">
          <ThemeToggle />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}
