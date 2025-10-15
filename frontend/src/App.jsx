import { useEffect, useState } from 'react';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import * as api from './api/notesApi';
import './index.css';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);

  const loadNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchNotes();
      setNotes(data);
    } catch (err) {
      setError(err.message || 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadNotes(); }, []);

  const handleSave = async (payload) => {
    try {
      if (editing) {
        const updated = await api.updateNote(editing._id, payload);
        setNotes(prev => prev.map(n => n._id === updated._id ? updated : n));
        setEditing(null);
      } else {
        const created = await api.createNote(payload);
        setNotes(prev => [created, ...prev]);
      }
    } catch (err) {
      throw err; // let NoteForm show the error
    }
  };

  const handleEdit = (note) => {
    setEditing(note);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this note?')) return;
    try {
      await api.deleteNote(id);
      setNotes(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Notes App</h1>
      </header>

      <section className="form-section">
        <NoteForm onSave={handleSave} editingNote={editing} onCancel={() => setEditing(null)} />
      </section>

      <section>
        {loading && <div className="status">Loading notes...</div>}
        {error && <div className="status error">Error: {error}</div>}
        {!loading && !error && <NotesList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />}
      </section>
    </div>
  );
}
