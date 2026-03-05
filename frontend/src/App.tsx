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
import MusicPlayer from './components/MusicPlayer'
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
      <MusicPlayer />
      {celebrating && <CelebrationOverlay />}
      <Navbar onPrint={handlePrint} onCelebrate={handleCelebrate} />
      <div ref={printRef} className="main-content">
        <Hero />
        <PhotoBanner images={[
          { src: '/Photo1.jpg', alt: 'Geetha Narayanan', quote: '"Here\'s to the women who lead, inspire, and make the impossible look effortless."' },
          { src: '/photo2.png', alt: 'Leader photo 2', quote: '"When women rise, the world rises with them."' },
        ]} />
        <Spotlight />
        <Impact />
        <Gratitude onMessageSaved={fetchMessages} />

        <PhotoBanner images={[
          { src: '/photo3.png', alt: 'Chittu Nagarajan', quote: '"Behind every successful journey is a woman who dared to begin."' },
          { src: '/photo4.jpg', alt: 'Leader photo', quote: '"Strength, grace, and purpose — the pillars of every woman who leads."' },
        ]} />
        <Wishes messages={messages} onRefresh={fetchMessages} />
        <Footer />
      </div>
    </div>
  )
}

export default App
