import { useEffect, useState } from 'react';
import axios from 'axios';
import "./NotesSummary.css"

function SavedDataPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className='summary-form-container'>
      <h2 className='summary-form-header'>Saved Notes</h2>
      <div className='notes-list'>
        {notes.map((note, index) => (
          <div key={index} className='note-item'>
            <h3>Title: {note.title}</h3>
            <p>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedDataPage;