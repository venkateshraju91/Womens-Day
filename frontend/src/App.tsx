import { useState, useRef, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Spotlight from './components/Spotlight'
import Impact from './components/Impact'
import Gratitude from './components/Gratitude'
import Commitment from './components/Commitment'
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
  const [managerName, setManagerName] = useState('')
  const [yourName, setYourName] = useState('')
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
        <Hero managerName={managerName} setManagerName={setManagerName} />
        <PhotoBanner images={[
          { src: '/photo1.svg', alt: 'Team photo 1' },
          { src: '/photo2.svg', alt: 'Team photo 2' },
        ]} />
        <Spotlight />
        <Impact />
        <Gratitude onMessageSaved={fetchMessages} />
        <Commitment yourName={yourName} setYourName={setYourName} />
        <PhotoBanner images={[
          { src: '/photo3.svg', alt: 'Celebration photo 1' },
          { src: '/photo4.svg', alt: 'Celebration photo 2' },
        ]} />
        <Wishes messages={messages} onRefresh={fetchMessages} />
        <Footer />
      </div>
    </div>
  )
}

export default App
