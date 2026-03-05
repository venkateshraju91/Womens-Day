import { useState, useEffect } from 'react'

const YOUTUBE_VIDEO_ID = '778Y0EQqcyE'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (triggered) return

    const start = () => {
      setPlaying(true)
      setTriggered(true)
    }

    window.addEventListener('mousemove', start, { once: true })
    window.addEventListener('keydown', start, { once: true })
    window.addEventListener('click', start, { once: true })
    window.addEventListener('touchstart', start, { once: true })
    window.addEventListener('scroll', start, { once: true })

    return () => {
      window.removeEventListener('mousemove', start)
      window.removeEventListener('keydown', start)
      window.removeEventListener('click', start)
      window.removeEventListener('touchstart', start)
      window.removeEventListener('scroll', start)
    }
  }, [triggered])

  const toggle = () => setPlaying(prev => !prev)

  return (
    <>
      {playing && (
        <iframe
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1`}
          allow="autoplay"
          style={{ position: 'fixed', width: 0, height: 0, border: 'none', opacity: 0, pointerEvents: 'none' }}
          title="Background music"
        />
      )}
      <button
        onClick={toggle}
        className="music-btn"
        title={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? '\u266B' : '\u25B6'}
      </button>
    </>
  )
}
