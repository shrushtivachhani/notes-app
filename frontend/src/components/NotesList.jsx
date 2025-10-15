import NoteItem from './NoteItem';

export default function NotesList({ notes, onEdit, onDelete }) {
  if (!notes || notes.length === 0) {
    return <div className="empty">No notes yet — create one.</div>;
  }
  return (
    <div className="notes-grid">
      {notes.map(n => (
        <NoteItem key={n._id} note={n} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
