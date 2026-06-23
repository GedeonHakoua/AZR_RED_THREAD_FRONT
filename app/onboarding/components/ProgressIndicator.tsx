'use client'

import { Box, LinearProgress, Typography } from '@mui/material'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography
          sx={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#F8A01B',
          }}
        >
          STEP {currentStep} of {totalSteps}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.85rem',
            color: '#999',
            fontWeight: 500,
          }}
        >
          {Math.round(progress)}% Complete
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 6,
          borderRadius: 3,
          background: '#E0E0E0',
          '& .MuiLinearProgress-bar': {
            background: 'linear-gradient(90deg, #F8A01B, #A445C7)',
            borderRadius: 3,
          },
        }}
      />
    </Box>
  )
}
