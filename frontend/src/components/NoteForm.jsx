import { useState, useEffect } from 'react';

export default function NoteForm({ onSave, editingNote, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || '');
      setContent(editingNote.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setSaving(true);
    try {
      await onSave({ title: title.trim(), content });
    } catch (err) {
      setError(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <div>
        <input
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          disabled={saving}
        />
      </div>
      <div>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e)=>setContent(e.target.value)}
          disabled={saving}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <div className="actions">
        <button type="submit" className="primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        {onCancel && <button type="button" className="secondary" onClick={onCancel} disabled={saving}>Cancel</button>}
      </div>
    </form>
  );
}
