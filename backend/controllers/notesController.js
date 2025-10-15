const Note = require('../models/Note');

exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

exports.createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || title.trim() === '') {
      const error = new Error('Title is required');
      error.status = 400;
      throw error;
    }
    const note = await Note.create({ title, content });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true, runValidators: true });
    if (!note) {
      const error = new Error('Note not found');
      error.status = 404;
      throw error;
    }
    res.json(note);
  } catch (err) {
    next(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      const error = new Error('Note not found');
      error.status = 404;
      throw error;
    }
    res.json({ message: 'Note deleted' });
  } catch (err) {
    next(err);
  }
};
