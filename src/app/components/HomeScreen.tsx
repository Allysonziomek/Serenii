'use client'

import { Sparkles, Wind, Moon, Zap } from 'lucide-react'
import { Screen } from './SereniiApp'
import MascotBlob from './MascotBlob'

interface HomeScreenProps {
  userName: string
  onNavigate: (screen: Screen) => void
  mascotEnergy: number
}

export default function HomeScreen({ userName, onNavigate, mascotEnergy }: HomeScreenProps) {
  return (
    <div className="min-h-screen p-6 flex flex-col">
      {/* Header */}
      <div className="pt-8 pb-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              Olá, {userName} 👋
            </h1>
            <p className="text-lg text-gray-600">
              Vamos desacelerar hoje?
            </p>
          </div>
          
          {/* Mascote no canto */}
          <div className="relative">
            <MascotBlob size={80} energy={mascotEnergy} mood="happy" />
          </div>
        </div>
      </div>

      {/* Main Action Button */}
      <div className="mb-8">
        <button
          onClick={() => onNavigate('breathing')}
          className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white py-6 rounded-3xl shadow-2xl hover:shadow-3xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="flex flex-col items-center gap-2">
            <Wind className="w-10 h-10" />
            <span className="text-2xl font-bold">Respirar Agora</span>
            <span className="text-sm opacity-90">Acalme sua mente em minutos</span>
          </div>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Atalhos Rápidos</h2>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('sounds')}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 border border-purple-100"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Foco</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('sounds')}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 border border-purple-100"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center">
                <Moon className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Sono</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('sounds')}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 border border-purple-100"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Relaxar</span>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Routines */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Rotinas Rápidas</h2>
        <div className="space-y-3">
          <button className="w-full bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] border border-purple-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🧘</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Acalme-se em 1 minuto</h3>
                <p className="text-sm text-gray-500">Respiração anti-ansiedade</p>
              </div>
            </div>
            <span className="text-xs font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">1 min</span>
          </button>

          <button className="w-full bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] border border-purple-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Energize em 2 minutos</h3>
                <p className="text-sm text-gray-500">Desperte sua energia</p>
              </div>
            </div>
            <span className="text-xs font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">2 min</span>
          </button>

          <button className="w-full bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] border border-purple-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🌙</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">Sono profundo em 5 minutos</h3>
                <p className="text-sm text-gray-500">Prepare-se para dormir</p>
              </div>
            </div>
            <span className="text-xs font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">5 min</span>
          </button>
        </div>
      </div>
    </div>
  )
}
