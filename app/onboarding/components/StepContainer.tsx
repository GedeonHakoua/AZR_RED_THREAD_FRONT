'use client'

import { Box, Paper, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface StepContainerProps {
  stepNumber: number
  title: string
  description?: string
  children: ReactNode
}

export default function StepContainer({
  stepNumber,
  title,
  description,
  children,
}: StepContainerProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        maxWidth: '600px',
        p: { xs: 3, md: 5 },
        borderRadius: 3,
        background: 'white',
        animation: 'fadeIn 0.5s ease-in-out',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#F8A01B',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '1rem',
          }}
        >
          {stepNumber}
        </Box>
        <Typography sx={{ color: '#999', fontSize: '0.9rem' }}>
          Step {stepNumber} of 7
        </Typography>
      </Box>

      <Typography
        variant="h2"
        sx={{
          mb: description ? 2 : 3,
          fontWeight: 700,
          color: '#1a1a1a',
          fontSize: { xs: '1.8rem', md: '2.2rem' },
        }}
      >
        {title}
      </Typography>

      {description && (
        <Typography
          sx={{
            mb: 4,
            color: '#666',
            fontSize: '1rem',
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
      )}

      <Box>{children}</Box>
    </Paper>
  )
}
