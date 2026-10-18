import { render } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import type { ReactElement } from 'react'
import { theme } from '../theme'

export function renderWithTheme(ui: ReactElement) {
  return render(ui, {
    wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
  })
}
