import { ThemeContext } from '@contexts/theme-context'
import { use } from 'react'

export const useTheme = () => {
  const context = use(ThemeContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
