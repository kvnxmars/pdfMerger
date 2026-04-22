import React, { useState } from 'react';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [outputName, setOutputName] = useState('merged');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleFileSelect = (e) => {
    setFiles(Array.from(e.target.files));
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
      files.forEach((file) => formData.append('files', file));
      formData.append('outputName', outputName);

      const response = await fetch('http://localhost:5000/api/merge', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to merge PDFs');
      }

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
      {/* Desktop left panel */}
      <div className="panel-left">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="left-content">
          <div className="left-logo">PDF Tools</div>
          <h2 className="left-headline">
            Merge PDFs<br /><span>without the</span><br />hassle.
          </h2>
          <p className="left-desc">
            Drop your files, name your output, download. No accounts,
            no uploads to servers — fast and private.
          </p>
          <div className="stat-row">
            <div className="stat">
              <div className="stat-num">100%</div>
              <div className="stat-label">Local</div>
            </div>
            <div className="stat">
              <div className="stat-num">∞</div>
              <div className="stat-label">Files</div>
            </div>
            <div className="stat">
              <div className="stat-num">0</div>
              <div className="stat-label">Stored</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel (always visible) */}
      <div className="panel-right">
        <div className="container">
          <div className="brand">
            <h1>PDF Merger</h1>
            <p className="subtitle">Combine multiple PDF files into one</p>
          </div>

          <div className="form-group">
            <label htmlFor="file-input">Select PDF Files</label>
            <div className="file-drop">
              <input
                id="file-input"
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileSelect}
                disabled={loading}
              />
              <svg className="drop-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="16" height="20" rx="2" stroke="#7c5cfc" strokeWidth="1.5"/>
                <rect x="12" y="8" width="16" height="20" rx="2" stroke="#7c5cfc" strokeWidth="1.5" fill="#0a0a0f"/>
                <path d="M20 14v8M16 18l4-4 4 4" stroke="#7c5cfc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="drop-text"><strong>Click to browse</strong> or drag files here</p>
            </div>

            {files.length > 0 && (
              <div className="file-list">
                <p className="files-count">{files.length} file{files.length > 1 ? 's' : ''} selected</p>
                <ul>
                  {files.map((file, i) => (
                    <li key={i}><span className="file-dot" />{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="output-name">Output File Name</label>
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
            <div className={`message ${messageType}`}>{message}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;