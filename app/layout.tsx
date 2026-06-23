'use client'

import React, { useMemo, useState } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Analytics } from '@vercel/analytics/next'
import '@fontsource/figtree/400.css'
import '@fontsource/figtree/500.css'
import '@fontsource/figtree/600.css'
import '@fontsource/figtree/700.css'
import ThemeContext, { ThemeMode } from '../lib/ThemeContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [mode, setMode] = useState<ThemeMode>('light')

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        primary: {
          main: '#F8A01B',
        },
        secondary: {
          main: '#A445C7',
        },
        background: {
          default: mode === 'light' ? '#F5F5F5' : '#070712',
          paper: mode === 'light' ? '#FFFFFF' : '#0b0b0f',
        },
      },
      typography: {
        fontFamily: 'Figtree, sans-serif',
        h1: { fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em' },
        h2: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.01em' },
        h3: { fontSize: '1.5rem', fontWeight: 600 },
        body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.6 },
        body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6 },
      },
      shape: { borderRadius: 16 },
      components: {
        MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 600, borderRadius: 12 } } },
        MuiCard: { styleOverrides: { root: { borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' } } },
      },
    }),
    [mode]
  )

  return (
    <html lang="en">
      <head>
        <title>Taskit Onboarding</title>
        <meta name="description" content="Modern onboarding experience" />
        <meta name="theme-color" content="#F8A01B" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <ThemeContext.Provider value={{ mode, setMode }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </ThemeProvider>
        </ThemeContext.Provider>
      </body>
    </html>
  )
}
