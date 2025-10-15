export default function NoteItem({ note, onEdit, onDelete }) {
  return (
    <div className="note-card">
      <div className="note-header">
        <h3>{note.title}</h3>
        <div className="note-actions">
          <button onClick={() => onEdit(note)}>Edit</button>
          <button onClick={() => onDelete(note._id)}>Delete</button>
        </div>
      </div>
      <p>{note.content}</p>
      <small>Updated: {new Date(note.updatedAt).toLocaleString()}</small>
    </div>
  );
}

