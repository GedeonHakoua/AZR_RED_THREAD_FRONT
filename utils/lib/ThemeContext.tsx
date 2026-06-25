"use client"

import React from 'react'

export type ThemeMode = 'light' | 'dark'

export const ThemeContext = React.createContext<{
  mode: ThemeMode
  setMode: (m: ThemeMode) => void
}>({
  mode: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMode: () => {},
})

export default ThemeContext
