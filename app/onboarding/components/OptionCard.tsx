'use client'

import { Box, Card, Typography, useTheme, useMediaQuery } from '@mui/material'
import { ReactNode } from 'react'

interface OptionCardProps {
  title: string
  description?: string
  icon?: ReactNode
  selected?: boolean
  onClick?: () => void
}

export default function OptionCard({
  title,
  description,
  icon,
  selected = false,
  onClick,
}: OptionCardProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Card
      onClick={onClick}
      sx={{
        p: 3,
        mb: 1,
        cursor: onClick ? 'pointer' : 'default',
        borderRadius: 1.5,
        border: selected ? '2px solid #F8A01B' : '1px solid #E0E0E0',
        background: selected ? 'rgba(248, 160, 27, 0.05)' : 'white',
        transition: 'all 0.3s ease',
        '&:hover': onClick
          ? {
              borderColor: '#F8A01B',
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 24px rgba(248, 160, 27, 0.15)',
            }
          : {},
      }}
    >
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
        {icon && (
          <Box
            sx={{
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: selected ? '#F8A01B' : '#F5F5F5',
              borderRadius: '12px',
              color: selected ? 'white' : '#666',
              fontSize: '1.5rem',
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        )}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: isMobile ? '0.95rem' : '1.1rem',
              fontWeight: 600,
              color: '#1a1a1a',
              mb: 0.5,
            }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              sx={{
                fontSize: '0.9rem',
                color: '#666',
                lineHeight: 1.5,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
        {onClick && (
          <Box
            sx={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: selected ? '2px solid #F8A01B' : '2px solid #DDD',
              background: selected ? '#F8A01B' : 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.3s ease',
            }}
          >
            {selected && (
              <span style={{ color: 'white', fontWeight: 'bold' }}>✓</span>
            )}
          </Box>
        )}
      </Box>
    </Card>
  )
}
