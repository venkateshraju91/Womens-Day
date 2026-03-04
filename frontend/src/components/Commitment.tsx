import { useState } from 'react'

const commitments = [
  'Clear, proactive communication',
  'Stronger ownership and follow-through',
  'Better planning and quality focus',
  'Supporting teammates when needed',
]

interface CommitmentProps {
  yourName: string
  setYourName: (name: string) => void
}

export default function Commitment({ yourName, setYourName }: CommitmentProps) {
  const [checked, setChecked] = useState<boolean[]>(commitments.map(() => true))

  const toggle = (index: number) => {
    setChecked(prev => prev.map((v, i) => i === index ? !v : v))
  }

  const displayName = yourName || '[Your Name]'

  return (
    <section id="commitment" className="section commitment-section">
      <h2 className="section-title">My Commitment</h2>
      <p className="section-subtitle">A professional closing that stands out.</p>
      <div className="commitment-card">
        <p className="commitment-intro">Going forward, I'll continue to improve on:</p>
        <ul className="commitment-list">
          {commitments.map((item, index) => (
            <li key={index} className="commitment-item" onClick={() => toggle(index)}>
              <span className={`checkbox ${checked[index] ? 'checked' : ''}`}>
                {checked[index] ? '✅' : '⬜'}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="commitment-divider" />
        <p className="commitment-closing">With respect,</p>
        <p className="commitment-name">{displayName}</p>
        <label className="input-label">Your name</label>
        <input
          type="text"
          placeholder="Type your name"
          value={yourName}
          onChange={(e) => setYourName(e.target.value)}
          className="input-field input-field-full"
        />
      </div>
    </section>
  )
}
