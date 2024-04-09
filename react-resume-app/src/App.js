import React from 'react';
import './App.css';
import html2pdf from 'html2pdf.js';

const handleDownloadPDF = () => {
  const element = document.getElementById('resume');
  const opt = {
    margin:       0,
    filename:     'resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'a3', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
};

function Resume() {
  

  return (
    <div className="resume" id="resume">
      <h1>John Doe</h1>
      <p>Email: john.doe@example.com</p>
      <p>Phone: +1234567890</p>
      <h2>Summary</h2>
      <p>A self-motivated and enthusiastic individual with a passion for web development.</p>
      <h2>Skills</h2>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>React</li>
      </ul>
      <h2>Experience</h2>
      <p>Web Developer Intern - XYZ Company (2020-2021)</p>
      <p>Designed and developed responsive websites using HTML, CSS, and JavaScript.</p>
      
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>My Resume</h1>
      <Resume />
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
}

export default App;
