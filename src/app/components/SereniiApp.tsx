'use client'

import { useState, useEffect } from 'react'
import { Home, Music, Wind, Heart, BookOpen, Crown } from 'lucide-react'
import HomeScreen from './HomeScreen'
import SoundsScreen from './SoundsScreen'
import BreathingScreen from './BreathingScreen'
import MascotScreen from './MascotScreen'
import DiaryScreen from './DiaryScreen'
import PaywallScreen from './PaywallScreen'
import OnboardingScreen from './OnboardingScreen'

export type Screen = 'home' | 'sounds' | 'breathing' | 'mascot' | 'diary' | 'paywall'

export default function SereniiApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')
  const [userName, setUserName] = useState<string | null>(null)
  const [mascotName, setMascotName] = useState('Serenii')
  const [mascotEnergy, setMascotEnergy] = useState(50)
  const [isPremium, setIsPremium] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const storedUserName = localStorage.getItem('serenii_user_name')
    const storedMascotEnergy = localStorage.getItem('serenii_mascot_energy')
    const storedIsPremium = localStorage.getItem('serenii_is_premium')

    if (storedUserName) {
      setUserName(storedUserName)
    }
    if (storedMascotEnergy) {
      setMascotEnergy(parseInt(storedMascotEnergy))
    }
    if (storedIsPremium) {
      setIsPremium(storedIsPremium === 'true')
    }

    setIsLoading(false)
  }, [])

  // Salvar nome do usuário
  const handleOnboardingComplete = (name: string) => {
    setUserName(name)
    localStorage.setItem('serenii_user_name', name)
  }

  // Atualizar energia do mascote
  const updateMascotEnergy = (increment: number) => {
    setMascotEnergy(prev => {
      const newEnergy = Math.min(100, prev + increment)
      localStorage.setItem('serenii_mascot_energy', newEnergy.toString())
      return newEnergy
    })
  }

  // Ativar premium
  const handleSubscribe = () => {
    setIsPremium(true)
    localStorage.setItem('serenii_is_premium', 'true')
  }

  // Se ainda está carregando, não renderiza nada
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 flex items-center justify-center">
        <div className="animate-pulse text-purple-600 text-xl font-semibold">
          Carregando...
        </div>
      </div>
    )
  }

  // Se não tem nome de usuário, mostra onboarding
  if (!userName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      </div>
    )
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen userName={userName} onNavigate={setCurrentScreen} mascotEnergy={mascotEnergy} />
      case 'sounds':
        return <SoundsScreen onNavigate={setCurrentScreen} isPremium={isPremium} />
      case 'breathing':
        return <BreathingScreen onNavigate={setCurrentScreen} onComplete={() => updateMascotEnergy(10)} />
      case 'mascot':
        return <MascotScreen mascotName={mascotName} energy={mascotEnergy} onNavigate={setCurrentScreen} isPremium={isPremium} />
      case 'diary':
        return <DiaryScreen onNavigate={setCurrentScreen} />
      case 'paywall':
        return <PaywallScreen onNavigate={setCurrentScreen} onSubscribe={handleSubscribe} />
      default:
        return <HomeScreen userName={userName} onNavigate={setCurrentScreen} mascotEnergy={mascotEnergy} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      {/* Main Content */}
      <main className="pb-20">
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-purple-100 px-4 py-3 safe-area-bottom">
        <div className="max-w-md mx-auto flex justify-around items-center">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentScreen === 'home' ? 'text-purple-600' : 'text-gray-400'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Início</span>
          </button>

          <button
            onClick={() => setCurrentScreen('sounds')}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentScreen === 'sounds' ? 'text-purple-600' : 'text-gray-400'
            }`}
          >
            <Music className="w-6 h-6" />
            <span className="text-xs font-medium">Sons</span>
          </button>

          <button
            onClick={() => setCurrentScreen('breathing')}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentScreen === 'breathing' ? 'text-purple-600' : 'text-gray-400'
            }`}
          >
            <Wind className="w-6 h-6" />
            <span className="text-xs font-medium">Respirar</span>
          </button>

          <button
            onClick={() => setCurrentScreen('mascot')}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentScreen === 'mascot' ? 'text-purple-600' : 'text-gray-400'
            }`}
          >
            <Heart className="w-6 h-6" />
            <span className="text-xs font-medium">Mascote</span>
          </button>

          <button
            onClick={() => setCurrentScreen('diary')}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentScreen === 'diary' ? 'text-purple-600' : 'text-gray-400'
            }`}
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-xs font-medium">Diário</span>
          </button>
        </div>
      </nav>

      {/* Premium Badge */}
      {!isPremium && (
        <button
          onClick={() => setCurrentScreen('paywall')}
          className="fixed top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition-transform z-50"
        >
          <Crown className="w-4 h-4" />
          <span className="text-sm font-semibold">Premium</span>
        </button>
      )}
    </div>
  )
}
