'use client' // Marque ce composant comme Client Component (nécessite useState, useRouter, etc.)

// Imports Material UI pour les composants UI et les hooks de responsivité
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
// Imports des composants locaux personnalisés pour l'onboarding
import StepContainer from './components/StepContainer' // Wrapper pour chaque étape (titre + description)
import ProgressIndicator from './components/ProgressIndicator' // Indicateur de progression visuel
import OptionCard from './components/OptionCard' // Carte cliquable pour les sélections multiples

// Nombre total d'étapes du processus d'onboarding
const TOTAL_STEPS = 7

// Composant principal de la page d'onboarding - gère les 7 étapes de configuration du profil utilisateur
export default function OnboardingPage() {
  // État pour suivre l'étape actuelle du flux d'onboarding (1 à 7)
  const [currentStep, setCurrentStep] = useState(1)

  // État pour les données textuelles du formulaire (étapes 1-2, et email d'invitation)
  const [formData, setFormData] = useState<{
    firstName: string
    lastName: string
    company: string
    inviteEmail: string
  }>({
    firstName: '', // Prénom de l'utilisateur (étape 1)
    lastName: '', // Nom de l'utilisateur (étape 1)
    company: '', // Entreprise (étape 2)
    inviteEmail: '', // Email pour inviter une personne (nouvelle étape 5)
  })

  // État pour les sélections d'options (étapes 3,4 et 6)
  const [selectedOptions, setSelectedOptions] = useState<{
    role: string
    industry: string
    goals: string[]
  }>({
    role: '', // Rôle sélectionné (simple choix)
    industry: '', // Industrie sélectionnée (simple choix)
    goals: [], // Tableau des objectifs sélectionnés (multi-sélection)
  })

  // État pour l'invitation : si l'utilisateur a effectivement envoyé l'invitation
  const [inviteSent, setInviteSent] = useState(false)

  // État pour afficher la page de chargement stylée après Get Started
  const [isCompleting, setIsCompleting] = useState(false)

  // Hook de navigation Next.js pour rediriger vers le dashboard à la fin
  const router = useRouter()
  // Hook pour accéder au thème Material UI
  const theme = useTheme()
  // Hook pour détecter si l'écran est mobile (breakpoint < md) - actuellement non utilisé
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // Fonction pour mettre à jour un champ de texte dans formData
  // Utilisée par les TextField (firstName, lastName, company)
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value, // Met à jour le champ spécifié sans modifier les autres
    }))
  }

  // Fonction pour sélectionner une option simple (role, industry, experience)
  // Remplace la valeur précédente par la nouvelle (simple choix, pas multi-sélection)
  const handleOptionSelect = (field: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [field]: value, // Remplace l'ancienne sélection
    }))
  }

  // Fonction pour ajouter/retirer un objectif du tableau goals (multi-sélection)
  // Si l'objectif existe déjà, le retire ; sinon l'ajoute
  const handleGoalsToggle = (goal: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal) // Retire l'objectif
        : [...prev.goals, goal], // Ajoute l'objectif
    }))
  }

  // Fonction pour envoyer l'invitation (mock)
  const handleSendInvite = () => {
    const email = formData.inviteEmail.trim()
    if (!email) return
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailIsValid) {
      console.warn('Email invalide:', email)
      return
    }
    console.log('Invitation envoyée à', email)
    setInviteSent(true)
  }

  // Validation pour vérifier si l'utilisateur peut passer à l'étape suivante
  // Chaque étape a ses propres critères de validation
  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1: // Étape 1 : prénom et nom obligatoires
        return formData.firstName.trim() && formData.lastName.trim()
      case 2: // Étape 2 : entreprise obligatoire
        return formData.company.trim()
      case 3: // Étape 3 : rôle sélectionné obligatoire
        return selectedOptions.role
      case 4: // Étape 4 : industrie sélectionnée obligatoire
        return selectedOptions.industry
      case 5: // Étape 5 : invitation envoyée (nouvelle étape)
        return inviteSent
      case 6: // Étape 6 : au moins un objectif sélectionné
        return selectedOptions.goals.length > 0
      default: // Étape 7 : pas de validation (écran de complétion)
        return true
    }
  }

  // Navigation vers l'étape suivante ; si on est à la dernière étape, finalise l'onboarding
  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1) // Passe à l'étape suivante
    } else {
      handleComplete() // Finalise et redirige
    }
  }

  // Navigation vers l'étape précédente (désactivée à l'étape 1)
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1) // Retour à l'étape précédente
    }
  }

  // Finalise l'onboarding : log les données et redirige vers le dashboard
  // TODO: En production, envoyer formData et selectedOptions à une API backend pour les persister
  const handleComplete = () => {
    // Log des données collectées (à remplacer par un appel API)
    console.log('Onboarding complete:', { formData, selectedOptions })
    // Affiche la page de chargement stylée pendant 5s, puis redirige
    setIsCompleting(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 5000)
  }

  // Si en cours de finalisation, afficher la page de chargement stylée
  if (isCompleting) {
    return (
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, #020617 0%, #000814 60%)',
          color: '#e6f7ff',
          zIndex: 1400,
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              width: 260,
              height: 260,
              mx: 'auto',
              mb: 3,
              borderRadius: '50%',
              background: 'conic-gradient(from 90deg, #00f0ff, #8b5cff, #ff6ec7, #00f0ff)',
              boxShadow: '0 0 80px rgba(139,92,255,0.15), inset 0 0 40px rgba(0,240,255,0.08)',
              position: 'relative',
              '@keyframes pulseRing': {
                '0%': { transform: 'scale(1)', opacity: 0.9 },
                '50%': { transform: 'scale(1.08)', opacity: 0.6 },
                '100%': { transform: 'scale(1)', opacity: 0.9 },
              },
              animation: 'pulseRing 2.4s ease-in-out infinite',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 28,
                borderRadius: '50%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.2))',
                backdropFilter: 'blur(6px)',
                boxShadow: 'inset 0 2px 20px rgba(0,0,0,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '2.2rem',
                fontWeight: 700,
              }}
            >
              ⚡
            </Box>
          </Box>

          <Box sx={{ mb: 1 }}>
            <Typography sx={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.6px' }}>
              Initialisation en cours
            </Typography>
          </Box>
          <Typography sx={{ color: '#9fb8ff', mb: 2 }}>
            Nous préparons votre espace numérique. Patientez quelques instants...
          </Typography>
          <Box sx={{ height: 8, width: 420, mx: 'auto', borderRadius: 99, background: 'rgba(255,255,255,0.04)' }}>
            <Box
              sx={{
                height: '100%',
                width: '100%',
                background: 'linear-gradient(90deg, #00f0ff, #8b5cff, #ff6ec7)',
                borderRadius: 99,
                transformOrigin: 'left',
                animation: 'loadStrip 5s linear forwards',
                '@keyframes loadStrip': {
                  '0%': { transform: 'scaleX(0)' },
                  '100%': { transform: 'scaleX(1)' },
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    )
  }

  // Rendu principal : layout fullscreen centré avec gradient léger
  return (
    <Box
      sx={{
        minHeight: '100vh', // Hauteur min : viewport entier
        background: 'linear-gradient(135deg, #F5F5F5 0%, #EEEEEE 100%)', // Gradient léger
        py: { xs: 4, md: 6 }, // Padding vertical responsive
        display: 'flex', // Flex layout pour centrage
        alignItems: 'center', // Centrage vertical
        justifyContent: 'center', // Centrage horizontal
      }}
    >
      {/* Conteneur max-width pour le formulaire */}
      <Container maxWidth="sm" sx={{ width: '100%', px: { xs: 2, sm: 3 } }}>
        {/* Logo/Branding */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#F8A01B', // Couleur orange personnalisée
              letterSpacing: '-0.5px',
            }}
          >
            Taskit onboarding
          </Typography>
        </Box>

        {/* Indicateur de progression visuel (barre/points) */}
        <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* ÉTAPE 1 : Informations de base (prénom, nom) */}
        {currentStep === 1 && (
          <StepContainer
            stepNumber={1}
            title="What&apos;s your name?"
            description="Let us know who we&apos;re working with"
          >
            <Stack gap={2} sx={{ mb: 4 }}>
              {/* Champ pour le prénom */}
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="John"
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 1 }, mb:2
                }}
              />
              {/* Champ pour le nom */}
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Doe"
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 1 },
                }}
              />
            </Stack>
          </StepContainer>
        )}

        {/* ÉTAPE 2 : Entreprise */}
        {currentStep === 2 && (
          <StepContainer
            stepNumber={2}
            title="Which company do you work for?"
            description="This helps us tailor your experience"
          >
            {/* Champ pour le nom de l'entreprise */}
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

        {/* ÉTAPE 3 : Rôle professionnel (simple choix) */}
        {currentStep === 3 && (
          <StepContainer
            stepNumber={3}
            title="What&apos;s your role?"
            description="Select the one that best describes your position"
          >
            <Stack gap={2} sx={{ mb: 4 }}>
              {/* Génère une OptionCard pour chaque rôle disponible */}
              {['Product Manager', 'Designer', 'Developer', 'Entrepreneur', 'Other'].map(
                (role) => (
                  <OptionCard
                    key={role}
                    title={role}
                    selected={selectedOptions.role === role} // Vrai si ce rôle est sélectionné
                    onClick={() => handleOptionSelect('role', role)} // Sélectionne ce rôle
                  />
                )
              )}
            </Stack>
          </StepContainer>
        )}

        {/* ÉTAPE 4 : Industrie (simple choix) */}
        {currentStep === 4 && (
          <StepContainer
            stepNumber={4}
            title="What industry are you in?"
            description="Help us understand your context"
          >
            <Stack gap={2} sx={{ mb: 4 }}>
              {/* Génère une OptionCard pour chaque industrie disponible */}
              {['Technology', 'Finance', 'Healthcare', 'Retail', 'Other'].map(
                (industry) => (
                  <OptionCard
                    key={industry}
                    title={industry}
                    selected={selectedOptions.industry === industry} // Vrai si cette industrie est sélectionnée
                    onClick={() => handleOptionSelect('industry', industry)} // Sélectionne cette industrie
                  />
                )
              )}
            </Stack>
          </StepContainer>
        )}

        {/* ÉTAPE 5 : Invitation par e-mail (remplace l'étape d'expérience) */}
        {currentStep === 5 && (
          <StepContainer
            stepNumber={5}
            title="Invite a colleague"
            description="Invite someone by email to join you"
          >
            <Stack gap={2} sx={{ mb: 4 }}>
              {/* Champ email pour inviter une personne */}
              <TextField
                fullWidth
                label="Colleague's email"
                value={formData.inviteEmail}
                onChange={(e) => handleInputChange('inviteEmail', e.target.value)}
                placeholder="name@example.com"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 }, mb: 2 }}
              />

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleSendInvite}
                  disabled={inviteSent}
                  sx={{
                    px: 3,
                    py: 1.2,
                    background: inviteSent ? '#DDD' : '#F8A01B',
                    color: inviteSent ? '#999' : 'white',
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                >
                  {inviteSent ? 'Invited' : 'Send invite'}
                </Button>
                {inviteSent && (
                  <Typography sx={{ color: '#4caf50' }}>
                    Invitation sent to {formData.inviteEmail}
                  </Typography>
                )}
              </Box>
            </Stack>
          </StepContainer>
        )}

        {/* ÉTAPE 6 : Objectifs (multi-sélection) */}
        {currentStep === 6 && (
          <StepContainer
            stepNumber={6}
            title="What are your primary goals?"
            description="Select all that apply"
          >
            <Stack gap={2} sx={{ mb: 4 }}>
              {/* Génère une OptionCard pour chaque objectif disponible (multi-sélection possible) */}
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
                  selected={selectedOptions.goals.includes(goal)} // Vrai si cet objectif est dans le tableau
                  onClick={() => handleGoalsToggle(goal)} // Ajoute/retire cet objectif du tableau
                />
              ))}
            </Stack>
          </StepContainer>
        )}

        {/* ÉTAPE 7 : Écran de complétion avec message personnalisé */}
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
              {/* Emoji de célébration */}
              <Typography sx={{ fontSize: '3rem', mb: 2 }}>🎉</Typography>
              {/* Message de bienvenue personnalisé avec le prénom de l'utilisateur */}
              <Typography sx={{ color: '#666', lineHeight: 1.6 }}>
                Welcome to our platform, {formData.firstName}! You&apos;re ready to start your
                journey. We&apos;ll take you to your dashboard where you can explore all the
                amazing features.
              </Typography>
            </Box>
          </StepContainer>
        )}

        {/* Boutons de navigation (Back + Next/Continue) */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 4,
            // À l'étape 1, aligne à droite (pas de bouton Back) ; sinon espace-entre
            justifyContent: currentStep === 1 ? 'flex-end' : 'space-between',
          }}
        >
          {/* Bouton Back : visible si currentStep > 1 */}
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
          {/* Bouton Next/Continue/Get Started : désactivé si validation échoue */}
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!canProceedToNextStep()} // Désactivé si les critères ne sont pas remplis
            sx={{
              px: 4,
              py: 1.5,
              background: canProceedToNextStep() ? '#F8A01B' : '#DDD', // Couleur orange ou grise
              color: canProceedToNextStep() ? 'white' : '#999',
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': canProceedToNextStep()
                ? {
                    background: '#E09015', // Orange plus foncé au survol
                  }
                : {},
            }}
          >
            {currentStep === TOTAL_STEPS ? 'Get Started' : 'Continue'}
          </Button>
        </Box>

        {/* Bouton "Skip for now" : visible uniquement aux étapes 1 et 2 pour sauter les infos optionnelles */}
        {currentStep < 3 && (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="text"
              onClick={() => setCurrentStep(currentStep + 1)} // Saute à l'étape suivante sans validation
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
