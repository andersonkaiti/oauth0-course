import { Toaster } from '@components/ui/toast'
import { AuthProvider } from '@contexts/auth-context'
import { ThemeProvider } from '@contexts/theme-context'
import { Router } from '@router/index'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeToggle } from './components/theme-toggle'
import { queryClient } from './lib/query-client'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />

          <Toaster />

          <div className="fixed top-4 right-4">
            <ThemeToggle />
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
