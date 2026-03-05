import { useState, useRef, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Spotlight from './components/Spotlight'
import Impact from './components/Impact'
import Gratitude from './components/Gratitude'

import Wishes from './components/Wishes'
import Footer from './components/Footer'
import PhotoBanner from './components/PhotoBanner'
import CelebrationOverlay from './components/CelebrationOverlay'
import { API_URL } from './config'
import './App.css'

interface WishMessage {
  id: number
  name: string
  message: string
  created_at: string
}

function App() {


  const [celebrating, setCelebrating] = useState(false)
  const [messages, setMessages] = useState<WishMessage[]>([])
  const printRef = useRef<HTMLDivElement>(null)

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/messages`)
      if (res.ok) {
        setMessages(await res.json())
      }
    } catch {
      // backend not running — silent fail
    }
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const handlePrint = () => {
    window.print()
  }

  const handleCelebrate = () => {
    setCelebrating(true)
    setTimeout(() => setCelebrating(false), 5000)
  }

  return (
    <div className="app">
      {celebrating && <CelebrationOverlay />}
      <Navbar onPrint={handlePrint} onCelebrate={handleCelebrate} />
      <div ref={printRef} className="main-content">
        <Hero />
        <PhotoBanner images={[
          { src: '/Photo1.jpg', alt: 'Geetha Narayanan', name: 'Geetha Narayanan', designation: 'Chief Technology Officer, CREK ODR' },
          { src: '/photo2.svg', alt: 'Team photo 2' },
        ]} />
        <Spotlight />
        <Impact />
        <Gratitude onMessageSaved={fetchMessages} />

        <PhotoBanner images={[
          { src: '/photo3.png', alt: 'Chittu Nagarajan, Founder, CREK ODR' },
          { src: '/photo4.svg', alt: 'Celebration photo 2' },
        ]} />
        <Wishes messages={messages} onRefresh={fetchMessages} />
        <Footer />
      </div>
    </div>
  )
}

export default App
