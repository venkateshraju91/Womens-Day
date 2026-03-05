interface NavbarProps {
  onPrint: () => void
  onCelebrate: () => void
}

export default function Navbar({ onPrint, onCelebrate }: NavbarProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="logo-wrapper">
          <div className="logo-glow" />
          <img src="/logo.svg" alt="Logo" className="navbar-logo" />
        </div>
        <span className="navbar-title">Women's Day</span>
      </div>
      <div className="navbar-links">
        <button onClick={() => scrollTo('spotlight')}>Spotlight</button>
        <button onClick={() => scrollTo('impact')}>Impact</button>
        <button onClick={() => scrollTo('gratitude')}>Gratitude</button>
        <button onClick={() => scrollTo('wishes')}>Wishes</button>
      </div>
      <div className="navbar-actions">
        <button className="btn-print" onClick={onPrint}>Print</button>
        <button className="btn-celebrate" onClick={onCelebrate}>
          Celebrate <span>✨</span>
        </button>
      </div>
    </nav>
  )
}
