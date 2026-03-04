import { useState } from 'react'

interface HeroProps {
  managerName: string
  setManagerName: (name: string) => void
}

const qualities = [
  {
    number: '01',
    title: 'Leader who empowers',
    brief: 'You give people the confidence to make decisions, take risks, and grow — not by micromanaging, but by trusting them fully.',
  },
  {
    number: '02',
    title: 'Calm in complexity',
    brief: 'When chaos rises, you stay composed, think clearly, and guide the team with steady focus — turning pressure into progress.',
  },
  {
    number: '03',
    title: 'Mentor & role model',
    brief: 'You lead by example — your work ethic, integrity, and care for others set a standard that inspires everyone around you.',
  },
]

export default function Hero({ managerName, setManagerName }: HeroProps) {
  const displayName = managerName || '[Manager Name]'
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false])

  const toggleFlip = (index: number) => {
    setFlipped(prev => prev.map((v, i) => i === index ? !v : v))
  }

  return (
    <section className="hero-section">
      <div className="hero-main">
        <div className="hero-card">
          <div className="hero-badge">
            International Women's Day &bull; 04 Mar 2026
          </div>
          <h1 className="hero-title">
            Happy Women's Day, <span className="highlight-name">{displayName}</span>
          </h1>
          <p className="hero-description">
            Thank you for leading with clarity, care, and consistency. Your leadership
            makes the team stronger—every single day.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => document.getElementById('gratitude')?.scrollIntoView({ behavior: 'smooth' })}>
              Read the Note
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('spotlight')?.scrollIntoView({ behavior: 'smooth' })}>
              See the Spotlight
            </button>
          </div>
          <div className="hero-qualities">
            {qualities.map((q, index) => (
              <div
                key={index}
                className={`flip-container ${flipped[index] ? 'flipped' : ''}`}
                onClick={() => toggleFlip(index)}
              >
                <div className="flip-inner">
                  <div className="flip-front quality-card">
                    <span className="quality-number">{q.number}</span>
                    <span className="quality-text">{q.title}</span>
                  </div>
                  <div className="flip-back quality-card-back">
                    <p className="quality-brief">{q.brief}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hero-sidebar">
        <div className="appreciation-card">
          <h3>Short Appreciation Note</h3>
          <p>
            Your guidance and trust make it easier to take ownership and deliver confidently.
            Thank you for setting a high bar while still making space for growth.
          </p>
          <label className="input-label">Personalize name</label>
          <input
            type="text"
            placeholder="Type manager name (e.g., Priya)"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
            className="input-field"
          />
        </div>
      </div>
    </section>
  )
}
