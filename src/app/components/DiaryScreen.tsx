'use client'

import { useState } from 'react'
import { ArrowLeft, Smile, Frown, Meh, Heart, TrendingUp } from 'lucide-react'
import { Screen } from './SereniiApp'

interface DiaryScreenProps {
  onNavigate: (screen: Screen) => void
}

const moods = [
  { id: 1, emoji: '😊', label: 'Feliz', color: 'from-emerald-400 to-teal-400' },
  { id: 2, emoji: '😌', label: 'Calmo', color: 'from-blue-400 to-cyan-400' },
  { id: 3, emoji: '😐', label: 'Neutro', color: 'from-gray-400 to-gray-500' },
  { id: 4, emoji: '😔', label: 'Triste', color: 'from-indigo-400 to-purple-500' },
  { id: 5, emoji: '😰', label: 'Ansioso', color: 'from-amber-400 to-orange-500' },
]

const weekData = [
  { day: 'Seg', mood: 4, value: 60 },
  { day: 'Ter', mood: 3, value: 50 },
  { day: 'Qua', mood: 2, value: 70 },
  { day: 'Qui', mood: 2, value: 75 },
  { day: 'Sex', mood: 1, value: 85 },
  { day: 'Sáb', mood: 1, value: 90 },
  { day: 'Dom', mood: 2, value: 80 },
]

export default function DiaryScreen({ onNavigate }: DiaryScreenProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [note, setNote] = useState('')

  const handleSave = () => {
    if (selectedMood) {
      // Save logic here
      alert('Humor registrado com sucesso! 💚')
      setSelectedMood(null)
      setNote('')
    }
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
          <h1 className="text-3xl font-bold text-gray-800">Diário Emocional</h1>
          <p className="text-sm text-gray-600">Como você se sente hoje?</p>
        </div>
      </div>

      {/* Mood Selection */}
      <div className="mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-purple-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Escolha seu humor</h2>
        <div className="grid grid-cols-5 gap-3">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                selectedMood === mood.id
                  ? `bg-gradient-to-br ${mood.color} shadow-lg scale-110`
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span className="text-4xl">{mood.emoji}</span>
              <span
                className={`text-xs font-medium ${
                  selectedMood === mood.id ? 'text-white' : 'text-gray-600'
                }`}
              >
                {mood.label}
              </span>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quer adicionar uma nota? (opcional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Como foi seu dia? O que você sentiu?"
                className="w-full p-4 rounded-2xl border border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none resize-none bg-white/50"
                rows={4}
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Salvar Registro
            </button>
          </div>
        )}
      </div>

      {/* Weekly Chart */}
      <div className="mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-purple-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Sua Semana
          </h2>
          <span className="text-sm text-gray-600">Últimos 7 dias</span>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end justify-between gap-2 h-48 mb-4">
          {weekData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center h-full">
                <div
                  className="w-full bg-gradient-to-t from-purple-500 to-blue-400 rounded-t-xl transition-all hover:opacity-80"
                  style={{ height: `${data.value}%` }}
                />
              </div>
              <div className="text-2xl">{moods[data.mood - 1].emoji}</div>
              <span className="text-xs font-medium text-gray-600">{data.day}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-purple-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-xs text-gray-600">Bem-estar</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">7</div>
            <div className="text-xs text-gray-600">Dias seguidos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">↑ 15%</div>
            <div className="text-xs text-gray-600">Melhoria</div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-3xl border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Insight da Semana</h3>
            <p className="text-sm text-gray-700">
              Você está mantendo uma rotina consistente! 🎉 Seus níveis de bem-estar
              aumentaram 15% esta semana. Continue assim!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
