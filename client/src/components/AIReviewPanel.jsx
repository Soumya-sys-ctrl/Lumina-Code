import React from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, MessageSquareWarning } from 'lucide-react';

export function AIReviewPanel({ thoughts, result, progress, status }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel"
            style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
        >
            <header style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Brain className="text-gradient" size={24} />
                    <h2 style={{ margin: 0, fontSize: '20px' }}>Lumina Inference Engine</h2>
                </div>
            </header>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px', gap: '24px', overflowY: 'auto' }}>
                {status === 'idle' && (
                    <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <Cpu size={48} opacity={0.3} style={{ marginBottom: '16px' }} />
                        <p>Engine idle. Submit code to begin AI Review.</p>
                    </div>
                )}

                {(status === 'active' || status === 'pending' || status === 'completed') && (
                    <div className="glass-panel" style={{ padding: '16px', background: 'rgba(0, 240, 255, 0.03)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span className="text-gradient" style={{ fontWeight: 600 }}>Inference Progress</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>{progress}%</span>
                        </div>
                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                style={{ height: '100%', background: 'var(--gradient-main)', boxShadow: 'var(--neon-glow)' }}
                            />
                        </div>
                    </div>
                )}

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <AnimatePresence>
                        {thoughts.map((thought, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    borderLeft: '2px solid var(--accent-purple)',
                                    color: 'var(--text-muted)',
                                    fontSize: '14px'
                                }}
                            >
                                {thought}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-panel"
                            style={{ marginTop: 'auto', padding: '24px', border: '1px solid var(--accent-cyan)' }}
                        >
                            <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)' }}>
                                <MessageSquareWarning size={20} /> Analysis Complete
                            </h3>
                            <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                                {typeof result === 'string' ? result : (result?.suggestion || result?.message || JSON.stringify(result))}
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
