import React from 'react';
import CandidateForm from './components/CandidateForm';
import CandidateList from './components/CandidateList';


const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '10px'}}>Candidate Referral System</h1>
      <CandidateForm />
      <hr />
      <CandidateList />
    </div>
  );
};

export default App;
