'use client'

import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StepContainer from './components/StepContainer'
import ProgressIndicator from './components/ProgressIndicator'
import OptionCard from './components/OptionCard'

const TOTAL_STEPS = 7

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    role: '',
    industry: '',
    experience: '',
    goals: '',
  })
  const [selectedOptions, setSelectedOptions] = useState({
    role: '',
    industry: '',
    experience: '',
    goals: [],
  })

  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleOptionSelect = (field: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleGoalsToggle = (goal: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }))
  }

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName.trim() && formData.lastName.trim()
      case 2:
        return formData.company.trim()
      case 3:
        return selectedOptions.role
      case 4:
        return selectedOptions.industry
      case 5:
        return selectedOptions.experience
      case 6:
        return selectedOptions.goals.length > 0
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    // In a real app, would save to database
    console.log('Onboarding complete:', { formData, selectedOptions })
    router.push('/dashboard')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F5F5F5 0%, #EEEEEE 100%)',
        py: { xs: 4, md: 6 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm" sx={{ width: '100%', px: { xs: 2, sm: 3 } }}>
        {/* Logo */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#F8A01B',
              letterSpacing: '-0.5px',
            }}
          >
            Premium
          </Typography>
        </Box>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <StepContainer
            stepNumber={1}
            title="What&apos;s your name?"
            description="Let us know who we&apos;re working with"
          >
            <Stack gap={2} sx={{ mb: 4 }}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="John"
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 2 },
                }}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Doe"
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 2 },
                }}
              />
            </Stack>
          </StepContainer>
        )}

        {/* Step 2: Company */}
        {currentStep === 2 && (
          <StepContainer
            stepNumber={2}
            title="Which company do you work for?"
            description="This helps us tailor your experience"
          >
            <TextField
              fullWidth
              label="Company Name"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Acme Inc."
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': { borderRadius: 2 },
              }}
            />
          </StepContainer>
        )}

        {/* Step 3: Role */}
        {currentStep === 3 && (
          <StepContainer
            stepNumber={3}
            title="What&apos;s your role?"
            description="Select the one that best describes your position"
          >
            <Stack gap={2} sx={{ mb: 4 }}>
              {['Product Manager', 'Designer', 'Developer', 'Entrepreneur', 'Other'].map(
                (role) => (
                  <OptionCard
                    key={role}
                    title={role}
                    selected={selectedOptions.role === role}
                    onClick={() => handleOptionSelect('role', role)}
                  />
                )
              )}
            </Stack>
          </StepContainer>
        )}

        {/* Step 4: Industry */}
        {currentStep === 4 && (
          <StepContainer
            stepNumber={4}
            title="What industry are you in?"
            description="Help us understand your context"
          >
            <Stack gap={2} sx={{ mb: 4 }}>
              {['Technology', 'Finance', 'Healthcare', 'Retail', 'Other'].map(
                (industry) => (
                  <OptionCard
                    key={industry}
                    title={industry}
                    selected={selectedOptions.industry === industry}
                    onClick={() => handleOptionSelect('industry', industry)}
                  />
                )
              )}
            </Stack>
          </StepContainer>
        )}

        {/* Step 5: Experience */}
        {currentStep === 5 && (
          <StepContainer
            stepNumber={5}
            title="How much experience do you have?"
            description="This helps us set appropriate expectations"
          >
            <Stack gap={2} sx={{ mb: 4 }}>
              {[
                'Less than 1 year',
                '1-3 years',
                '3-5 years',
                '5-10 years',
                '10+ years',
              ].map((exp) => (
                <OptionCard
                  key={exp}
                  title={exp}
                  selected={selectedOptions.experience === exp}
                  onClick={() => handleOptionSelect('experience', exp)}
                />
              ))}
            </Stack>
          </StepContainer>
        )}

        {/* Step 6: Goals */}
        {currentStep === 6 && (
          <StepContainer
            stepNumber={6}
            title="What are your primary goals?"
            description="Select all that apply"
          >
            <Stack gap={2} sx={{ mb: 4 }}>
              {[
                'Increase productivity',
                'Learn new skills',
                'Network with professionals',
                'Advance my career',
                'Build a business',
              ].map((goal) => (
                <OptionCard
                  key={goal}
                  title={goal}
                  selected={selectedOptions.goals.includes(goal)}
                  onClick={() => handleGoalsToggle(goal)}
                />
              ))}
            </Stack>
          </StepContainer>
        )}

        {/* Step 7: Completion */}
        {currentStep === 7 && (
          <StepContainer
            stepNumber={7}
            title="You&apos;re all set!"
            description="Your account has been configured to your preferences"
          >
            <Box
              sx={{
                textAlign: 'center',
                py: 3,
                px: 2,
                background: '#F5F5F5',
                borderRadius: 2,
                mb: 4,
              }}
            >
              <Typography sx={{ fontSize: '3rem', mb: 2 }}>🎉</Typography>
              <Typography sx={{ color: '#666', lineHeight: 1.6 }}>
                Welcome to our platform, {formData.firstName}! You&apos;re ready to start your
                journey. We&apos;ll take you to your dashboard where you can explore all the
                amazing features.
              </Typography>
            </Box>
          </StepContainer>
        )}

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 4,
            justifyContent: currentStep === 1 ? 'flex-end' : 'space-between',
          }}
        >
          {currentStep > 1 && (
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{
                px: 4,
                py: 1.5,
                borderColor: '#DDD',
                color: '#1a1a1a',
                borderRadius: 2,
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#999',
                  background: '#F5F5F5',
                },
              }}
            >
              Back
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!canProceedToNextStep()}
            sx={{
              px: 4,
              py: 1.5,
              background: canProceedToNextStep() ? '#F8A01B' : '#DDD',
              color: canProceedToNextStep() ? 'white' : '#999',
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': canProceedToNextStep()
                ? {
                    background: '#E09015',
                  }
                : {},
            }}
          >
            {currentStep === TOTAL_STEPS ? 'Get Started' : 'Continue'}
          </Button>
        </Box>

        {/* Skip option for early steps */}
        {currentStep < 3 && (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="text"
              onClick={() => setCurrentStep(currentStep + 1)}
              sx={{
                color: '#999',
                textTransform: 'none',
                fontSize: '0.9rem',
                '&:hover': { color: '#666' },
              }}
            >
              Skip for now
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  )
}
