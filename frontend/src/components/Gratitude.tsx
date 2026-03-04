import { useState } from 'react'
import { API_URL } from '../config'

const gratitudeCards = [
  {
    title: 'Thank you for trusting me',
    description: 'Your trust makes me feel confident to take ownership and deliver better outcomes.',
  },
  {
    title: 'Thank you for coaching',
    description: 'Your feedback is always clear and growth-focused—never discouraging, always helpful.',
  },
  {
    title: 'Thank you for fairness',
    description: 'You treat everyone with respect and consistency, which builds real team confidence.',
  },
  {
    title: 'Thank you for raising the bar',
    description: 'You inspire higher standards while still keeping the environment supportive.',
  },
]

interface GratitudeProps {
  onMessageSaved: () => void
}

export default function Gratitude({ onMessageSaved }: GratitudeProps) {
  const [senderName, setSenderName] = useState('')
  const [personalMessage, setPersonalMessage] = useState('')
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [nameError, setNameError] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(personalMessage)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = async () => {
    if (!senderName.trim()) {
      setNameError(true)
      return
    }
    setNameError(false)
    try {
      const res = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: senderName.trim(), message: personalMessage }),
      })
      if (!res.ok) throw new Error('Failed to save')
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
      setSenderName('')
      setPersonalMessage('')
      onMessageSaved()
    } catch {
      alert('Could not save. Make sure the backend is running.')
    }
  }

  return (
    <section id="gratitude" className="section gratitude-section">
      <h2 className="section-title">Gratitude</h2>
      <p className="section-subtitle">
        A few notes of appreciation (edit these to match your real experiences).
      </p>
      <div className="gratitude-grid">
        {gratitudeCards.map((card, index) => (
          <div key={index} className="gratitude-card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>

      <div className="personal-message-card">
        <h3>Your Personal Message</h3>
        <div className="form-group">
          <label className="input-label">
            Your Name <span className="required">*</span>
          </label>
          <input
            type="text"
            className={`input-field input-field-full ${nameError ? 'input-error' : ''}`}
            placeholder="Enter your name"
            value={senderName}
            onChange={(e) => { setSenderName(e.target.value); setNameError(false) }}
          />
          {nameError && <span className="error-text">Name is required</span>}
        </div>
        <div className="form-group">
          <label className="input-label">Message</label>
          <textarea
            className="message-textarea"
            placeholder="Write your personal message here..."
            value={personalMessage}
            onChange={(e) => setPersonalMessage(e.target.value)}
            rows={5}
          />
        </div>
        <div className="message-actions">
          <button className="btn-copy" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy message'}
          </button>
          <button className="btn-save" onClick={handleSave}>
            {saved ? 'Saved!' : 'Save message'}
          </button>
        </div>
      </div>
    </section>
  )
}
