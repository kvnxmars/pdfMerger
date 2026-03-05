import React, { useState } from 'react';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [outputName, setOutputName] = useState('merged');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setMessage('');
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setMessageType('error');
      setMessage('Please select at least 2 PDF files to merge.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('outputName', outputName);

      const response = await fetch('http://localhost:5000/api/merge', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to merge PDFs');
      }

      // Download the merged PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${outputName}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setMessageType('success');
      setMessage('PDFs merged successfully! Download started.');
      setFiles([]);
      setOutputName('merged');
    } catch (error) {
      setMessageType('error');
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>PDF Merger</h1>
        <p className="subtitle">Combine multiple PDF files into one</p>

        <div className="form-group">
          <label htmlFor="file-input">Select PDF Files:</label>
          <input
            id="file-input"
            type="file"
            multiple
            accept=".pdf"
            onChange={handleFileSelect}
            disabled={loading}
          />
          {files.length > 0 && (
            <div className="file-list">
              <p className="files-count">Selected: {files.length} file(s)</p>
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="output-name">Output File Name (without .pdf):</label>
          <input
            id="output-name"
            type="text"
            value={outputName}
            onChange={(e) => setOutputName(e.target.value)}
            placeholder="merged"
            disabled={loading}
          />
        </div>

        <button
          onClick={handleMerge}
          disabled={loading || files.length === 0}
          className="merge-button"
        >
          {loading ? 'Merging...' : 'Merge PDFs'}
        </button>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
