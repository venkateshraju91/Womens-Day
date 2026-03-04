const impactItems = [
  {
    title: 'Encouraged Ownership',
    description: 'Created space to take decisions, learn fast, and improve with confidence.',
  },
  {
    title: 'Supported Growth',
    description: "Gave constructive feedback that's direct, actionable, and motivating.",
  },
  {
    title: 'Handled Pressure Calmly',
    description: 'Led through tight timelines with calm focus and smart prioritization.',
  },
  {
    title: 'Built Team Trust',
    description: 'Made the team feel heard, respected, and aligned toward results.',
  },
]

export default function Impact() {
  return (
    <section id="impact" className="section impact-section">
      <h2 className="section-title">Impact in Action</h2>
      <p className="section-subtitle">
        Small moments that create big team momentum.
      </p>
      <div className="impact-list">
        {impactItems.map((item, index) => (
          <div key={index} className="impact-card">
            <div className="impact-dot" />
            <div className="impact-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
