import { useState, useRef, useEffect } from 'react'

const YOUTUBE_VIDEO_ID = '778Y0EQqcyE'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Auto-start after a short delay to let page load
    const timer = setTimeout(() => setPlaying(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const toggle = () => setPlaying(prev => !prev)

  return (
    <>
      {playing && (
        <iframe
          ref={iframeRef}
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
