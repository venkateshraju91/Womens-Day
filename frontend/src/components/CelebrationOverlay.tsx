import { useEffect, useState } from 'react'

interface Particle {
  id: number
  left: number
  delay: number
  duration: number
  emoji: string
}

export default function CelebrationOverlay() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const emojis = ['🌸', '💜', '✨', '🌷', '💐', '🎀', '💗', '🌺', '⭐', '🦋']
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="celebration-overlay">
      {particles.map((p) => (
        <span
          key={p.id}
          className="confetti"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}
