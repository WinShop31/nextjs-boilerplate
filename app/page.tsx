import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to My Site</h1>
      <Link href="https://funpay.com">
        <button style={styles.button}>Go</button>
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Home;
