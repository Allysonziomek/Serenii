'use client'

import { X, Check, Crown, Sparkles, Zap, Heart, Lock } from 'lucide-react'
import { Screen } from './SereniiApp'

interface PaywallScreenProps {
  onNavigate: (screen: Screen) => void
  onSubscribe: () => void
}

const plans = [
  {
    id: 'monthly',
    name: 'Mensal',
    price: 'R$ 24,90',
    period: '/mês',
    badge: null,
    color: 'from-blue-400 to-cyan-400',
  },
  {
    id: 'annual',
    name: 'Anual',
    price: 'R$ 129,00',
    period: '/ano',
    badge: 'Mais Popular',
    savings: 'Economize R$ 169,80',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'lifetime',
    name: 'Vitalício',
    price: 'R$ 349,00',
    period: 'pagamento único',
    badge: 'Melhor Valor',
    savings: 'Acesso para sempre',
    color: 'from-amber-400 to-orange-500',
  },
]

const features = [
  { icon: Sparkles, text: 'Todos os sons premium desbloqueados' },
  { icon: Crown, text: 'Customizações exclusivas do mascote' },
  { icon: Zap, text: 'Rotinas avançadas de meditação' },
  { icon: Heart, text: 'Análises detalhadas do seu bem-estar' },
  { icon: Lock, text: 'Sem anúncios, experiência completa' },
]

export default function PaywallScreen({ onNavigate, onSubscribe }: PaywallScreenProps) {
  const handleSubscribe = (planId: string) => {
    // Subscription logic here
    onSubscribe()
    alert(`Assinatura ${planId} ativada com sucesso! 🎉`)
    onNavigate('home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-6 pb-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

      {/* Close button */}
      <button
        onClick={() => onNavigate('home')}
        className="absolute top-8 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all z-10"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      <div className="max-w-md mx-auto pt-16">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Desbloqueie Todo o Potencial
          </h1>
          <p className="text-lg text-white/90">
            Transforme sua jornada de bem-estar
          </p>
        </div>

        {/* Social Proof */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 mb-8 border border-white/30">
          <div className="flex items-center justify-center gap-2 text-white">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <span className="font-semibold">+10.000 usuários</span>
            <span className="opacity-90">sentiram menos ansiedade</span>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-8 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">O que você ganha:</h2>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="space-y-4 mb-8">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => handleSubscribe(plan.id)}
              className="w-full bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              {plan.badge && (
                <div
                  className={`absolute top-0 right-0 bg-gradient-to-r ${plan.color} text-white text-xs font-bold px-4 py-1 rounded-bl-2xl rounded-tr-2xl`}
                >
                  {plan.badge}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-sm text-gray-600">{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <div className="text-sm font-semibold text-emerald-600">
                      {plan.savings}
                    </div>
                  )}
                </div>

                <div
                  className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <Check className="w-8 h-8 text-white" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Trial Notice */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 mb-6 border border-white/30">
          <p className="text-center text-white text-sm">
            ✨ <span className="font-semibold">7 dias grátis</span> para testar tudo
          </p>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-white/70 mb-2">
            Cancele quando quiser, sem compromisso
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="text-white/90 text-sm font-medium hover:text-white transition-colors underline"
          >
            Continuar com versão gratuita
          </button>
        </div>
      </div>
    </div>
  )
}
