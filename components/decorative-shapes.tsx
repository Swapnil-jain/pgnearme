export function DecorativeShapes() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Top left blob */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl animate-blob"></div>

      {/* Top right blob */}
      <div className="absolute top-1/4 -right-20 w-72 h-72 bg-gradient-to-bl from-pink-300/30 to-purple-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      {/* Bottom left blob */}
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-gradient-to-tr from-purple-400/30 to-pink-300/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      {/* Bottom right blob */}
      <div className="absolute -bottom-20 right-1/3 w-64 h-64 bg-gradient-to-tl from-pink-300/30 to-purple-300/30 rounded-full blur-3xl animate-blob animation-delay-6000"></div>

      {/* Decorative circles */}
      <div className="absolute top-1/3 left-10 w-6 h-6 border-2 border-purple-400/50 rounded-full"></div>
      <div className="absolute top-2/3 right-10 w-4 h-4 bg-pink-400/50 rounded-full"></div>
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-purple-500/50 rounded-full"></div>

      {/* Decorative lines */}
      <div className="absolute top-1/4 right-1/4 w-20 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent transform rotate-45"></div>
      <div className="absolute bottom-1/3 left-1/3 w-16 h-px bg-gradient-to-r from-transparent via-pink-400/50 to-transparent transform -rotate-45"></div>

      {/* Decorative dots pattern */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle,_rgba(120,_90,_255,_0.05)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
    </div>
  )
}

