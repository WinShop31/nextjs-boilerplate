"use client";

import React, { useState } from 'react';

const Home: React.FC = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');

  const handleBypass = async () => {
    try {
      const response = await fetch(`https://bypass-all.vercel.app/bypass?url=${encodeURIComponent(url)}&apikey=DemonOnTop`);
      const data = await response.json();
      setResult(data.message || 'No response received.');
    } catch {
      setResult('Error occurred while fetching data.');
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Добро пожаловать!</h1>
      <input
        type="text"
        placeholder="Вставьте ссылку"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={inputStyle}
      />
      {url && (
        <button style={buttonStyle} onClick={handleBypass}>
          Bypass
        </button>
      )}
      <p style={resultStyle}>{result}</p>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
};

const headingStyle: React.CSSProperties = {
  background: 'linear-gradient(to right, orange, white)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: '36px',
  marginBottom: '20px',
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  fontSize: '16px',
  marginBottom: '10px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  width: '300px',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  transition: 'background-color 0.3s',
};

const resultStyle: React.CSSProperties = {
  marginTop: '20px',
  fontSize: '16px',
  color: 'black',
};

export default Home;
