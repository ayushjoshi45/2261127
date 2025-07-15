import React, { useState } from "react";
import axios from 'axios';
import { FaCopy, FaCheck, FaLink } from 'react-icons/fa';
import { QRCode } from 'qrcode.react';

export const InputForm = () => {
    const [input, setInput] = useState("");
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const clientBaseUrl = window.location.origin + "/";

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setIsError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input) {
            setIsError(true);
            setUrl("Please add a URL");
            return;
        }
        setIsLoading(true);
        setUrl("");
        setHasCopied(false);
        try {
            const res = await axios.post('/api/url/shorten', { longUrl: input });
            if (res.status === 200) {
                let data = res.data;
                let createUrl = clientBaseUrl + data.urlCode;
                setUrl(createUrl);
            } else {
                setUrl("Something went wrong");
            }
        } catch (error) {
            setUrl(error?.response?.data?.error || "Error");
        }
        setIsLoading(false);
    };

    const handleCopy = () => {
        if (url) {
            navigator.clipboard.writeText(url);
            setHasCopied(true);
            setShowToast(true);
            setTimeout(() => setHasCopied(false), 1200);
            setTimeout(() => setShowToast(false), 1200);
        }
    };

    return (
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <div className="floating-label" style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: 18, color: '#2563eb', zIndex: 2 }}>
                    <FaLink />
                </span>
                <input
                    type="url"
                    id="longUrl"
                    value={input}
                    onChange={handleInputChange}
                    placeholder=" "
                    autoComplete="off"
                    disabled={isLoading}
                    style={{ paddingLeft: 38 }}
                />
                <label htmlFor="longUrl">Paste your long URL here</label>
            </div>
            <button
                className="action-btn"
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? 'Shortening...' : 'Shorten URL'}
            </button>
            {url && (
                <div className="result-area fade-in" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ overflowWrap: 'anywhere', fontWeight: 500 }}>{url}</span>
                        <button className="copy-btn" type="button" onClick={handleCopy} title="Copy">
                            {hasCopied ? <FaCheck /> : <FaCopy />}
                            <span className="tooltip">{hasCopied ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </div>
                    <div style={{ marginTop: 10, width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <div className="qr-appear">
                            <QRCode value={url} size={80} bgColor="#fff" fgColor="#2563eb" style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(37,99,235,0.08)' }} />
                        </div>
                    </div>
                </div>
            )}
            {showToast && (
                <div style={{ position: 'fixed', bottom: 40, left: 0, right: 0, margin: 'auto', width: 180, background: '#2563eb', color: '#fff', borderRadius: 12, padding: '0.7rem 1rem', textAlign: 'center', fontWeight: 600, boxShadow: '0 2px 12px rgba(37,99,235,0.13)', zIndex: 9999, animation: 'fadeInUp 0.7s' }}>
                    Copied to clipboard!
                </div>
            )}
            {isError && (
                <div style={{ color: '#e53e3e', fontSize: '0.98rem', marginTop: '0.5rem', textAlign: 'left' }}>{url}</div>
            )}
        </form>
    );
};
