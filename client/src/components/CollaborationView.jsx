import React, { useState } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { Users, MessageSquare, Send, AtSign } from 'lucide-react';

export function CollaborationView() {
    const [msg, setMsg] = useState('');

    const comments = [
        { user: 'Alex (DevLead)', text: 'Can we optimize the graph traversal algorithm in line 45?', time: '2 hrs ago', src: 'https://i.pravatar.cc/100?img=11' },
        { user: 'Sarah (SecEng)', text: 'The payload needs sanitization before being passed to the DB.', time: '1 hr ago', src: 'https://i.pravatar.cc/100?img=5' },
        { user: 'Lumina Bot', text: 'Auto-suggestion: Using let instead of const on line 12 is discouraged.', time: 'Just now', src: 'https://i.pravatar.cc/100?img=3', isBot: true }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel"
            style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
        >
            <header style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Users className="text-gradient" size={24} />
                    <h2 style={{ margin: 0, fontSize: '20px' }}>Team Sync & Feedback</h2>
                </div>
            </header>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px', overflowY: 'auto' }}>
                {comments.map((c, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        style={{ display: 'flex', gap: '16px' }}
                    >
                        <img src={c.src} alt="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', border: c.isBot ? '2px solid var(--accent-cyan)' : '2px solid transparent' }} />
                        <div className="glass-panel" style={{ padding: '16px', flex: 1, borderRadius: '0 16px 16px 16px', background: c.isBot ? 'rgba(0,240,255,0.05)' : '' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontWeight: 600, color: c.isBot ? 'var(--accent-cyan)' : '#fff' }}>{c.user}</span>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{c.time}</span>
                            </div>
                            <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.5' }}>{c.text}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-light)', display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Discuss changes or @mention team..."
                        value={msg}
                        onChange={e => setMsg(e.target.value)}
                        style={{
                            width: '100%', padding: '12px 16px 12px 40px', borderRadius: '12px',
                            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)',
                            color: '#fff', fontSize: '15px', outline: 'none'
                        }}
                    />
                    <AtSign size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        padding: '0 24px', borderRadius: '12px', background: 'var(--gradient-main)',
                        border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center',
                        boxShadow: 'var(--neon-glow)'
                    }}
                >
                    <Send size={18} />
                </motion.button>
            </div>
        </motion.div>
    );
}
