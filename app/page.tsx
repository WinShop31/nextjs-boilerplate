"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 100));
      }, 1000);
      return () => clearInterval(interval);
    } else {
      router.push('/bypass');
    }
  }, [progress, router]);

  const handleBypass = async () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setResult('Пожалуйста, введите корректный URL.');
      return;
    }

    try {
      const response = await fetch(`https://keybypass.vercel.app/api/fluxus?url=${encodeURIComponent(trimmedUrl)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const key = data.key || 'No key received.';
      setResult(key);
      
      const blob = new Blob([key], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'result.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setResult(`Error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleDeveloper = () => {
    window.location.href = 'https://t.me/fillsofficial';
  };

  return (
    <div style={containerStyle}>
      <div style={gradientStyle}>
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
        <button style={buttonStyle} onClick={handleDeveloper}>
          Developer
        </button>
        <p style={resultStyle}>{result}</p>
      </div>
      <div style={progressBarContainer}>
        <div style={{ ...progressBar, width: `${progress}%` }} />
        <span style={progressText}>{progress}%</span>
      </div>
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
  position: 'relative',
};

const gradientStyle: React.CSSProperties = {
  background: 'linear-gradient(to right, orange, purple)',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const headingStyle: React.CSSProperties = {
  fontSize: '36px',
  marginBottom: '20px',
  color: 'white',
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
  margin: '5px 0',
};

const resultStyle: React.CSSProperties = {
  marginTop: '20px',
  fontSize: '16px',
  color: 'white',
};

const progressBarContainer: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#ddd',
  borderRadius: '8px',
  marginTop: '20px',
  position: 'absolute',
  bottom: '10px',
};

const progressBar: React.CSSProperties = {
  height: '10px',
  backgroundColor: 'green',
  borderRadius: '8px',
};

const progressText: React.CSSProperties = {
  textAlign: 'center',
  color: 'white',
  marginTop: '5px',
};

export default Home;
