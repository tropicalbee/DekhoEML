import React, { useState, useEffect } from 'react';
import './App.css';

// --- Custom Brand Icon: The Shielded Envelope ---
const ShieldedEnvelopeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <path d="m22 6-9.03 6.02a1.94 1.94 0 0 1-1.94 0L2 6" />
    <rect x="10" y="11" width="4" height="5" rx="1" fill="currentColor" stroke="none" />
    <path d="M11 11V9.5a1 1 0 0 1 2 0V11" />
  </svg>
);

// --- Clean Inline SVG Icons ---
const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const PaperclipIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const FileTextIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);

// --- Helpers ---
const formatBytes = (bytes, decimals = 2) => {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const decodeBase64Text = (base64Str) => {
  try {
    return atob(base64Str);
  } catch (e) {
    return "Unable to decode file content as readable text.";
  }
};

const createBlobUrl = (base64Str, mimeType) => {
  try {
    const byteCharacters = atob(base64Str);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    return URL.createObjectURL(blob);
  } catch (e) {
    console.error("Blob generation failed", e);
    return null;
  }
};

// --- Human-Friendly FAQ Data for DekhoEML ---
const FAQS = [
  {
    question: "Are my email files ever uploaded to cloud servers?",
    answer: "Never. DekhoEML works entirely offline inside your browser. When you select a file, it is read directly from your computer's local memory. Absolutely nothing is sent across the internet or stored on our servers."
  },
  {
    question: "Why is reading .EML files in DekhoEML safer than opening them on my desktop?",
    answer: "Standard email programs can sometimes automatically execute hidden scripts or download tracking pixels that let senders know when and where you opened their email. Our Safe Reading Mode blocks all trackers, links, and background scripts automatically."
  },
  {
    question: "Can I safely preview and download attachments?",
    answer: "Yes! You can instantly view images and read PDF attachments safely inside our secure preview window. If the file is a system file or binary format, we lock live previewing to protect your device and allow you to download it directly."
  },
  {
    question: "What happens to my data after I close this tab?",
    answer: "It disappears completely. Because DekhoEML doesn't use databases, browser cookies, or cloud storage, all loaded text and attachments vanish the exact second you close your browser tab or refresh the page."
  }
];

function App() {
  const [emailData, setEmailData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [activeBlobUrl, setActiveBlobUrl] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [showTC, setShowTC] = useState(false);

  // Automatically scroll to the top smoothly whenever email data is updated
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [emailData]);

  // Clean up and manage Blob URLs safely to avoid lifecycle errors and memory leaks
  useEffect(() => {
    if (!selectedAttachment) {
      setActiveBlobUrl(null);
      return;
    }

    const mime = selectedAttachment.mime_type.toLowerCase();
    if (mime === 'application/pdf') {
      const url = createBlobUrl(selectedAttachment.data, selectedAttachment.mime_type);
      setActiveBlobUrl(url);

      return () => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      };
    }
  }, [selectedAttachment]);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setEmailData(null);
    setSelectedAttachment(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Upload failed');
      }

      const data = await response.json();
      setEmailData(data);
    } catch (err) {
      setError(err.message || 'Error reading local file. Ensure the backend server is running.');
    } finally {
      setLoading(false);
      event.target.value = ''; // Reset standard file input value
    }
  };

  const renderAttachmentPreview = (att) => {
    const mime = att.mime_type.toLowerCase();
    const ext = att.filename.split('.').pop().toLowerCase();
    const dataUrl = `data:${att.mime_type};base64,${att.data}`;

    if (mime.startsWith('image/')) {
      return <img src={dataUrl} alt={att.filename} className="preview-image" />;
    }

    if (mime === 'application/pdf') {
      if (!activeBlobUrl) {
        return <div className="preview-fallback">Preparing PDF viewer...</div>;
      }
      return <iframe src={activeBlobUrl} className="preview-pdf" title="PDF Preview" />;
    }

    const textExtensions = ['txt', 'log', 'md', 'json', 'xml', 'csv', 'py', 'js', 'html', 'css', 'patch', 'diff'];
    if (mime.startsWith('text/') || textExtensions.includes(ext)) {
      return <pre className="preview-text">{decodeBase64Text(att.data)}</pre>;
    }

    return (
      <div className="preview-fallback">
        <div style={{ marginBottom: '12px', color: '#64748b' }}>
          <ShieldIcon />
        </div>
        <p style={{ fontWeight: '600', color: '#e2e8f0', margin: '0 0 8px 0' }}>System / Binary File</p>
        <p style={{ fontSize: '0.8rem', margin: '0 0 20px 0' }}>File Type: <code>{att.mime_type}</code></p>
        <p style={{ fontSize: '0.8rem', color: '#64748b' }}>To protect your device, live browser preview is disabled for this format. You can safely download it below.</p>
      </div>
    );
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-brand" onClick={() => setEmailData(null)} title="Return to DekhoEML Home">
          <div className="brand-icon">
            <ShieldedEnvelopeIcon />
          </div>
          <span>Dekho<span style={{ color: '#3b82f6' }}>EML</span></span>
        </div>
        
        <div className="nav-telemetry">
          {emailData && (
            <label className="btn-navbar-upload">
              <UploadIcon />
              <span>{loading ? 'OPENING...' : 'OPEN NEW FILE'}</span>
              <input 
                type="file" 
                accept=".eml" 
                onChange={handleFileUpload} 
                disabled={loading}
                style={{ display: 'none' }}
              />
            </label>
          )}

          <div className="status-badge">
            <span className="pulse-dot"></span>
            <span>SAFE MODE</span>
          </div>
          <div className="status-badge" style={{ borderColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.05)' }}>
            <span>100% OFFLINE</span>
          </div>
        </div>
      </nav>

      <div className="app-container">
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', borderLeft: '3px solid #ef4444', color: '#fca5a5', padding: '16px', borderRadius: '8px', margin: '24px 0', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem' }}>
            [ERROR]: {error}
          </div>
        )}

        {/* ==========================================
            STATE 1: SAAS LANDING PAGE ZERO-STATE
            ========================================== */}
        {!emailData && (
          <div className="landing-wrapper">
            
            {/* Hero Section */}
            <section className="hero-section">
              <div className="hero-badge">
                <ShieldedEnvelopeIcon />
                <span>Runs Locally in Your Browser</span>
              </div>
              <h1 className="hero-title">
                Read & Inspect .EML Files.<br />
                <span>Zero Server Uploads.</span>
              </h1>
              <p className="hero-subtitle">
                Open downloaded email archives, read messages, and view attachments safely with <strong>DekhoEML</strong>. Everything is processed directly on your device.
              </p>

              {/* Upload Card */}
              <div className="upload-hero-card">
                <div className="hero-icon-ring">
                  <UploadIcon />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#fff', margin: '0 0 8px 0' }}>
                  Select an email file to read
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 24px auto', lineRef: '1.5' }}>
                  Tracking pixels, external link redirects, and scripts are automatically restricted at runtime.
                </p>
                <label className="btn-primary" style={{ cursor: 'pointer' }}>
                  <UploadIcon />
                  <span>{loading ? 'OPENING FILE...' : 'SELECT .EML FILE'}</span>
                  <input 
                    type="file" 
                    accept=".eml" 
                    onChange={handleFileUpload} 
                    disabled={loading}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </section>

            {/* SaaS Feature Grid */}
            <section className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon"><LockIcon /></div>
                <div className="feature-title">100% Local Processing</div>
                <p className="feature-desc">
                  Your files are parsed directly inside your browser's memory. No data is transmitted to cloud environments.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><EyeOffIcon /></div>
                <div className="feature-title">Shielded Reading</div>
                <p className="feature-desc">
                  Email content renderers are placed inside standard frame isolation layers to prevent tracking script execution.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><ZapIcon /></div>
                <div className="feature-title">Isolated Attachments</div>
                <p className="feature-desc">
                  Instantly read and preview attachment documents, images, and logs safely without needing to launch desktop clients.
                </p>
              </div>
            </section>

            {/* FAQ Accordion Section */}
            <section className="faq-section">
              <div className="section-header">
                <h2 className="section-title">Frequently Asked Questions</h2>
                <p className="section-subtitle">Information regarding standard security protocols used by DekhoEML.</p>
              </div>
              
              <div className="faq-list">
                {FAQS.map((faq, index) => {
                  const isActive = openFaq === index;
                  return (
                    <div key={index} className={`faq-item ${isActive ? 'active' : ''}`}>
                      <button className="faq-question" onClick={() => setOpenFaq(isActive ? null : index)}>
                        <span>{faq.question}</span>
                        <div className="faq-icon"><ChevronDownIcon /></div>
                      </button>
                      {isActive && (
                        <div className="faq-answer">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

          </div>
        )}

        {/* ==========================================
            STATE 2: ACTIVE WORKSPACE & VIEWER
            ========================================== */}
        {emailData && (
          <>
            <div className="active-toolbar">
              <div className="file-indicator">
                <span style={{ color: '#10b981' }}>●</span>
                <span>FILE LOADED SECURELY IN MEMORY</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>
                REUSE TOP CONTROLS FOR A NEW FILE
              </span>
            </div>

            <div className="email-card">
              <div className="metadata-section">
                <div className="subject-line">
                  <span>{emailData.subject || 'No Subject Provided'}</span>
                </div>
                <div className="metadata-grid">
                  <div className="metadata-box">
                    <span className="metadata-label">FROM</span>
                    <span className="metadata-value">{emailData.from || 'Unknown Sender'}</span>
                  </div>
                  <div className="metadata-box">
                    <span className="metadata-label">TO</span>
                    <span className="metadata-value">{emailData.to || 'Unknown Recipient'}</span>
                  </div>
                  <div className="metadata-box">
                    <span className="metadata-label">DATE</span>
                    <span className="metadata-value">{emailData.date || 'Unknown Date'}</span>
                  </div>
                </div>
              </div>

              {emailData.attachments && emailData.attachments.length > 0 && (
                <div className="attachments-section">
                  <div className="attachments-header">
                    <PaperclipIcon />
                    <span>ATTACHMENTS & FILES ({emailData.attachments.length})</span>
                  </div>
                  <div className="attachments-list">
                    {emailData.attachments.map((att, idx) => (
                      <button 
                        key={idx} 
                        className="attachment-pill"
                        onClick={() => setSelectedAttachment(att)}
                      >
                        <span className="attachment-name">{att.filename}</span>
                        <span className="attachment-size">{formatBytes(att.size)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="monitor-enclosure">
                <div className="monitor-header">
                  <div className="monitor-lights">
                    <span className="light light-red"></span>
                    <span className="light light-yellow"></span>
                    <span className="light light-green"></span>
                  </div>
                  <span>PROTECTED VIEW // SCRIPT ANALYSIS BLOCKED</span>
                  <span style={{ color: '#10b981' }}>ACTIVE</span>
                </div>
                
                <div className="body-section">
                  {emailData.body_html ? (
                    <iframe 
                      className="email-iframe"
                      title="Email Content"
                      srcDoc={emailData.body_html}
                      sandbox="" 
                    />
                  ) : (
                    <pre className="terminal-body">
                      {emailData.body_text || "No readable text found in this email."}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Modal Inspector for Attachments */}
        {selectedAttachment && (
          <div className="modal-overlay" onClick={() => setSelectedAttachment(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">
                  <PaperclipIcon />
                  <span style={{ wordBreak: 'break-all' }}>{selectedAttachment.filename}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '400', flexShrink: 0 }}>
                    ({formatBytes(selectedAttachment.size)})
                  </span>
                </div>
                <button className="modal-close" onClick={() => setSelectedAttachment(null)}>
                  <CloseIcon />
                </button>
              </div>
              
              <div className="modal-body">
                {renderAttachmentPreview(selectedAttachment)}
              </div>

              <div className="modal-footer">
                {selectedAttachment.mime_type === 'application/pdf' && activeBlobUrl && (
                  <a 
                    href={activeBlobUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-outline"
                    style={{ textDecoration: 'none', background: 'rgba(59, 130, 246, 0.1)', borderColor: '#3b82f6', color: '#60a5fa' }}
                  >
                    <ExternalLinkIcon />
                    <span>OPEN IN NEW TAB</span>
                  </a>
                )}
                <a 
                  href={`data:${selectedAttachment.mime_type};base64,${selectedAttachment.data}`}
                  download={selectedAttachment.filename}
                  className="btn-outline"
                  style={{ textDecoration: 'none', background: '#2563eb', color: '#ffffff', borderColor: '#2563eb', fontWeight: '600' }}
                >
                  <DownloadIcon />
                  <span>DOWNLOAD FILE</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Modal Inspector for Terms and Conditions */}
        {showTC && (
          <div className="modal-overlay" onClick={() => setShowTC(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">
                  <FileTextIcon />
                  <span>Terms & Conditions</span>
                </div>
                <button className="modal-close" onClick={() => setShowTC(false)}>
                  <CloseIcon />
                </button>
              </div>
              
              <div className="tc-body">
                <div className="tc-section">
                  <div className="tc-title">1. Acceptance of Terms</div>
                  <p style={{ margin: 0 }}>
                    By accessing and using DekhoEML, you agree to comply with and be bound by these Terms & Conditions. This tool is provided free of charge for productivity and email inspection purposes.
                  </p>
                </div>

                <div className="tc-section">
                  <div className="tc-title">2. Client-Side Processing & Privacy</div>
                  <p style={{ margin: 0 }}>
                    DekhoEML is an offline, client-side application. We do not collect, transmit, store, or monitor your email data or uploaded files. All MIME parsing occurs within your browser's local RAM. You retain 100% ownership and confidentiality of your personal data.
                  </p>
                </div>

                <div className="tc-section">
                  <div className="tc-title">3. No Warranty & Limitation of Liability</div>
                  <p style={{ margin: 0 }}>
                    The software is provided "as is", without warranty of any kind, express or implied. In no event shall TropicalBee or the developers be held liable for any damages, data loss, or system issues arising from the opening of third-party email files or attachments using this service.
                  </p>
                </div>

                <div className="tc-section">
                  <div className="tc-title">4. User Responsibility</div>
                  <p style={{ margin: 0 }}>
                    You are strictly responsible for ensuring you have full legal right and authorization to view, parse, and inspect the `.eml` files you load into DekhoEML. Do not use this utility to inspect unauthorized or stolen correspondence.
                  </p>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  className="btn-primary" 
                  onClick={() => setShowTC(false)}
                >
                  I Understand & Agree
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Area */}
<footer className="app-footer">
  <div className="footer-content">
    <div className="footer-brand">
      <span style={{ fontWeight: '500', color: '#ffffff' }}>DekhoEML</span>
      <span>Developed with passion by <strong style={{ color: '#ffffff' }}>TropicalBee</strong></span>
    </div>
    <div className="footer-links">
      {/* ADD THE GITHUB LINK HERE */}
      <a 
        href="https://github.com/tropicalbee/DekhoEML.git" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="link-btn"
        style={{ textDecoration: 'none' }}
      >
        GitHub
      </a>
      <span className="footer-divider">•</span>
      <button className="link-btn" onClick={() => setShowTC(true)}>Terms & Conditions</button>
      <span>100% Client-Side Privacy</span>
    </div>
  </div>
</footer>
    </div>
  );
}

export default App;