import { useState } from 'react';
import axios from 'axios';
import './ReferenceNotes.css';

function ReferenceNotesForm() {
  const [subject, setSubject] = useState('');
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (subject === '') {
      alert('Please enter a subject');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/course-materials?subject=${subject}`);
      if (response.data && response.data.length > 0) {
        setMaterials(response.data);
        setError('');
      } else {
        setError('No materials found for this subject');
        setMaterials([]);
      }
    } catch (error) {
      console.error('Error fetching materials:', error);
      setError('Error fetching course materials');
      setMaterials([]);
    }
  };

  const handleDownload = (fileUrl, title) => {
    window.open(fileUrl, '_blank');
  };

  return (
    <div className='reference-form-container'>
      <h2>Course Materials</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="subject">Subject:</label>
          <input 
            type='text' 
            placeholder='Enter subject name' 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)}
            required 
          />
        </div>
        <button type='submit' className='reference-form-save'>
          Search Materials
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {materials.length > 0 && (
        <div className="materials-list">
          <h3>Available Materials</h3>
          {materials.map((material, index) => (
            <div key={index} className="material-card" onClick={() => handleDownload(material.fileUrl, material.title)}>
              <div className="material-icon">
                {material.fileType === 'pdf' && '📄'}
                {material.fileType === 'doc' && '📝'}
                {material.fileType === 'ppt' && '📊'}
                {material.fileType === 'other' && '📎'}
              </div>
              <div className="material-info">
                <h4>{material.title}</h4>
                <p>Type: {material.fileType.toUpperCase()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReferenceNotesForm;
