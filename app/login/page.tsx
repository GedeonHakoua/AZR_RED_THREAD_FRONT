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
      {/* Left side - Image */}
      {!isMobile && (
        <Box
          sx={{
            flex: 1,
            background: 'linear-gradient(135deg, #A445C7 0%, #8A3AAE 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              top: '-100px',
              right: '-100px',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              bottom: '-100px',
              left: '50px',
            }}
          />
          <Box sx={{ textAlign: 'center', zIndex: 1 }}>
            <Typography
              sx={{
                color: 'white',
                fontSize: '3rem',
                fontWeight: 700,
                mb: 2,
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.1rem',
                fontWeight: 400,
              }}
            >
              Get started with your premium experience
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Image src="/login.svg" alt="Login art" width={300} height={220} />
            </Box>
          </Box>
        </Box>
      )}

      {/* Right side - Login Form */}
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
                boxShadow: loading ? '0 6px 18px rgba(0,120,212,0.24)' : 'none',
                transition: 'all 220ms ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {!loading ? (
                'Sign in with Microsoft'
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: 'white', opacity: 0.95, animation: 'pulse 1s infinite', '@keyframes pulse': { '0%': { transform: 'scale(1)', opacity: 0.95 }, '50%': { transform: 'scale(1.4)', opacity: 0.6 }, '100%': { transform: 'scale(1)', opacity: 0.95 } } }} />
                  <Box component="span">Signing in…</Box>
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
