'use client'

import { useState } from 'react'
import { ArrowLeft, Play, Pause, Timer, Lock } from 'lucide-react'
import { Screen } from './SereniiApp'

interface SoundsScreenProps {
  onNavigate: (screen: Screen) => void
  isPremium: boolean
}

const sounds = [
  { id: 1, name: 'Chuva de Noite', emoji: '🌧️', category: 'sleep', premium: false },
  { id: 2, name: 'Vento Calmo', emoji: '🍃', category: 'relax', premium: false },
  { id: 3, name: 'Ruído Branco', emoji: '📻', category: 'focus', premium: false },
  { id: 4, name: 'Mar Sereno', emoji: '🌊', category: 'sleep', premium: false },
  { id: 5, name: 'Floresta Tropical', emoji: '🌴', category: 'relax', premium: true },
  { id: 6, name: 'Sons Binaurais', emoji: '🎧', category: 'focus', premium: true },
  { id: 7, name: 'Fogueira Crepitante', emoji: '🔥', category: 'relax', premium: true },
  { id: 8, name: 'Ondas Profundas', emoji: '🌀', category: 'sleep', premium: true },
]

const timers = [10, 20, 30, 60]

export default function SoundsScreen({ onNavigate, isPremium }: SoundsScreenProps) {
  const [playing, setPlaying] = useState<number | null>(null)
  const [selectedTimer, setSelectedTimer] = useState(30)

  return (
    <div className="min-h-screen p-6 pb-24">
      {/* Header */}
      <div className="pt-8 pb-6 flex items-center gap-4">
        <button
          onClick={() => onNavigate('home')}
          className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Sons & Ambientes</h1>
          <p className="text-sm text-gray-600">Escolha seu ambiente perfeito</p>
        </div>
      </div>

      {/* Timer Selection */}
      <div className="mb-8 bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-purple-100">
        <div className="flex items-center gap-2 mb-4">
          <Timer className="w-5 h-5 text-purple-600" />
          <h2 className="font-semibold text-gray-800">Duração</h2>
        </div>
        <div className="flex gap-3">
          {timers.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTimer(time)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                selectedTimer === time
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {time} min
            </button>
          ))}
        </div>
      </div>

      {/* Sounds Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Todos os Sons</h2>
        <div className="grid grid-cols-2 gap-4">
          {sounds.map((sound) => (
            <button
              key={sound.id}
              onClick={() => {
                if (sound.premium && !isPremium) {
                  onNavigate('paywall')
                } else {
                  setPlaying(playing === sound.id ? null : sound.id)
                }
              }}
              className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 border border-purple-100"
            >
              {sound.premium && !isPremium && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                  <Lock className="w-3 h-3 text-white" />
                </div>
              )}
              
              <div className="flex flex-col items-center gap-3">
                <div className="text-5xl">{sound.emoji}</div>
                <span className="text-sm font-semibold text-gray-700 text-center">
                  {sound.name}
                </span>
                
                {playing === sound.id && (
                  <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Now Playing Bar */}
      {playing !== null && (
        <div className="fixed bottom-20 left-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-2xl shadow-2xl backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">
                {sounds.find((s) => s.id === playing)?.emoji}
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  {sounds.find((s) => s.id === playing)?.name}
                </h3>
                <p className="text-xs text-white/80">{selectedTimer} minutos</p>
              </div>
            </div>
            <button
              onClick={() => setPlaying(null)}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            >
              <Pause className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
