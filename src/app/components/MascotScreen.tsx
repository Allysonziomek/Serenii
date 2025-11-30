'use client'

import { ArrowLeft, Sparkles, Heart, Zap, Lock } from 'lucide-react'
import { Screen } from './SereniiApp'
import MascotBlob from './MascotBlob'

interface MascotScreenProps {
  mascotName: string
  energy: number
  onNavigate: (screen: Screen) => void
  isPremium: boolean
}

const dailyTasks = [
  { id: 1, name: 'Respirar 5 minutos', completed: true, energy: 10 },
  { id: 2, name: 'Ouvir sons relaxantes', completed: true, energy: 10 },
  { id: 3, name: 'Registrar humor no diário', completed: false, energy: 10 },
  { id: 4, name: 'Fazer rotina rápida', completed: false, energy: 10 },
]

const customizations = [
  { id: 1, name: 'Cor Azul', emoji: '💙', premium: false },
  { id: 2, name: 'Cor Rosa', emoji: '💗', premium: false },
  { id: 3, name: 'Cor Verde', emoji: '💚', premium: false },
  { id: 4, name: 'Chapéu Mágico', emoji: '🎩', premium: true },
  { id: 5, name: 'Óculos Cool', emoji: '😎', premium: true },
  { id: 6, name: 'Coroa Real', emoji: '👑', premium: true },
]

export default function MascotScreen({ mascotName, energy, onNavigate, isPremium }: MascotScreenProps) {
  const getMood = () => {
    if (energy > 70) return 'excited'
    if (energy > 40) return 'happy'
    if (energy > 20) return 'neutral'
    return 'sad'
  }

  const getMessage = () => {
    if (energy > 70) return '🌟 Estou radiante! Você está cuidando muito bem de mim!'
    if (energy > 40) return '😊 Me sinto bem! Continue assim!'
    if (energy > 20) return '😐 Preciso de um pouco mais de atenção...'
    return '😢 Estou precisando de cuidados... Complete suas rotinas!'
  }

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
          <h1 className="text-3xl font-bold text-gray-800">{mascotName}</h1>
          <p className="text-sm text-gray-600">Seu companheiro de bem-estar</p>
        </div>
      </div>

      {/* Mascot Display */}
      <div className="mb-8 bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-purple-100">
        <div className="flex flex-col items-center">
          <MascotBlob size={200} energy={energy} mood={getMood()} animated />
          
          <div className="mt-6 text-center">
            <div className="text-lg font-semibold text-gray-800 mb-2">{getMessage()}</div>
            
            {/* Energy Bar */}
            <div className="w-full max-w-xs mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Energia</span>
                <span className="text-sm font-bold text-purple-600">{energy}%</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500 rounded-full"
                  style={{ width: `${energy}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Tasks */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          Tarefas Diárias
        </h2>
        <div className="space-y-3">
          {dailyTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md border transition-all ${
                task.completed
                  ? 'border-emerald-300 bg-emerald-50/50'
                  : 'border-purple-100 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      task.completed
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {task.completed && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span
                    className={`font-medium ${
                      task.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                    }`}
                  >
                    {task.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-600">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-semibold">+{task.energy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customizations */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500" />
          Customizações
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {customizations.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.premium && !isPremium) {
                  onNavigate('paywall')
                }
              }}
              className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 border border-purple-100"
            >
              {item.premium && !isPremium && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                  <Lock className="w-3 h-3 text-white" />
                </div>
              )}
              <div className="text-4xl mb-2">{item.emoji}</div>
              <div className="text-xs font-medium text-gray-700 text-center">
                {item.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Motivational Message */}
      {energy < 30 && (
        <div className="bg-gradient-to-r from-rose-100 to-pink-100 p-6 rounded-2xl border-2 border-rose-200">
          <div className="text-center">
            <div className="text-4xl mb-3">💔</div>
            <h3 className="font-bold text-gray-800 mb-2">
              {mascotName} precisa de você!
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Complete suas rotinas diárias para dar energia ao seu mascote
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Fazer Rotinas
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
