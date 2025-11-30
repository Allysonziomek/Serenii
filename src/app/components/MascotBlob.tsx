'use client'

interface MascotBlobProps {
  size?: number
  energy: number
  mood?: 'happy' | 'sad' | 'neutral' | 'excited'
  animated?: boolean
}

export default function MascotBlob({ size = 100, energy, mood = 'happy', animated = true }: MascotBlobProps) {
  // Cor roxa principal similar à imagem de referência
  const getColor = () => {
    if (energy > 70) return 'from-purple-500 to-purple-600'
    if (energy > 40) return 'from-purple-400 to-purple-500'
    if (energy > 20) return 'from-purple-300 to-purple-400'
    return 'from-gray-400 to-gray-500'
  }

  const getEyes = () => {
    switch (mood) {
      case 'happy':
        return (
          <>
            {/* Olho esquerdo - estilo da imagem */}
            <div className="absolute top-[28%] left-[22%] w-[22%] h-[28%] bg-gray-900 rounded-full flex items-center justify-center">
              <div className="w-[40%] h-[40%] bg-white rounded-full relative">
                <div className="absolute top-[20%] right-[20%] w-[45%] h-[45%] bg-white rounded-full opacity-90" />
              </div>
            </div>
            {/* Olho direito - estilo da imagem */}
            <div className="absolute top-[28%] right-[22%] w-[22%] h-[28%] bg-gray-900 rounded-full flex items-center justify-center">
              <div className="w-[40%] h-[40%] bg-white rounded-full relative">
                <div className="absolute top-[20%] right-[20%] w-[45%] h-[45%] bg-white rounded-full opacity-90" />
              </div>
            </div>
            {/* Boca rosa feliz - estilo da imagem */}
            <div className="absolute top-[58%] left-[50%] -translate-x-1/2 w-[35%] h-[20%] bg-pink-400 rounded-full overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-pink-500 rounded-t-full" />
            </div>
          </>
        )
      case 'sad':
        return (
          <>
            {/* Olho esquerdo triste */}
            <div className="absolute top-[30%] left-[22%] w-[20%] h-[24%] bg-gray-900 rounded-full flex items-center justify-center opacity-80">
              <div className="w-[35%] h-[35%] bg-white rounded-full relative">
                <div className="absolute top-[25%] right-[25%] w-[40%] h-[40%] bg-white rounded-full opacity-70" />
              </div>
            </div>
            {/* Olho direito triste */}
            <div className="absolute top-[30%] right-[22%] w-[20%] h-[24%] bg-gray-900 rounded-full flex items-center justify-center opacity-80">
              <div className="w-[35%] h-[35%] bg-white rounded-full relative">
                <div className="absolute top-[25%] right-[25%] w-[40%] h-[40%] bg-white rounded-full opacity-70" />
              </div>
            </div>
            {/* Boca triste rosa */}
            <div className="absolute top-[62%] left-[50%] -translate-x-1/2 w-[30%] h-[12%] bg-pink-400 rounded-full opacity-70" />
          </>
        )
      case 'excited':
        return (
          <>
            {/* Olho esquerdo animado - maior */}
            <div className="absolute top-[25%] left-[20%] w-[24%] h-[30%] bg-gray-900 rounded-full flex items-center justify-center">
              <div className="w-[45%] h-[45%] bg-white rounded-full relative">
                <div className="absolute top-[15%] right-[15%] w-[50%] h-[50%] bg-white rounded-full opacity-95" />
              </div>
            </div>
            {/* Olho direito animado - maior */}
            <div className="absolute top-[25%] right-[20%] w-[24%] h-[30%] bg-gray-900 rounded-full flex items-center justify-center">
              <div className="w-[45%] h-[45%] bg-white rounded-full relative">
                <div className="absolute top-[15%] right-[15%] w-[50%] h-[50%] bg-white rounded-full opacity-95" />
              </div>
            </div>
            {/* Boca super feliz rosa */}
            <div className="absolute top-[56%] left-[50%] -translate-x-1/2 w-[40%] h-[25%] bg-pink-400 rounded-full overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-pink-500 rounded-t-full" />
            </div>
          </>
        )
      default:
        return (
          <>
            {/* Olho esquerdo neutro */}
            <div className="absolute top-[30%] left-[23%] w-[20%] h-[26%] bg-gray-900 rounded-full flex items-center justify-center">
              <div className="w-[40%] h-[40%] bg-white rounded-full relative">
                <div className="absolute top-[22%] right-[22%] w-[42%] h-[42%] bg-white rounded-full opacity-85" />
              </div>
            </div>
            {/* Olho direito neutro */}
            <div className="absolute top-[30%] right-[23%] w-[20%] h-[26%] bg-gray-900 rounded-full flex items-center justify-center">
              <div className="w-[40%] h-[40%] bg-white rounded-full relative">
                <div className="absolute top-[22%] right-[22%] w-[42%] h-[42%] bg-white rounded-full opacity-85" />
              </div>
            </div>
            {/* Boca neutra rosa */}
            <div className="absolute top-[60%] left-[50%] -translate-x-1/2 w-[28%] h-[10%] bg-pink-400 rounded-full" />
          </>
        )
    }
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Corpo roxo arredondado - similar à imagem de referência */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getColor()} rounded-full ${
          animated ? 'animate-blob' : ''
        } shadow-xl`}
        style={{
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        }}
      >
        {/* Face com expressões estilo da imagem */}
        {getEyes()}
      </div>

      {/* Energy indicator */}
      {energy < 30 && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
      )}
    </div>
  )
}
