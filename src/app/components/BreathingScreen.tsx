'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Play, Pause, RotateCw } from 'lucide-react'
import { Screen } from './SereniiApp'

interface BreathingScreenProps {
  onNavigate: (screen: Screen) => void
  onComplete: () => void
}

type BreathingType = '4-7-8' | 'box' | 'anti-anxiety'
type Phase = 'inhale' | 'hold' | 'exhale' | 'rest'

const breathingPatterns = {
  '4-7-8': { inhale: 4, hold: 7, exhale: 8, rest: 0 },
  'box': { inhale: 4, hold: 4, exhale: 4, rest: 4 },
  'anti-anxiety': { inhale: 4, hold: 2, exhale: 6, rest: 0 },
}

export default function BreathingScreen({ onNavigate, onComplete }: BreathingScreenProps) {
  const [breathingType, setBreathingType] = useState<BreathingType>('4-7-8')
  const [duration, setDuration] = useState(2)
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<Phase>('inhale')
  const [countdown, setCountdown] = useState(4)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (!isActive) return

    const pattern = breathingPatterns[breathingType]
    let timer: NodeJS.Timeout

    const updatePhase = () => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1

        // Move to next phase
        if (phase === 'inhale') {
          setPhase('hold')
          setScale(1.5)
          return pattern.hold
        } else if (phase === 'hold') {
          setPhase('exhale')
          setScale(0.7)
          return pattern.exhale
        } else if (phase === 'exhale') {
          if (pattern.rest > 0) {
            setPhase('rest')
            setScale(1)
            return pattern.rest
          } else {
            setPhase('inhale')
            setScale(1.3)
            return pattern.inhale
          }
        } else {
          setPhase('inhale')
          setScale(1.3)
          return pattern.inhale
        }
      })
    }

    timer = setInterval(updatePhase, 1000)
    return () => clearInterval(timer)
  }, [isActive, phase, breathingType])

  const startBreathing = () => {
    setIsActive(true)
    setPhase('inhale')
    setCountdown(breathingPatterns[breathingType].inhale)
    setScale(1.3)
  }

  const stopBreathing = () => {
    setIsActive(false)
    setPhase('inhale')
    setCountdown(breathingPatterns[breathingType].inhale)
    setScale(1)
    onComplete()
  }

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Inspire...'
      case 'hold':
        return 'Segure...'
      case 'exhale':
        return 'Expire...'
      case 'rest':
        return 'Descanse...'
    }
  }

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return 'from-cyan-400 to-blue-500'
      case 'hold':
        return 'from-purple-400 to-indigo-500'
      case 'exhale':
        return 'from-emerald-400 to-teal-500'
      case 'rest':
        return 'from-gray-400 to-gray-500'
    }
  }

  return (
    <div className="min-h-screen p-6 pb-24 flex flex-col">
      {/* Header */}
      <div className="pt-8 pb-6 flex items-center gap-4">
        <button
          onClick={() => onNavigate('home')}
          className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Respiração Guiada</h1>
          <p className="text-sm text-gray-600">Acalme sua mente</p>
        </div>
      </div>

      {/* Breathing Type Selection */}
      <div className="mb-6 space-y-3">
        <button
          onClick={() => setBreathingType('4-7-8')}
          className={`w-full p-4 rounded-2xl transition-all ${
            breathingType === '4-7-8'
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg'
              : 'bg-white/80 text-gray-700 border border-purple-100'
          }`}
        >
          <div className="font-semibold">Respiração 4-7-8</div>
          <div className="text-sm opacity-80">Inspire 4s • Segure 7s • Expire 8s</div>
        </button>

        <button
          onClick={() => setBreathingType('box')}
          className={`w-full p-4 rounded-2xl transition-all ${
            breathingType === 'box'
              ? 'bg-gradient-to-r from-purple-400 to-indigo-500 text-white shadow-lg'
              : 'bg-white/80 text-gray-700 border border-purple-100'
          }`}
        >
          <div className="font-semibold">Respiração Box</div>
          <div className="text-sm opacity-80">4s cada fase (quadrado)</div>
        </button>

        <button
          onClick={() => setBreathingType('anti-anxiety')}
          className={`w-full p-4 rounded-2xl transition-all ${
            breathingType === 'anti-anxiety'
              ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg'
              : 'bg-white/80 text-gray-700 border border-purple-100'
          }`}
        >
          <div className="font-semibold">Respiração Anti-Ansiedade</div>
          <div className="text-sm opacity-80">Inspire 4s • Segure 2s • Expire 6s</div>
        </button>
      </div>

      {/* Duration Selection */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Duração</h3>
        <div className="flex gap-3">
          {[1, 2, 5, 10].map((min) => (
            <button
              key={min}
              onClick={() => setDuration(min)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                duration === min
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-600 border border-purple-100'
              }`}
            >
              {min} min
            </button>
          ))}
        </div>
      </div>

      {/* Breathing Animation */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-80 h-80 flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-purple-200 opacity-30" />

          {/* Animated circle */}
          <div
            className={`absolute w-64 h-64 rounded-full bg-gradient-to-br ${getPhaseColor()} shadow-2xl transition-all duration-1000 ease-in-out flex items-center justify-center`}
            style={{
              transform: `scale(${scale})`,
            }}
          >
            <div className="text-center text-white">
              <div className="text-6xl font-bold mb-2">{countdown}</div>
              <div className="text-2xl font-semibold">{getPhaseText()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Button */}
      <div className="mt-8">
        {!isActive ? (
          <button
            onClick={startBreathing}
            className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white py-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <Play className="w-6 h-6" />
            <span className="text-xl font-bold">Começar</span>
          </button>
        ) : (
          <div className="space-y-3">
            <button
              onClick={stopBreathing}
              className="w-full bg-gradient-to-r from-red-400 to-rose-500 text-white py-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <Pause className="w-6 h-6" />
              <span className="text-xl font-bold">Parar</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
