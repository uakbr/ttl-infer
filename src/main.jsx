import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

// Simple test component
const App = () => {
  return (
    <div className="app-container">
      <h1>TTT Visualization</h1>
      <p>This is a test page</p>
      <button>Click me</button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 