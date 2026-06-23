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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate login - in real app would call API
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
            maxWidth: '420px',
            p: 4,
            borderRadius: 3,
            background: 'white',
          }}
        >
          {/* Logo */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <Image
              src="/logo-square.svg"
              alt="Logo"
              width={60}
              height={60}
            />
          </Box>

          <Typography
            variant="h3"
            sx={{
              mb: 1,
              textAlign: 'center',
              fontWeight: 700,
              color: '#1a1a1a',
            }}
          >
            Sign In
          </Typography>
          <Typography
            sx={{
              mb: 4,
              textAlign: 'center',
              color: '#666',
              fontSize: '0.95rem',
            }}
          >
            Enter your credentials to continue
          </Typography>

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              placeholder="your@email.com"
              required
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              placeholder="••••••••"
              required
              sx={{
                mb: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <Box sx={{ mb: 3, textAlign: 'right' }}>
              <Link
                href="#"
                sx={{
                  fontSize: '0.85rem',
                  color: '#F8A01B',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                mb: 2,
                background: '#F8A01B',
                color: 'white',
                '&:hover': { background: '#E09015' },
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>

          <Typography sx={{ textAlign: 'center', color: '#666', mb: 2 }}>
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              sx={{
                color: '#F8A01B',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
  )
}
