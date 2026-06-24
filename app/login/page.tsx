'use client'

import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Link,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleLogin = () => {
    setLoading(true)
    // Simulate Microsoft SSO flow
    setTimeout(() => {
      setLoading(false)
      router.push('/onboarding')
    }, 1000)
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* Right side - Login Form (full width; left welcome removed) */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: isMobile ? 3 : 6,
          background: '#F5F5F5',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: '520px',
            p: 4,
            borderRadius: 2,
            background: 'white',
          }}
        >
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
            <Image src="/logo-square.svg" alt="Logo" width={68} height={68} />
          </Box>

          <Typography variant="h3" sx={{ mb: 1, textAlign: 'center', fontWeight: 700, color: '#1a1a1a' }}>
            Welcome to Taskit
          </Typography>

          <Typography sx={{ mb: 3, textAlign: 'center', color: '#666', fontSize: '0.95rem' }}>
            Sign in with your Microsoft account to continue. Your organization uses Azure AD for secure single sign-on.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Image src="/login.svg" alt="Login art" width={420} height={300} />
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ color: '#444', fontSize: '0.9rem', mb: 2 }}>
              Secure sign-in via Azure Active Directory
            </Typography>

            <Button
              onClick={handleLogin}
              disabled={loading}
              sx={{
                minWidth: 260,
                py: 1.5,
                px: 4,
                background: '#0078D4',
                color: 'white',
                borderRadius: 99,
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: loading ? '0 6px 18px rgba(0,120,212,0.18)' : '0 6px 18px rgba(0,0,0,0.06)',
                transition: 'transform 260ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms ease, opacity 180ms ease',
                '&:hover': {
                  transform: 'translateY(-2px) scale(1.01)',
                  boxShadow: '0 10px 26px rgba(0,0,0,0.12)'
                },
                '&:active': { transform: 'translateY(0) scale(0.995)' },
                '&.Mui-disabled': { opacity: 0.9, transform: 'none' },
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {!loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
                    {/* Inline Microsoft logo - four squares */}
                    <Box component="span" sx={{ width: 18, height: 18, display: 'inline-block' }} aria-hidden>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="10" height="10" rx="1" fill="#F35325" />
                        <rect x="12" y="2" width="10" height="10" rx="1" fill="#81BC06" />
                        <rect x="2" y="12" width="10" height="10" rx="1" fill="#05A6F0" />
                        <rect x="12" y="12" width="10" height="10" rx="1" fill="#FFD700" />
                      </svg>
                    </Box>
                  </Box>
                  <Box component="span">Sign in with Microsoft</Box>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} aria-live="polite">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 0.5 }}>
                    <Image src="/Loader.svg" alt="loader" width={18} height={18} />
                  </Box>
                  <Box component="span">Chargement...</Box>
                </Box>
              )}
            </Button>

            <Typography sx={{ mt: 3, color: '#999', fontSize: '0.85rem' }}>
              By continuing you agree to your organization&apos;s sign-in policy.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}
