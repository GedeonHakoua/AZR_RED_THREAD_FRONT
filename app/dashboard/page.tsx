'use client'

import { Box, Button, Container, Typography, Paper, Grid } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import '../globals.css'
import { useMsal } from '@azure/msal-react'


export default function DashboardPage() {
  const router = useRouter()

  const { accounts } = useMsal()
  console.log('Comptes MSAL :', accounts)
  console.log('Connecté :', accounts.length > 0)
  console.log('Email :', accounts[0]?.username)
  return (
    
    <Box sx={{ minHeight: '100vh', background: '#F5F5F5', py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 6,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Image src="/logo-square.svg" alt="Logo" width={48} height={48} />
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a' }}>
              Dashboard
            </Typography>
          </Box>
          <Button
            onClick={() => router.push('/login')}
            variant="outlined"
            sx={{
              borderColor: '#DDD',
              color: '#1a1a1a',
              borderRadius: 2,
              '&:hover': { borderColor: '#999' },
            }}
          >
            Sign Out
          </Button>
        </Box>

        {/* Welcome Section */}
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #F8A01B 0%, #A445C7 100%)',
            color: 'white',
            mb: 6,
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Welcome to Your Dashboard
          </Typography>
          <Typography sx={{ fontSize: '1.1rem', opacity: 0.95 }}>
            You&apos;ve successfully completed the onboarding process. Your account is ready to
            use!
          </Typography>
        </Paper>

        {/* Features Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {[
            { title: 'Analytics', description: 'Track your performance and insights' },
            { title: 'Settings', description: 'Customize your preferences' },
            { title: 'Team', description: 'Manage your team members' },
            { title: 'Reports', description: 'Generate detailed reports' },
          ].map((feature, idx) => (
            <Grid size={{ xs: 12, sm: 6 }} key={idx}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  border: '1px solid #E0E0E0',
                  background: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#F8A01B',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(248, 160, 27, 0.1)',
                  },
                  cursor: 'pointer',
                }}
              >
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                  {feature.title}
                </Typography>
                <Typography sx={{ color: '#666', fontSize: '0.95rem' }}>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: 3,
            background: 'white',
            border: '1px solid #E0E0E0',
            textAlign: 'center',
            
          }}
        >
          <Typography sx={{ mb: 3, color: '#666' }}>
            Want to explore more features? Check out our documentation.
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: '#F8A01B',
              color: 'white',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              '&:hover': { background: '#E09015' },
            }}
          >
            Visit Docs
          </Button>
        </Paper>
      </Container>
    </Box>
  )
}
