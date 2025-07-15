import React from 'react';
import { InputForm } from "./components/InputForm";
import { FaLink } from 'react-icons/fa';

export default function Homepage() {
  return (
    <>
      <div className="hero-section fade-in">
        <div className="logo-circle">
          <FaLink size={48} color="#fff" />
        </div>
        <div className="brand">URL Shortener</div>
        <div className="subtitle">Create short, shareable links instantly.<br/>Powered by <b>Ayush Joshi</b>.</div>
      </div>
      <div className="glass-card fade-in" style={{ marginTop: 0 }}>
        <InputForm />
      </div>
    </>
  );
}
