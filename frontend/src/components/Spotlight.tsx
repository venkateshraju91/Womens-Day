import { useState } from 'react'

const spotlightItems = [
  {
    title: 'Clarity & Direction',
    description: 'You make goals feel achievable by breaking complexity into clear priorities.',
    image: '/spotlight-clarity.svg',
  },
  {
    title: 'Empathy with Standards',
    description: 'You balance kindness with accountability—supportive, but always focused on outcomes.',
    image: '/spotlight-empathy.svg',
  },
  {
    title: 'Ownership Culture',
    description: 'You trust people to own their work, which builds confidence and real responsibility.',
    image: '/spotlight-ownership.svg',
  },
]

export default function Spotlight() {
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false])

  const toggleFlip = (index: number) => {
    setFlipped(prev => prev.map((v, i) => i === index ? !v : v))
  }

  return (
    <section id="spotlight" className="section spotlight-section">
      <h2 className="section-title">Leadership Spotlight</h2>
      <p className="section-subtitle">
        A few qualities that truly stand out in your leadership style.
      </p>
      <div className="spotlight-grid">
        {spotlightItems.map((item, index) => (
          <div
            key={index}
            className={`flip-container flip-spotlight ${flipped[index] ? 'flipped' : ''}`}
            onClick={() => toggleFlip(index)}
          >
            <div className="flip-inner">
              <div className="flip-front spotlight-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="flip-back spotlight-card-back">
                <img src={item.image} alt={item.title} className="spotlight-back-img" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
