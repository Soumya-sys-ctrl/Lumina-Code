import React from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { FileBarChart, Trophy, ShieldAlert, Zap, Hexagon } from 'lucide-react';

export function ReportView({ result }) {
    return (
        <motion.div
            initial={{ opacity: 0, rotateX: -10 }}
            animate={{ opacity: 1, rotateX: 0 }}
            className="glass-panel"
            style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', perspective: '1000px' }}
        >
            <header style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FileBarChart className="text-gradient" size={24} />
                    <h2 style={{ margin: 0, fontSize: '20px' }}>Quality Insights Report</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '20px', color: 'var(--accent-cyan)', border: '1px solid var(--accent-cyan)' }}>
                    <ShieldAlert size={16} /> 2 High Priority
                </div>
            </header>

            <div style={{ flex: 1, padding: '32px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass-panel" style={{ padding: '40px 24px', textAlign: 'center', border: '1px solid var(--accent-cyan)', background: 'rgba(0, 240, 255, 0.05)' }}
                    >
                        <Trophy size={48} color="var(--accent-cyan)" style={{ margin: '0 auto 16px' }} />
                        <div style={{ fontSize: '64px', fontWeight: 800 }} className="text-gradient">92</div>
                        <div style={{ color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px', marginTop: '8px', fontWeight: 600 }}>Health Score</div>
                    </motion.div>

                    <div className="glass-panel" style={{ padding: '24px', flex: 1 }}>
                        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Score Breakdown</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
                                    <span>Security</span><span>85%</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}><div style={{ width: '85%', height: '100%', background: 'var(--warning)', borderRadius: '3px' }}></div></div>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
                                    <span>Performance</span><span>98%</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}><div style={{ width: '98%', height: '100%', background: 'var(--success)', borderRadius: '3px', boxShadow: '0 0 10px var(--success)' }}></div></div>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
                                    <span>Maintainability</span><span>90%</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}><div style={{ width: '90%', height: '100%', background: 'var(--accent-cyan)', borderRadius: '3px' }}></div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="glass-panel" style={{ padding: '24px' }}>
                        <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Hexagon size={20} color="var(--accent-purple)" />
                            Latest Analysis Result
                        </h3>
                        <div style={{
                            padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px',
                            color: 'var(--text-muted)', lineHeight: '1.6',
                            border: '1px solid var(--border-light)'
                        }}>
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {result ? (typeof result === 'string' ? result : (result?.suggestion || result?.message || JSON.stringify(result))) : 'No recent analysis available. Please run the AI review on your code snippet first to see the outcome here.'}
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '24px', flex: 1 }}>
                        <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Zap size={20} color="var(--accent-cyan)" />
                            Actionable Insights
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <motion.div whileHover={{ x: 4 }} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid var(--error)' }}>
                                <div style={{ fontWeight: 600, color: '#fff', marginBottom: '4px' }}>SQL Injection Vulnerability</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Use parameterized queries in userAuth module.</div>
                            </motion.div>
                            <motion.div whileHover={{ x: 4 }} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid var(--warning)' }}>
                                <div style={{ fontWeight: 600, color: '#fff', marginBottom: '4px' }}>N+1 Query Issue</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Batch database calls in fetching active users.</div>
                            </motion.div>
                            <motion.div whileHover={{ x: 4 }} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid var(--accent-cyan)' }}>
                                <div style={{ fontWeight: 600, color: '#fff', marginBottom: '4px' }}>Opportunity: Caching</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Implement Redis caching for settings fetching to save ~40ms per request.</div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
