import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [filter, setFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get('http://localhost:5000/candidates');
      setCandidates(res.data);
    } catch (err) {
      console.error('Error fetching candidates:', err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/candidates/${id}`, { status: newStatus });
      fetchCandidates();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  let sortedCandidates = [...candidates];
  if (sortBy === 'name') {
    sortedCandidates.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'status') {
    sortedCandidates.sort((a, b) => (a.status || '').localeCompare(b.status || ''));
  }

  const filteredCandidates = sortedCandidates.filter(candidate => {
    const matchesJobTitle =
      filter === 'All' || candidate.jobTitle?.toLowerCase() === filter.toLowerCase();
    const matchesStatus =
      statusFilter === '' || candidate.status?.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      candidate.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.status?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesJobTitle && matchesStatus && matchesSearch;
  });

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Candidate Dashboard</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Roles</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Front End">Front End</option>
          <option value="Backend">Backend</option>
          <option value="Data Science">Data Science</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Hired">Hired</option>
        </select>

        <input
          type="text"
          placeholder="Search title or status"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '4px' }}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">No Sort</option>
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job Title</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate, index) => (
            <tr key={candidate._id} style={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}>
              <td>{index + 1}</td>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.jobTitle}</td>
              <td>
                <span
                  style={{
                    padding: '2px 10px',
                    backgroundColor:
                      candidate.status === 'Hired'
                        ? '#2ecc71'
                        : candidate.status === 'Reviewed'
                        ? '#f39c12'
                        : '#95a5a6',
                    color: '#fff',
                    borderRadius: '12px',
                    fontSize: '13px'
                  }}
                >
                  {candidate.status || 'Pending'}
                </span>
              </td>
              <td>
                <button
                  onClick={() => updateStatus(candidate._id, 'Reviewed')}
                  style={{ padding: '4px 8px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '5px' }}
                >
                  Review
                </button>
                <br />
                <button
                  onClick={() => updateStatus(candidate._id, 'Hired')}
                  style={{ padding: '4px 8px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Hire
                </button>
              </td>
              <td>
                {candidate.resume && (
                  <a
                    href={`http://localhost:5000/${candidate.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#2980b9', fontSize: '13px' }}
                  >
                    Download
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;
