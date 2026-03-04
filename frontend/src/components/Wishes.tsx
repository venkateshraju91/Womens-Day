import { useState } from 'react'
import { API_URL } from '../config'

interface WishMessage {
  id: number
  name: string
  message: string
  created_at: string
}

interface WishesProps {
  messages: WishMessage[]
  onRefresh: () => void
}

export default function Wishes({ messages, onRefresh }: WishesProps) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [editMessage, setEditMessage] = useState('')

  const startEdit = (msg: WishMessage) => {
    setEditingId(msg.id)
    setEditName(msg.name)
    setEditMessage(msg.message)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditName('')
    setEditMessage('')
  }

  const saveEdit = async (id: number) => {
    if (!editName.trim()) return
    try {
      const res = await fetch(`${API_URL}/api/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editName.trim(), message: editMessage }),
      })
      if (!res.ok) throw new Error('Failed to update')
      cancelEdit()
      onRefresh()
    } catch {
      alert('Could not update. Make sure the backend is running.')
    }
  }

  const deleteMessage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this wish?')) return
    try {
      const res = await fetch(`${API_URL}/api/messages/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete')
      onRefresh()
    } catch {
      alert('Could not delete. Make sure the backend is running.')
    }
  }

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <section id="wishes" className="section wishes-section">
      <h2 className="section-title">Wishes</h2>
      <p className="section-subtitle">
        Heartfelt messages from the team.
      </p>

      {messages.length === 0 ? (
        <div className="wishes-empty">
          <p>No wishes yet. Be the first to leave a message above!</p>
        </div>
      ) : (
        <div className="wishes-list">
          {messages.map((msg) => (
            <div key={msg.id} className="wish-card">
              {editingId === msg.id ? (
                <div className="wish-edit-form">
                  <input
                    type="text"
                    className="input-field input-field-full"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Name"
                  />
                  <textarea
                    className="message-textarea"
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    rows={3}
                  />
                  <div className="wish-edit-actions">
                    <button className="btn-save-sm" onClick={() => saveEdit(msg.id)}>Save</button>
                    <button className="btn-cancel-sm" onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="wish-header">
                    <div className="wish-avatar">{msg.name.charAt(0).toUpperCase()}</div>
                    <div className="wish-meta">
                      <span className="wish-name">{msg.name}</span>
                      <span className="wish-date">{formatDate(msg.created_at)}</span>
                    </div>
                    <div className="wish-actions">
                      <button className="btn-icon" onClick={() => startEdit(msg)} title="Edit">
                        &#9998;
                      </button>
                      <button className="btn-icon btn-icon-danger" onClick={() => deleteMessage(msg.id)} title="Delete">
                        &#128465;
                      </button>
                    </div>
                  </div>
                  {msg.message && <p className="wish-message">{msg.message}</p>}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
