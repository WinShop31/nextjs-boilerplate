import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div style={containerStyle}>
      <h1>Welcome to My Site</h1>
      <Link href="https://funpay.com" passHref>
        <button style={buttonStyle}>Go</button>
      </Link>
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

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default Home;
