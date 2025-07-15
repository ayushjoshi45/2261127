import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ShortUrlRedirect() {
  const { urlCode } = useParams();
  const serverBaseUrl = import.meta.env.VITE_APP_URI;

  const redirect = () => {
    let url = (serverBaseUrl + `/${urlCode}`);
    window.location.replace(url);
  };

  useEffect(() => {
    if (urlCode) {
      redirect();
    }
  }, [ urlCode ]);
  return (
    <div className="glass-card" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <div className="brand" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Redirecting...</div>
      <div className="subtitle">Please wait while we take you to your destination.</div>
    </div>
  );
}
