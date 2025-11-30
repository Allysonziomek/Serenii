'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import MascotBlob from './MascotBlob'

interface OnboardingScreenProps {
  onComplete: (name: string) => void
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [name, setName] = useState('')
  const [step, setStep] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onComplete(name.trim())
    }
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full">
        {/* Mascote animado */}
        <div className="flex justify-center mb-8">
          <MascotBlob size={120} energy={100} mood="happy" />
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Bem-vindo ao Serenii
          </h1>
          <p className="text-lg text-gray-600">
            Seu companheiro de bem-estar e tranquilidade
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Como podemos te chamar?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
              className="w-full px-6 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-lg transition-all bg-white/80 backdrop-blur-sm"
              autoFocus
              required
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-semibold text-lg flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Começar Jornada
          </button>
        </form>

        {/* Benefícios */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">✓</span>
            </div>
            <p className="text-sm">Respirações guiadas para acalmar a mente</p>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">✓</span>
            </div>
            <p className="text-sm">Sons relaxantes para foco e sono</p>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">✓</span>
            </div>
            <p className="text-sm">Mascote que cresce com suas rotinas</p>
          </div>
        </div>
      </div>
    </div>
  )
}
