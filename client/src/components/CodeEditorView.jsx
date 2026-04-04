import React, { useState } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Play, Code, CheckCircle, AlertCircle } from 'lucide-react';

export function CodeEditorView({ onAnalyze, status }) {
    const [code, setCode] = useState('// Enter code to review...\ndef test_app():\n    return "Lumina"');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel"
            style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
        >
            <header style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Code className="text-gradient" size={24} />
                    <h2 style={{ margin: 0, fontSize: '20px' }}>Quantum Code Editor</h2>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAnalyze(code, 'Security Analysis')}
                    disabled={status === 'pending' || status === 'active'}
                    style={{
                        padding: '10px 24px',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'var(--gradient-main)',
                        color: '#fff',
                        fontWeight: 600,
                        cursor: (status === 'pending' || status === 'active') ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: 'var(--neon-glow)'
                    }}
                >
                    {status === 'pending' || status === 'active' ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ display: 'inline-flex' }}>
                            <AlertCircle size={18} />
                        </motion.div>
                    ) : <Play size={18} />}
                    {status === 'pending' || status === 'active' ? 'Analyzing...' : 'Run Review'}
                </motion.button>
            </header>

            <div style={{ flex: 1, padding: '24px', position: 'relative' }}>
                {/* Fake line numbers and code editor for mock visual purpose */}
                <div style={{
                    display: 'flex',
                    height: '100%',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-light)',
                    overflow: 'hidden'
                }}>
                    <div style={{ width: '40px', padding: '16px 0', background: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)', textAlign: 'center', fontFamily: '"JetBrains Mono", monospace', userSelect: 'none' }}>
                        1<br />2<br />3<br />4
                    </div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--accent-cyan)',
                            padding: '16px',
                            fontFamily: '"JetBrains Mono", monospace',
                            fontSize: '15px',
                            lineHeight: '1.6',
                            outline: 'none',
                            resize: 'none'
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
