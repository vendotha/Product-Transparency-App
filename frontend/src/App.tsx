import React from 'react';
import './App.css';
import { SubmissionForm } from './components/SubmissionForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Altibbe Health</h1>
        <h2>Product Transparency Submission</h2>
      </header>
      <main>
        <SubmissionForm />
      </main>
    </div>
  );
}
export default App;