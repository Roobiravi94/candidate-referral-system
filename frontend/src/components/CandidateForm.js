import React, { useState } from 'react';
import axios from 'axios';

const CandidateForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('jobTitle', jobTitle);
    formData.append('email', email);
    if (resume) formData.append('resume', resume);

    try {
      await axios.post('http://localhost:5000/candidates', formData);
      alert('Candidate submitted successfully!');
      setName('');
      setPhone('');
      setJobTitle('');
      setEmail('');
      setResume(null);
    } catch (err) {
      console.error('Submission error', err);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '10px'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: '#fff',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h3 style={{ marginBottom: '10px', textAlign: 'center' }}>Add Candidate</h3>

        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label><br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Phone:</label><br />
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Job Title:</label><br />
          <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Resume (PDF):</label><br />
          <input type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} />
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CandidateForm;
